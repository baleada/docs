---
title: Searchable
framework: agnostic
publish: true
order: 0
---

`Searchable` is a class that enriches an array, allowing it to:
- Create and store a searchable trie of itself
- Search the trie for matches or fuzzy matches to a query
- Store search results

`Searchable` depends on the `Searcher` class from the [fast-fuzzy](https://github.com/EthanRutherford/fast-fuzzy) package.

::: type="info"
`Searchable` adds virtually no extra functionality to the fast-fuzzy `Searcher` class. It's mostly intended to be a thin wrapper, simply ensuring that the `Searcher` class conforms to all of Baleada Logic's API design specs and naming conventions.
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


:::
### `Searchable` constructor options
:::

In addition to the options listed below, `Searchable`'s `options` object accepts any key/value pair that you can pass to fast-fuzzy. See the [fast-fuzzy docs](https://github.com/EthanRutherford/fast-fuzzy#options) for more guidance.

::: ariaLabel="Searchable constructor options" classes="wide-3 wide-4 wide-5 wide-6"
| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `onSearch(newResults, instance)` | Function | See the [How `Searchable` searches](#How-Searchable-searches) section for more info. | <p>Called by the `Searchable` instance after searching.</p><p>See the [How `Searchable` searches](#How-Searchable-searches) section for more info.</p> | The new search results (Array) and the `Searchable` instance (Object) | N/A |
:::


:::
## Access state and methods
:::

The constructed `Searchable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Searchable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `candidates` | Array | A shallow copy of the `candidates` array passed to the constructor | N/A | N/A |
| `results` | Array | <p>A convenient place to store search results.</p><p>Immediately after the `Searchable` instance is constructed, `results` is an empty array (`[]`).</p>  | N/A | N/A |
| `trie` | Getter | See return value | N/A | The searchable trie (Object) created by the `Searcher` class (Array) |
| `setCandidates(newCandidates)` | Function |  | The new `candidates` (Array) | The `Searchable` instance |
| `setResults(newResults)` | Function |  | The new `results` (Array) | The `Searchable` instance |
| `search(query, options)` | Function |  | <p>A search query (String) and search options (Object).</p><p>To learn more about what search options are available, [visit the docs for the `Searcher` class' `search` method](https://github.com/EthanRutherford/fast-fuzzy#options).</p> | The `Searchable` instance |
:::

:::
### How `Searchable` searches
:::

Whenever the `search` method is called, the `Searchable` instance computes a new array of search results (using the `search` method on the `Searcher` class), then calls your `onSearch` function, passing the new results as the first argument and itself (i.e. `this`) as the second argument.

The default `onSearch` function, shown below, sets `results` to the new results each time you call `search`:

:::
```js
// Default onSearch function for Searchable
(newResults, instance) => instance.setResults(newResults)
```
:::


:::
## API design compliance
:::

::: ariaLabel="A table showing Searchable's API design compliance" classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <ApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <ApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <ApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties | <ApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <ApiDesignSpecCheckmark /> |  |
| Stores a shallow copy of the constructor's state in a public property named after the state's type | <ApiDesignSpecCheckmark /> | `candidates`  |
| Has a public method you can use to assign a new value to each public property | <ApiDesignSpecCheckmark /> | `setCandidates`, `setResults` |
| Outside of the methods listed above, it never writes to its own public properties. | <ApiDesignSpecCheckmark /> |  |
| Has one or more public getters | <ApiDesignSpecCheckmark /> | `trie` |
| Has one or more public methods that expose core functionality | <ApiDesignSpecCheckmark /> | `search` |
| These methods either don't create mutated state or emit mutated state through an `on<Method>` function | <ApiDesignSpecCheckmark /> | `onSearch` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <ApiDesignSpecCheckmark /> | |
| Uses the sentence template to decide what state type should be accepted by a constructor | <ApiDesignSpecCheckmark /> | "Candidates can be searched." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <ApiDesignSpecCheckmark /> | `Searchable`'s constructor accepts options for the `Searcher` class, but those can be overridden when calling the `search` function. |
:::
