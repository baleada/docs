---
title: Navigateable
tags: UI logic
publish: true
order: 0
---


`Navigateable` is a class that enriches an array, allowing it to:
- Store the index-based location of an item that has been navigated to
- Retrieve the item that has been navigated to
- Store a status (`ready` or `navigated`)
- Navigate forward or backward to a different item
- Navigate to a specific item or a random item

`Navigateable` is written in vanilla JS with no dependencies.


:::
## Construct a `Navigateable` instance
:::

To construct a `Navigateable` instance (Object), use the `Navigateable` constructor, which takes two parameters:

::: ariaLabel="Delayable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `array` | Array | yes | Passes the array that will be made navigable. |
| `options` | Object | no | Passes options for the `Navigateable` instance. See the [Navigateable constructor options](#Navigateable-constructor-options) section for more guidance. |
:::


:::
```js
const instance = new Navigateable(array[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/compositon):

:::
```js
const reactiveInstance = useNavigateable(array[, options])
```
:::



:::
### `Navigateable` constructor options
:::

::: ariaLabel="Navigateable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `initialLocation` | Number | `0` | The `Navigateable` instance's initial index-based location |
:::


:::
## Access state and methods
:::

The constructed `Navigateable` instance is an Object, and state and methods can be accessed via its properties:

::: ariaLabel="Navigateable state and methods" classes="wide-3 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `array` | Getter/Setter | See return value | N/A | <p>A shallow copy (Array) of the array passed to the `Navigateable` constructor.</p><p>If you assign a value directly to `array`, a setter will pass the new value to `setArray`.</p> |
| `location` | Getter/Setter | See return value | N/A | <p>The index-based location (Number) stored by the `Navigateable` instance. Defaults to the `initialLocation` option passed to the constructor.</p><p>If you assign a value directly to `location`, a setter will pass the new value to `setLocation`.</p> |
| `item` | Getter | See return value | N/A | The item (can be any type) located at `location` in `array` |
| `setArray(array)` | Function | Sets the `Navigateable` instance's `array` | The new `array` (Array) | The `Navigateable` instance |
| `setLocation(location)` | Function | An alias for the `navigate` method | The new `location` (Number) | The `Navigateable` instance |
| `navigate(location)` | Function | <p>Navigates to a specific item.</p><p>If the new location is less than `0`, `navigate` will set `location` to `0`.</p><p>If the new location is greater than the index of the last item in the array, `navigate` will set `location` to the index of the last item in the array.</p> | The index-based location (Number) of the item that should be navigated to | The` Navigateable` instance |
| `next(options)` | Function | <p>Steps forward through the array, increasing `location` by `options.distance`.</p> | <p>An `options` object with two properties: `distance` (Number) and `loops` (Boolean).</p><p>See the [How `Navigateable` navigates](#how-navigateable-navigates) section for more information on how `options` affect navigation.</p> | The `Navigateable` instance |
| `previous(options)` | Function | Steps backward through the array, decreasing `location` by `options.distance`. | <p>An `options` object with two properties: `distance` (Number) and `loops` (Boolean).</p><p>See the [How `Navigateable` navigates](#how-navigateable-navigates) section for more information on how `options` affect navigation.</p> | The `Navigateable` instance |
| `random()` | Function | Navigates to a random item | none | The `Navigateable` instance |
:::


:::
### How `Navigateable` navigates
:::

In general, whenever the `setLocation`, `navigate`, `next`, `previous`, or `random` methods are called, the `Navigateable` instance computes the new location and stores that location in its `location` property. 

The only other thing you need to know about how your `Navigateable` instance navigates is what options are available for the `next` and `previous` methods, and how those options affect the way `Navigateable` computes the final location.

Both `next` and `previous` accept an optional `options` object as their only argument. Here's a breakdown of the `options` object:

::: ariaLabel="Options for the next and previous methods" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `distance` | Number | `1` | The number of items that will be traversed when the navigateable instance is stepping forward (`next`) or backward (`previous`) through the array. |
| `loops` | Boolean | `true` | <p>Indicates whether or not `Navigateable` should loop around to the beginning or end of the array when navigating past those points.</p><p>See the table below for more info on exactly how looping works.</p> |
:::


::: ariaLabel="How the loops option affects navigation"
| When `loops` is... | And the computed location is... | The new location is... |
| --- | --- | --- |
| `false` | `array.length` or greater | `array.length - 1` |
| `false` | `-1` or less | `0` |
| `true` | greater than `array.length - 1` | See explanation below |
| `true` | less than `0` | See explanation below |
:::

When `loops` is `true` and the computed location is greater than `array.length - 1` (the largest index-based location), your` Navigateable` instance calculates how much greater the computed location is, then takes that number of steps forward through the array, looping back to the beginning any time it passes `array.length - 1`.

See the code below for specific examples:

:::
```js
// The loops option is true by default
const instance = new Navigateable(['Baleada', 'Logic', 'Navigateable'])

instance.navigate(2) // The array is now located at its last item
instance.next() // The array navigated past the end of the array, so it will return to the beginning
instance.location // -> 0

instance.next({ distance: 5 }) // The array's location is 0, and its largest index is 2.
/*
 * The array starts at 0, where it left off.
 * Your instance navigates 2 steps forward and reaches the last location (3 steps remain).
 * It steps forward once more, looping around to 0 (2 steps remain).
 * It then makes its final 2 steps, landing on 2 (0 steps remain).
 */
instance.location // -> 2

```
:::

When `loops` is `true` and the computed location is less than `0`, your `Navigateable` instance does the same thing, but in reverse: it calculates how much less the computed location is, then takes that number of steps backward through the array, looping around to the end any time it passes `0`.

See the code below for specific examples:

:::
```js
// The loops option is true by default
const instance = new Navigateable(['Baleada', 'Logic', 'Navigateable'])

instance.navigate(0) // The array is now located at its first item
instance.previous() // The array navigated past the beginning of the array, so it will loops to the end
instance.location // -> 2

instance.previous({ distance: 5 }) // The array's location is 2, and its lowest index is 0.
/*
 * The array starts at 2, where it left off.
 * Your instance navigates 2 steps backward and reaches 0 (3 steps remain).
 * It steps backward once more, looping around to 2 (2 steps remain).
 * It then makes its final two steps, landing on 0 (0 steps remain).
 */
instance.location // -> 0

```
:::


:::
## API design compliance
:::

::: ariaLabel="A table showing Navigateable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <ApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <ApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <ApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <ApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <ApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <ApiDesignSpecCheckmark /> | `array`  |
| Has a public method you can use to set a new value for that public getter | <ApiDesignSpecCheckmark /> | `setArray` |
| Has a setter for that getter so you can assign a new value directly | <ApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <ApiDesignSpecCheckmark /> | `location`, `setLocation` |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <ApiDesignSpecCheckmark /> | `status`, `item` |
| Has one or more public methods that expose core functionality | <ApiDesignSpecCheckmark /> | `navigate`, `next`, `previous`, `random` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <ApiDesignSpecCheckmark /> | no side effects |
| Uses the sentence template to decide what state type should be accepted by a constructor | <ApiDesignSpecCheckmark /> | "An array can be navigated." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <ApiDesignSpecCheckmark /> | `next(options)`, `previous(options)` |
| Named after its core action, proper-cased and suffixed with `able` | <ApiDesignSpecCheckmark /> | |
:::
