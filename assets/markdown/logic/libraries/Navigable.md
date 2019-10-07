---
title: Navigable
framework: agnostic
publish: true
order: 0
---


Navigable is a library that enriches an array by:
- Allowing it to store the index-based location of an item that has been navigated to
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
| `loops` | Boolean | `true` | <p>`true` when the Navigable instance should loop around to the beginning of the array after it navigates past the last item AND should loop around to the end after it navigates before the first item.</p><p>`false` when the instance should stop at the last item and first item instead of navigating past them.</p> | N/A | N/A |
| `increment` | Number | `1` | The number of items that will be traversed when the navigable instance is stepping forward through the array | N/A | N/A |
| `decrement` | Number | `1` | The number of items that will be traversed when the navigable instance is stepping backward through the array | N/A | N/A |

</NiftyTable>

<NiftyHeading level="2">
Access state and methods
</NiftyHeading>

The constructed Completable instance is an Object, and state and methods can be accessed via its properties:


<NiftyTable>
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `array` | Array | A shallow copy of the array passed to the Navigable constructor | N/A | N/A |
| `location` | Getter | See return value | N/A | The Navigable instance's current index-based location (Number) |
| `setArray(newArray)` | Function | Sets the Navigable instance's `array` | The new `array` (Array) | The Navigable instance (`this`) |
| `goTo(location)` | Function | Navigates to a specific item | The index-based location (Number) of the item that should be navigated to | The Navigable instance (`this`) |
| `next()` | Function | Steps forward through the array, increasing `location` by `increment` | N/A | The Navigable instance (`this`) |
| `prev()` | Function | Steps backward through the array, decreasing `location` by `decrement` | N/A | The Navigable instance (`this`) |
</NiftyTable>
