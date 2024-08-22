---
title: What is Baleada Edge?
source: laravel-edge
publish: true
order: 0
summary: Tools for modeling relational data as an edge list in Laravel
---

Baleada Edge makes it easy to model relational data as an [edge list](https://en.wikipedia.org/wiki/Edge_list) where nodes are data objects and edges are the relationships between them.

It's inspired by DynamoDB, MongoDB, and single-table NoSQL design patterns more generally, but it works with more traditional database tech like SQLite, MySQL, Postgres, etc.

Here's a example of a Baleada Edge list that models [polymorphic many-to-many relationships](https://laravel.com/docs/11.x/eloquent-relationships#many-to-many-polymorphic-relations) between users, projects, and tasks:

::: ariaLabel="Baleada Edge table example"
| id | from_kind | from | kind | to_kind | to | profile | created_at | updated_at |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | user | 1 | is | profile | 1 | {"user": {...} | ... | ... |
| 2 | user | 2 | is | profile | 1 | {"user": {...} | ... | ... |
| 3 | project | 1 | is | profile | 1 | {"project": {...} | ... | ... |
| 4 | task | 1 | is | profile | 1 | {"task": {...} | ... | ... |
| 5 | user | 1 | owns | task | 1 | {"user": {...}, "task": {...}} | ... | ... |
| 6 | user | 2 | is assigned to | task | 1 | {"user": {...}, "task": {...}} | ... | ... |
| 7 | project | 1 | involves | task | 1 | {"project": {...}, "task": {...}} | ... | ... |
| 8 | user | 1 | leads | project | 1 | {"user": {...}, "project": {...}} | ... | ... |
| 9 | user | 2 | collaborates on | project | 1 | {"user": {...}, "project": {...}} | ... | ... |
:::


:::
### Upsides and downsides
:::

The **upside** of this modeling strategy: Instead of writing glue code (e.g. helper tables, Laravel Eloquent model methods, and bespoke abstractions) to model complex relationships, you just use Baleada Edge to insert a new `from`/`to` pair into your edge list. Complex relationships are cheap to create and easy to delete as your app grows and changes.

:::
```php
// In a Laravel app, relate a user to a project:

use Baleada\Edge\Model;

class Edge extends Model {}

Edge::create([
    'from_kind' => 'user',
    'from' => 1,
    'kind' => 'leads',
    'to_kind' => 'project',
    'to' => 1,
    'profile' => [
        'user' => [...],
        'project' => [...],
    ],
]);
```
:::

When you retrieve data, you can run a single, relatively simple query to get pre-joined results for any access pattern.

:::
```php
// Get all projects led by a specific user:
Edge::from('user', 1)->kind('leads')->to('project')->get();
```
:::

The **downside** of this data modeling strategy: profile data for each object is denormalized and duplicated in the `profile` column across many rows. When you write to the database, you have to update multiple rows to keep the data consistent.

:::
```php
// Update a user's email address

$userProfile = Edge::from('user', 1)
  ->kind('is')
  ->to('profile')
  ->first()
  ->profile->user;

$newUserProfile = [
    ...$userProfile,
    'email' => $newEmail,
];

// Write new data to every edge that references the user's profile
Edge::from('user', 1)->toIn(['profile', 'project', 'task'])
    ->update(['profile->user' => $newUserProfile]);
```
:::


:::
## Installation
:::

Right now, Baleada Edge supports Laravel, and can be installed with Composer:

:::
```bash
composer require baleada/laravel-edge
```
:::


:::
## Usage
:::

Baleada Edge provides two PHP classes: `Migration` and `Model`.

`Baleada\Edge\Migration` extends Laravel's own `Migration` class. It will create a table with the necessary columns for your edge list.

`Baleada\Edge\Model` extends Laravel's `Eloquent\Model` class. It pre-configures `$fillable` fields and `$casts` for your edge list, and also comes with a ton of built-in query methods, tailored to the columns created by the `Migration` class.

With these two tools, you can query complex 


:::
### Customizing `Migration`
:::

You can customize the Baleada Edge migration by extending the `Migration` class.

By default, `Migration` will create a table named `edges`. To change this, set the `$table` property on your class:

:::
```php
use Baleada\Edge\Migration;

return new class extends Migration
{
    protected $table = 'custom_edges';
}
```
:::

`Migration` also adds the required columns for your edge list, with some default types. Here's a breakdown of the columns, their purposes, and their default types:

::: ariaLabel="Edge list columns"
| Column | Purpose | Default Type |
| --- | --- | --- |
| `id` | Primary key | `id` |
| `kind` | The kind of the edge, i.e. the nature of the relationship between the `from` and `to` nodes. | `string` |
| `from_kind` | The kind of the `from` node | `string` |
| `from` | The ID of the `from` node | `integer` |
| `to_kind` | The kind of the `to` node | `string` |
| `to` | The ID of the `to` node | `integer` |
| `profile` | A JSON column for additional data | `json` |
| `created_at` | Timestamp for when the edge was created | `timestamp` |
| `updated_at` | Timestamp for when the edge was last updated | `timestamp` |
:::

The types of all columns except `profile`, `created_at`, and `updated_at` can be customized by overriding the `types` method in your migration.

`types` should return an associative array, where each key is a column name, and each value can be one of two things:
1. The string name of a Laravel `$table` method (e.g. `string`, `integer`, `json`, etc.),
2. OR an array, where the first item is the string name of a Laravel `$table` method, and the rest of the items are arguments to that method.

Here's an example of a migration that uses `string` for the `from` and `to` columns, and configures `from_kind` and `to_kind` to be an `enum` of `user` and `post`:

:::
```php
use Baleada\Edge\Migration;

return new class extends Migration
{
    private $nodeKinds = ['user', 'post'];

    protected function types(): array
    {
        return [
            // For simple type customizations, just provide
            // the type name:
            'from' => 'string',
            'to' => 'string',
            // For more complex type customizations, provide
            // an array where the first item is the type name,
            // and the rest of the items are arguments to the
            // corresponding $table method:
            'from_kind' => ['enum', $this->nodeKinds],
            'to_kind' => ['enum', $this->nodeKinds],
        ];
    }
}
```
:::

If you want to add additional columns to your edges table, you can include more keys and values in the associative array returned by `types`.


:::
### Customizing `Model`
:::

Just like with `Migration`, you can customize the Baleada Edge model by extending the `Model` class.

For example, if you want your edges to use ULIDs instead of the default auto-incrementing integers, you can extend `Model` and use Laravel's `HasUlids` trait:

:::
```php
use Baleada\Edge\Model as Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Edge extends Model
{
    use HasUlids;
}
```
:::


:::
### Querying with `Model` 
:::

`Model` comes with a ton of built-in query methods, tailored to the columns created by the `Migration` class.

Here's a breakdown of the most commonly used methods:

::: ariaLabel="Edge list query methods"
| Method | Purpose |
| --- | --- |
| `from($fromKind[, $fromId])` | Filter edges by the kind (and optionally the ID) of the `from` node |
| `to($toKind[, $toId])` | Filter edges by the kind (and optionally the ID) of the `to` node |
| `kind($kind)` | Filter by edge kind |
| `profile($key, $value)` | Filter by a key-value pair in the `profile` column |
:::

Under the hood, `from`, `to`, and `kind` are thin wrappers around Laravel Eloquent's `where` method, and `profile` is a thin wrapper around the `whereJsonContains` method.

`Baleada\Edge\Model` also adds thin wrappers around all other Eloquent query methods, like `orWhere`, `whereIn`, `whereJsonNotContains`, etc.:

:::
```php
// Get all edges where the `from` node is a user with ID 1
Edge::from('user', 1)->get();

// Get all edges from users or projects
Edge::from('user')->orFrom('project')->get();

// Get all edges where the `to` node is a post or comment
Edge::toIn(['post', 'comment'])->get();

// Get all edges from users to the tasks they _don't_ own
Edge::from('user')->kindNot('owns')->to('task')->get();

// Get all edges for tasks that are not marked "to-do"
Edge::from('task')
  ->to('profile')
  ->profileNot('task->status', 'to-do')
  ->get();
```
:::


:::
### Connecting multiple edges
:::

In real-world projects modeling data as an edge list, you'll frequently run into use cases where a single network request needs to create multiple edges at the same time. If any one of those edges fails to be created, the data would be inconsistent.

For those cases, call the `connect` method on your `Edge` model, passing an array of edge data. `connect` will return an Eloquent collection of created edges:

:::
```php
use App\Models\Edge;

// When the user is viewing a project and creates a task,
// relate the task to the project and to the user who created it:
$edges = Edge::connect([
  [
    'from_kind' => 'project',
    'from' => $projectId,
    'kind' => 'requires',
    'to_kind' => 'task',
    'to' => $taskId,
    'profile' => [
      'project' => [...],
      'task' => [...],
    ],
  ],
  [
    'from_kind' => 'user',
    'from' => $userId,
    'kind' => 'owns',
    'to_kind' => 'task',
    'to' => $taskId,
    'profile' => [
      'user' => [...],
      'task' => [...],
    ],
  ],
]);
```
:::

Internally, Baleada Edge uses Laravel's [database transactions](https://laravel.com/docs/11.x/database#database-transactions) to ensure that each edges is created with separate queries in a single transaction.

If any one of the queries fails, the entire transaction will be rolled back, and no data will be written to the database.
