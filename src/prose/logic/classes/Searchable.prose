---
title: Searchable
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

`Searchable` is a class that enriches an array, allowing it to:
- Create and store a searchable trie of itself
- Search the trie for matches or fuzzy matches to a query
- Store search results
- Store a status (`ready` or `searched`)

`Searchable` depends on the `Searcher` class from the [fast-fuzzy](https://github.com/EthanRutherford/fast-fuzzy) package.

::: type="info"
`Searchable` adds very little extra functionality to the fast-fuzzy `Searcher` class. It's intended to be a thin wrapper, simply ensuring that the `Searcher` class conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Searchable` instance
:::

To construct a `Searchable` instance (Object), use the `Searchable` constructor, which takes two parameters:

::: ariaLabel="Searchable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `candidates` | Array | yes | Passes the search candidates that will be made searchable. All items in `candidates` should be strings or objects. |
| `options` | Object | no | Passes options for the `Searchable` instance. See the [`Searchable` constructor options](#Searchable-constructor-options) section for more guidance. |
:::


:::
```js
const instance = new Searchable(candidates[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/compositon):

:::
```js
const reactiveInstance = useSearchable(candidates[, options])
```
:::


:::
### `Searchable` constructor options
:::

`Searchable`'s `options` object accepts any key/value pair that you can pass to fast-fuzzy. See the [fast-fuzzy docs](https://github.com/EthanRutherford/fast-fuzzy#options) for more guidance.


:::
## Access state and methods
:::

The constructed `Searchable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Searchable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `candidates` | Getter/Setter | See return value | N/A | <p>A shallow copy (Array) of the `candidates` array passed to the constructor.</p><p>If you assign a value directly to `candidates`, a setter will pass the new value to `setCandidates`.</p> |
| `status` | Getter | See return value | N/A | The status (String) of the `Searchable` instance. `status` is `ready` after the instance is constructed, and changes to `searched` after the `candidates` are searched for the first time. |
| `results` | Getter | See return value | N/A | <p>The place where search results (Array) are stored.</p><p>Immediately after the `Searchable` instance is constructed, `results` is simply an empty array (`[]`).</p><p>See the [How `results` are formatted](#how-results-are-formatted) section for more guidance.</p> |
| `trie` | Getter | See return value | N/A | The searchable trie (Object) created by the `Searcher` class (Array) |
| `setCandidates(newCandidates)` | Function | Sets the `candidates` and updates `trie`. | The new `candidates` (Array) | The `Searchable` instance |
| `search(query, options)` | Function | Searches the `candidates` to find matches and fuzzy matches for your query. | <p>A search query (String) and search options (Object).</p><p>To learn more about what search options are available, [visit the docs for the `Searcher` class' `search` method](https://github.com/EthanRutherford/fast-fuzzy#options).</p> | The `Searchable` instance |
:::


:::
### How `results` are formatted
:::

The `results` returned from the `search` method are stored in an array of objects. Here's an example pulled from the `fast-fuzzy` docs to show you what those objects look like:

:::
```js
[
  {
    item: 'abc',
    original: 'abc',
    key: 'abc',
    score: 1,
    match: { index: 0, length: 3 },
  },
  { 
    item: 'bcd',
    original: 'bcd',
    key: 'bcd',
    score: 0.6666666666666667,
    match: { index: 0, length: 2 },
  }
  ...
]
```
:::




:::
## API design compliance
:::

::: ariaLabel="A table showing Searchable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `candidates`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setCandidates` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `results`, `trie` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `search` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "Candidates can be searched." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
