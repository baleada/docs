---
title: Navigateable
framework: agnostic
publish: true
order: 0
---


`Navigateable` is a class that enriches an array, allowing it to:
- Store the index-based location of an item that has been navigated to
- Retrieve the item that has been navigated to
- Navigate forward or backward to a different item
- Navigate to a specific or a random item

`Navigateable` is written in vanilla JS with no dependencies.

::: type="danger"
Documentation for `Navigateable` is still in progress.
:::


<!-- :::
## Construct a `Navigateable` instance
:::

To construct a `Navigateable` instance (Object), use the `Navigateable` constructor, which takes two parameters:

:::
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

:::
| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `initialLocation` | Number | `0` | The `Navigateable` instance's initial index-based location | N/A | N/A |
| `loops` | Boolean | `true` | <p>Indicates whether or not `Navigateable` should loop around to the beginning or end of the array when navigating past those points.</p><p>See the [How `Navigateable` navigates](#How-Navigateable-navigates) section for more info.</p> | N/A | N/A |
| `increment` | Number | `1` | The number of items that will be traversed when the navigable instance is stepping forward through the array | N/A | N/A |
| `decrement` | Number | `1` | The number of items that will be traversed when the navigable instance is stepping backward through the array | N/A | N/A |
| `onNavigate(newLocation, instance)` | Function | See the [How `Navigateable` navigates](#How-Navigateable-navigates) section for more info. | <p>Called by the `Navigateable` instance after navigating.</p><p>See the [How `Navigateable` navigates](#How-Navigateable-navigates) section for more info.</p> | The new location (Number) and the `Navigateable` instance (Object) | N/A |
| `onGoTo(newLocation, instance)` | Function | none | <p>Called by the `Navigateable` instance after navigating to a specific item.</p><p>See the [How `Navigateable` navigates](#How-Navigateable-navigates) section for more info.</p> | The new location (Number) and the `Navigateable` instance (Object) | N/A |
| `onNext(newLocation, instance)` | Function | none | <p>Called by the `Navigateable` instance after navigating to the next item.</p><p>See the [How `Navigateable` navigates](#How-Navigateable-navigates) section for more info.</p> | The new location (Number) and the `Navigateable` instance (Object) | N/A |
| `onPrev(newLocation, instance)` | Function | none | <p>Called by the `Navigateable` instance after navigating to the previous item.</p><p>See the [How `Navigateable` navigates](#How-Navigateable-navigates) section for more info.</p> | The new location (Number) and the` Navigateable` instance (Object) | N/A |

:::

:::
## Access state and methods
:::

The constructed `Navigateable` instance is an Object, and state and methods can be accessed via its properties:


:::
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `array` | Array | A shallow copy of the array passed to the `Navigateable` constructor | N/A | N/A |
| `location` | Number | A shallow copy of the `initialLocation` option passed to the `Navigateable` constructor. | N/A | N/A |
| `item` | Getter | See return value | N/A | The item located at `location` in `array` (can be any type) |
| `setArray(newArray)` | Function | Sets the `Navigateable` instance's `array` | The new `array` (Array) | The `Navigateable` instance |
| `setLocation(newLocation)` | Function | Sets the `Navigateable` instance's `location` | The new `location` (Number) | The `Navigateable` instance |
| `goTo(location)` | Function | Navigates to a specific item | The index-based location (Number) of the item that should be navigated to | The` Navigateable` instance |
| `next()` | Function | Steps forward through the array, increasing `location` by `increment` | none | The `Navigateable` instance |
| `prev()` | Function | Steps backward through the array, decreasing `location` by `decrement` | none | The `Navigateable` instance |
| `rand()` | Function | Navigates to a random item | none | The `Navigateable` instance |
:::


:::
### How `Navigateable` navigates
:::

In general, whenever the `goTo`, `next`, or `prev` methods are called, the `Navigateable` instance computes the new location, then calls your `onNavigate` function, passing the new location as the first argument and itself (i.e. `this`) as the second argument.

The default `onNavigate` function, shown below, sets the new location each time you call one of the navigation methods:

:::
```js
/*
 * Default onNavigate function for Navigateable
 */
(newLocation, instance) => instance.setLocation(newLocation)
```
:::

Immediately afterward, the `Navigateable` instance will also call your `onGoTo`, `onNext`, or `onPrev` functions, depending on which method you called. `onGoTo`, `onNext`, or `onPrev` also receive the new location as the first argument and the `Navigateable` instance (i.e. `this`) as the second argument.

The only other thing you need to know about how your `Navigateable` instance navigates is how the `loops` option affects its behavior. Here's a breakdown:

:::
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

instance.goTo(2) // The array is now located at its last item
instance.next() // The array navigated past the end of the array, so it will return to the beginning
instance.location // -> 0

instance.goTo(5) // The array's largest index is 2 (indices start at 0), so going to 5 will leave 3 steps left over.
/*
 * The array starts at 0, where it left off.
 * Your instance navigates two steps forward and reaches the last location.
 * It steps forward once more, looping around to 0.
 * It then makes its final two steps, landing on 2.
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

instance.goTo(0) // The array is now located at its last item
instance.prev() // The array navigated past the beginning of the array, so it will loops to the end
instance.location // -> 2

instance.goTo(-3) // The array's lowest index is 0 (indices start at 0), so going to -3 will leave 3 steps left over.
/*
 * The array starts at 2, where it left off.
 * Your instance navigates two steps backward and reaches 0.
 * It steps backward once more, looping around to 2.
 * It then makes its final two steps, landing on 0.
 */
instance.location // -> 0

```
::: -->
