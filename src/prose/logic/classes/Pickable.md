---
title: Pickable
tags: UI logic
publish: true
order: 0
---


`Pickable` is a class that enriches an array, allowing it to:
- Store the index-based location of items that have been picked
- Retrieve the items that have been picked
- Store a status (`ready`, `picked`, or `omitted`)
- Replace existing picks using different strategies, like FIFO or LIFO
- Omit specific picks, or all picks


:::
## Construct a `Pickable` instance
:::

To construct a `Pickable` instance (Object), use the `Pickable` constructor, which accepts two parameters:

::: ariaLabel="Pickable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `array` | Array | yes | Passes the array that will be made navigable. |
| `options` | Object | no | Passes options for the `Pickable` instance. See the [Pickable constructor options](#Pickable-constructor-options) section for more guidance. |
:::


:::
```js
import { Pickable } from '@baleada/logic'

const instance = new Pickable(array[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/composition):

:::
```js
import { usePickable } from '@baleada/vue-composition'

const reactiveInstance = usePickable(array[, options])
```
:::



:::
### `Pickable` constructor options
:::

::: ariaLabel="Pickable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `initialPicks` | Number, Array | `[]` | <p>The `Pickable` instance's initial index-based picks.</p><p>`initialPicks` should be a number or an array of numbers.</p> |
:::


:::
## Access state and methods
:::

The constructed `Pickable` instance is an Object, and state and methods can be accessed via its properties:

::: ariaLabel="Pickable state and methods" classes="wide-1 wide-3 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `array` | Getter/Setter | See return value | N/A | <p>A shallow copy (Array) of the array passed to the `Pickable` constructor.</p><p>If you assign a value directly to `array`, a setter will pass the new value to `setArray`.</p> |
| `picks` | Getter/Setter | See return value | N/A | <p>An array of index-based locations (Number) stored by the `Pickable` instance. Defaults to the `initialPicks` option passed to the constructor.</p><p>If you assign a value directly to `picks`, a setter will pass the new value to `setPicks`.</p><p>`picks` are stored **in the order that they were picked**, not in order of lowest-to-highest index.</p> |
| `first` | Getter | See return value | N/A | The first pick, i.e. the lowest index in `picks`. |
| `last` | Getter | See return value | N/A | The last pick, i.e. the highest index in `picks` |
| `oldest` | Getter | See return value | N/A | The first index in `picks` |
| `newest` | Getter | See return value | N/A | The last index in `picks` |
| `multiple` | Getter | See return value | N/A | A boolean indicating whether or not `picks` contains more than one index |
| `items` | Getter | See return value | N/A | The items (can be any type) located at the `picks` indices in `array` |
| `status` | Getter | See return value | N/A | The status (String) of the `Pickable` instance. `status` is `ready` after the instance is constructed, and changes to `picked` a successful pick, or `omitted` after a successful omission. |
| `setArray(array)` | Function | Sets the `Pickable` instance's `array` | The new `array` (Array) | The `Pickable` instance |
| `setPicks(picks)` | Function | An alias for the `pick` method, but it **doesn't** support the optional `options` argument. | The new `picks` (Number or Array) | The `Pickable` instance |
| `pick(indexOrIndices[, options])` | Function | <p>Picks a specific item or more than one item, identified by their index-based positions in the array.</p><p>See the [How `Pickable` picks](#how-pickable-picks) section for more information on how `options` affect picking.</p> | The index-based position (Number) of the item that should be picked, or an array of index-based positions for multiple picks. Also accepts an optional `options` argument. | The` Pickable` instance |
| `omit([indexOrIndices])` | Function | <p>Omits (removes from `picks`) a specific item or more than one item, identified by their index-based positions in the array.</p><p>When called with no arguments, `omit` omits every pick from `picks`, leaving only an empty array.</p> | Optional: the index-based position (Number) of the item that should be picked, or an array of index-based positions for multiple picks. | The` Pickable` instance |
:::


:::
### How `Pickable` picks
:::

In general, whenever the `setPicks` or `pick` methods are called, the `Pickable` instance computes the new picks and stores their index-based locations in its `picks` property.

Picks are stored **in the order that they were picked**, not in order of lowest-to-highest index. Duplicate picks are ignored.

:::
```js
import { Pickable } from '@baleada/logic'

const pickable = new Pickable(myArray)

pickable.pick(4)
pickable.pick(2)
pickable.pick(420)
pickable.pick(42)

pickable.picks // -> [4, 2, 420, 42]
pickable.first // -> 2
pickable.last // -> 420
pickable.oldest // -> 4
pickable.newest // -> 42
```
:::

The only other thing you need to know about how your `Pickable` instance picks is what options are available for the `pick` method, and how those options affect the way `Pickable` computes the final picks.

`pick` accepts an optional `options` object as its second argument. Here's a breakdown of the `options` object:

::: ariaLabel="Options for the navigate method" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `replace` | String | `none` | <p>When `replace` is set to `none`, `Pickable` will append the new index or indices to its existing picks.</p><p>When `replace` is set to `all`, `Pickable` will clear out all the existing picks, and replace them with the new index or indices passed to the `pick` method.</p><p>When `replace` is set to `fifo`, `Pickable` will add the new picks, then remove the oldest picks until the `picks` array reaches its previous length.</p><p>When `replace` is set to `lifo`, `Pickable` removes the most recent picks to make room for the new picks, so that the array maintains its previous length.</p> |
:::


:::
## Using with TypeScript
:::

The `Pickable` constructor accepts one generic type that you can use to enforce a type for the items in `array`. By default, TypeScript will infer the item type from the initial array you pass to the constructor, but you can specify the type manually if needed.

:::
```ts
const withInferredTypes = new Pickable([1, 2, 3])
withInferredTypes.array = ['a', 'b', 'c'] // Type error

const withManualTypes = new Pickable<string | number>([1, 2, 3])
withManualTypes.array = ['a', 'b', 'c'] // No type error
```
:::


:::
## API design compliance
:::

::: ariaLabel="A table showing Pickable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `array`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setArray` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | `picks`, `setPicks` |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `first`, `last`, `oldest`, `newest`, `items`, `multiple` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `pick`, `omit` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> | no side effects |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "An array can be picked." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | `pick(indexOrIndices[, options])` |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
