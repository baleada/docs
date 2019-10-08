---
title: Navigable
framework: agnostic
publish: true
order: 0
---


Navigable is a library that enriches an array by:
- Allowing it to store the index-based location of an item that has been navigated to
- Allowing it to retrieve the item that has been navigated to
- Giving it the methods necessary to navigate to a different item

Navigable is written in vanilla JS with no dependencies.

<NiftyHeading level="2">
Construct a Navigable instance
</NiftyHeading>

To construct a Navigable instance (Object), use the Navigable constructor, which takes two parameters:

<NiftyTable>

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `array` | Array | yep | Passes the array that will be made navigable. |
| `options` | Object | nope | Passes options for the Navigable instance. See the <NuxtLink to="#Navigable-constructor-options">Navigable constructor options</NuxtLink> section for more guidance. |

</NiftyTable>


<NiftyCodeblock>
```js
const instance = new Navigable(array[, options])
```
</NiftyCodeblock>

<NiftyTable>
| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `initialLocation` | Number | `0` | The Navigable instance's initial index-based location | N/A | N/A |
| `loops` | Boolean | `true` | <p>Indicates whether or not Navigable should loop around to the beginning or end of the array when navigating past those points.</p><p>See the <NuxtLink to="#How-Navigable-navigates">How Navigable navigates</NuxtLink> section for more info.</p> | N/A | N/A |
| `increment` | Number | `1` | The number of items that will be traversed when the navigable instance is stepping forward through the array | N/A | N/A |
| `decrement` | Number | `1` | The number of items that will be traversed when the navigable instance is stepping backward through the array | N/A | N/A |
| `onNavigate(newLocation, instance)` | Function | See the <NuxtLink to="#How-Navigable-navigates">How Navigable navigates</NuxtLink> section for more info. | <p>Called by the Navigable instance after navigating.</p><p>See the <NuxtLink to="#How-Navigable-navigates">How Navigable navigates</NuxtLink> section for more info.</p> | The new location (Number) and the Navigable instance (Object) | N/A |
| `onGoTo(newLocation, instance)` | Function | none | <p>Called by the Navigable instance after navigating to a specific item.</p><p>See the <NuxtLink to="#How-Navigable-navigates">How Navigable navigates</NuxtLink> section for more info.</p> | The new location (Number) and the Navigable instance (Object) | N/A |
| `onNext(newLocation, instance)` | Function | none | <p>Called by the Navigable instance after navigating to the next item.</p><p>See the <NuxtLink to="#How-Navigable-navigates">How Navigable navigates</NuxtLink> section for more info.</p> | The new location (Number) and the Navigable instance (Object) | N/A |
| `onPrev(newLocation, instance)` | Function | none | <p>Called by the Navigable instance after navigating to the previous item.</p><p>See the <NuxtLink to="#How-Navigable-navigates">How Navigable navigates</NuxtLink> section for more info.</p> | The new location (Number) and the Navigable instance (Object) | N/A |

</NiftyTable>

<NiftyHeading level="2">
Access state and methods
</NiftyHeading>

The constructed Navigable instance is an Object, and state and methods can be accessed via its properties:


<NiftyTable>
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `array` | Array | A shallow copy of the array passed to the Navigable constructor | N/A | N/A |
| `location` | Number | A shallow copy of the `initialLocation` option passed to the Navigable constructor. | N/A | N/A |
| `item` | Getter | See return value | N/A | The item located at `location` in `array` (can be any type) |
| `setArray(newArray)` | Function | Sets the Navigable instance's `array` | The new `array` (Array) | The Navigable instance (`this`) |
| `setLocation(newLocation)` | Function | Sets the Navigable instance's `location` | The new `location` (Number) | The Navigable instance (`this`) |
| `goTo(location)` | Function | Navigates to a specific item | The index-based location (Number) of the item that should be navigated to | The Navigable instance (`this`) |
| `next()` | Function | Steps forward through the array, increasing `location` by `increment` | none | The Navigable instance (`this`) |
| `prev()` | Function | Steps backward through the array, decreasing `location` by `decrement` | none | The Navigable instance (`this`) |
</NiftyTable>


<NiftyHeading level="2">
How Navigable navigates
</NiftyHeading>

In general, whenever the `goTo`, `next`, or `prev` methods are called, the Navigable instance computes the new location, then calls your `onNavigate` function, passing the new location as the first argument and itself (i.e. `this`) as the second argument.

The default `onNavigate` function, shown below, sets the new location each time you call one of the navigation methods:

<NiftyCodeblock>

```js
/*
 * Default onNavigate function for Navigable
 */
(newLocation, instance) => instance.setLocation(newLocation)
```

</NiftyCodeblock>

Immediately afterward, the Navigable instance will also call your `onGoTo`, `onNext`, or `onPrev` functions, depending on which method you called. `onGoTo`, `onNext`, or `onPrev` also receive the new location as the first argument and the Navigable instance (i.e. `this`) as the second argument.

The only other thing you need to know about how your Navigable instance navigates is how the `loops` option affects its behavior. Here's a breakdown:

<NiftyTable>

| When `loops` is... | And the computed location is... | The new location is... |
| --- | --- | --- |
| `false` | `array.length` or greater | `array.length - 1` |
| `false` | `-1` or less | `0` |
| `true` | greater than `array.length - 1` | See explanation below |
| `true` | less than `0` | See explanation below |

</NiftyTable>

When `loops` is `true` and the computed location is greater than `array.length - 1` (the largest index-based location), your Navigable instance calculates how much greater the computed location is, then takes that number of steps forward through the array, looping back to the beginning any time it passes `array.length - 1`.

See the code below for specific examples:

<NiftyCodeblock>

```js
// The loops option is true by default
const instance = new Navigable(['Baleada', 'Logic', 'Navigable'])

instance.goTo(2) // The array is now located at its last item
instance.next() // The array navigated past the end of the array, so it will return to the beginning
instance.location // --> 0

instance.goTo(5) // The array's largest index is 2 (indices start at 0), so going to 5 will leave 3 steps left over.
/*
 * The array starts at 0, where it left off.
 * Your instance navigates two steps forward and reaches the last location.
 * It steps forward once more, looping around to 0.
 * It then makes its final two steps, landing on 2.
 */
instance.location // --> 2

```

</NiftyCodeblock>

When `loops` is `true` and the computed location is less than `0`, your Navigable instance does the same thing, but in reverse: it calculates how much less the computed location is, then takes that number of steps backward through the array, looping around to the end any time it passes `0`.

See the code below for specific examples:

<NiftyCodeblock>

```js
// The loops option is true by default
const instance = new Navigable(['Baleada', 'Logic', 'Navigable'])

instance.goTo(0) // The array is now located at its last item
instance.prev() // The array navigated past the beginning of the array, so it will loops to the end
instance.location // --> 2

instance.goTo(-3) // The array's lowest index is 0 (indices start at 0), so going to -3 will leave 3 steps left over.
/*
 * The array starts at 2, where it left off.
 * Your instance navigates two steps backward and reaches 0.
 * It steps backward once more, looping around to 2.
 * It then makes its final two steps, landing on 0.
 */
instance.location // --> 0

```

</NiftyCodeblock>
