---
title: What is Baleada Gesture?
framework: agnostic
publish: true
order: 0
---

Baleada Gesture is a tiny [factory function](https://www.youtube.com/watch?v=ImwrezYhw4w) that helps you define custom [gestures](#what-is-a-gesture).

The function returns an API—more specifically, a JavaScript object with useful properties and methods that will help you handle DOM events and recognize gestures.


:::
## A note, before you dive in
:::

Baleada Gesture was designed and written during the development of the [`Listenable`](/docs/logic/classes/listenable) class in Baleada Logic, and [Baleada Listenable Gestures](/docs/listenable-gestures) is built on top of Baleada Gesture to help you listen for the following gestures in your project:
- clicks (for recognizing single clicks, double clicks, or any other number of clicks)
- drag
- dragdrop
- pan
- pinch
- press
- rotate
- swipe
- taps (for recognizing single taps, double taps, or any other number of taps)

Before you use Baleada Gesture to define your own custom gestures, it's recommended that you check out the `Listenable` docs and the Baleada Listenable Gestures docs, and see how those tools work together. If you're satisfied with that workflow, and agree with the way the gestures are defined and recognized, you may not need to use Baleada Gesture at all.

But, if you don't agree with the way Baleada Listenable Gestures defines certain gestures, or if you want to add a new custom gesture, Baleada Gesture lays a great foundation that you can build upon!


:::
## What is a "gesture"?
:::

In the context of Baleada Gesture, a "gesture" is defined as a sequence of DOM events that can be recognized as something more abstract. For example, a "swipe" gesture is:
- A single touch,
- that starts at a given point,
- travels a distance greater than 0px (or a minimum distance of your choice),
- travels at a velocity of greater than 0px/ms (or a minimum velocity of your choice),
- does not cancel,
- and finally, ends.

This sequence involves the [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event), [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event), [`touchcancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event), and [`touchend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event) events. If those events happen in a particular order, and if their combined event data meets the conditions listed above, then the entire sequence of events can be considered one "swipe".


:::
## Installation
:::

:::
```bash
npm i @baleada/gesture
```
:::


:::
## Usage
:::

:::
### Import the factory function
:::

To get started, import the `gesture` factory function from Baleada Gesture's entry file:

:::
```js
import gesture from '@baleada/gesture'
```
:::


:::
### Create your factory function
:::

After you import `gesture`, define your own factory function for your custom gesture:

:::
```js
import gesture from '@baleada/gesture'

export default function pan () {
  ...
}
```
:::


:::
### Build your objects
:::

At the bottom of your factory function, use the `gesture` function to create a gesture API with useful properties and methods ([more on this later](#gesture-object-properties-and-methods)), and create the object you'll be returning from your function. You'll be passing an options object to the `gesture` function, but we'll handle that part later.

:::
```js
import gesture from '@baleada/gesture'

export default function pan () {
  // We'll be putting other code here

  const api = gesture({ ... }),
        object = {
          // Add properties, methods, getters, setters, etc.
        }

  return object
}
```
:::


:::
### Define your event handlers
:::

With your objects defined at the bottom, start defining functions at the top. These functions will handle incoming DOM events, extract any metadata you need, and determine whether or not the full sequence of events matches the definition of your custom recognizer.

You can name these functions anything, but the best practice is to name them after the type of event they will be handling:

:::
```js
import gesture from '@baleada/gesture'

export default function pan () {
  function touchstart () {
    ...
  }
  function touchmove () {
    ...
  }
  function touchcancel () {
    ...
  }
  function touchend () {
    ...
  }

  const api = gesture({ ... }),
        object = { ... }
  return object
}
```
:::

From inside your functions, you can freely access your gesture API:

:::
```js
import gesture from '@baleada/gesture'

export default function pan () {
  function touchstart () {
     console.log(api.events) // This works, because in practice, the function won't run until after the gesture API has been defined
  }

  ...

  const api = gesture({ ... }),
        object = { ... }
  return object
}
```
:::

Below is a full breakdown of the properties and methods included with the gesture API.

:::
### Gesture API properties and methods
:::

::: ariaLabel="Gesture API properties and methods" canFilterByQuery

| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `status` | Getter | See return value | N/A | The current status (String) of the instance. `status` is always `'ready'`, `'recognizing'`, or `'recognized'`. |
| `handle(event)` | Function | <p>Interprets the type of its `event` parameter and calls the matching method on your subclass.</p> <p>`handle` also calls the `reset` method (details below) IF `status` is `'recognized'` AND the `gesture` constructor's `recognizesConsecutive` option is `false`.</p> <p>`handle` also adds its `event` parameter to the `events` array (details below) and will remove events from that array IF the `gesture` constructor's `maxSequenceLength` option is a number AND the events array's length is greater than that number.</p> | N/A | `status` |
| `events` | Getter | See return value | N/A | The events (Array) that have been passed to the `handle` method |
| `lastEvent` | Getter | See return value | N/A | The last event (Event) in the `events` array |
| `recognized()` | Function | Sets `status` to `'recognized'` | none | none |
| `reset()` | Function | Sets `events` to an empty array, `lastEvent` to `undefined`, `status` to `'ready'`, and calls the optional `onReset` function, if available ([see below](#gesture-factory-options) for more info on the optional `onReset` function). | none | none |
:::


:::
### Pass your event handlers to the gesture factory
:::

When you're satisfied with the functions you've defined, return to the `gesture` function's optional parameter, which is an object. Add a `handlers` property to the object. The value of the `handlers` property should be an object. The keys of the object should be the names of the DOM events you'll be listening to, and the values should be the functions you wrote previously to handle the events.

If you named your functions after the DOM events they handle, you can easily destructure them into your `handlers` object:

:::
```js
import gesture from '@baleada/gesture'

export default function pan () {
  function touchstart () { ... }
  function touchmove () { ... }
  function touchcancel () { ... }
  function touchend () { ... }

  const api = gesture({
          handlers: { touchstart, touchmove, touchcancel, touchend }
        }),
        object = { ... }
  return object
}
```
:::

Internally, your gesture API uses the `handlers` option to make sure all events are routed to the correct handler, so that your gesture-identifying logic runs properly.


:::
### Connect your object to the gesture API
:::

Each time a DOM event comes through, your gesture API will call the appropriate function defined in your `handlers` object, passing two arguments:
1. The DOM event that just happened
2. The "handler API". For more info on the handler API, [check out the full guide](/docs/gesture/handler-api).

For all of this to work, however, you need to make sure that events are being passed to your gesture API's `handle` method when they come through. You can connect these two objects however you like, but usually, the easiest way is to define a simple `handle` method on the object you'll be returning:

:::
```js
import gesture from '@baleada/gesture'

export default function pan () {
  ...
  const api = gesture({ ... }),
        object = {
          handle: event => api.handle(event)
        }
  return object
}
```
:::

The last thing you need to know is what other options the `gesture` function accepts so that you can customize the object you receive back. Here's a full breakdown:

:::
### Gesture factory options
:::

::: ariaLabel="Gesture factory options" canFilterByQuery
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `handlers` | Object | none | Passes key/value pairs, where each key is the name of a DOM event you want to listen to, and each value is the appropriate handler function you defined for that event. |
| `recognizesConsecutive` | Boolean | `false` | <p>Indicates whether or not `gesture` should be able to recognize the same gesture multiple times in a row without calling its `reset` method.</p> <p>Keep it as `false` for gestures like "swipe" and "drag-and-drop", which have precise starting and ending points. Set it to `true` for gestures like "pan" or "click-and-drag", which can continue to occur after they are first recognized.</p> |
| `maxSequenceLength` | Number | `false` | <p>Defines the maximum number of events that the `gesture` class will keep track of.</p> <p>If `maxSequenceLength` is a number greater than 0, `gesture` will remove the first event in the array each time the `maxSequenceLength` is exceeded. If `maxSequenceLength` is `false`, `gesture` will never remove events from the array.</p> |
| `onReset` | Function | none | Passes a function that your gesture API will call each time its own `reset()` method is called. Your gesture API calls its own `reset()` method when its `status` is `'recognized'` and the `recognizesConsecutive` options is `false`. You can use the `onReset` option to hook into that function call and properly reset any variables you're using to store metadata about events. |
:::


:::
## Inspiration for your custom gestures
:::

For inspiration and some examples of how Baleada Gesture is used in practice, check out the [Baleada Listenable Gesture source code](https://gitlab.com/baleada/listenable-gestures/tree/master/src/factories).


:::
## Language, compilation, browser support, and dependencies
:::

Baleada Gesture is written in modern JavaScript and compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Gesture's compiled code has no side effects and uses [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) instead of [`require()`](https://nodejs.org/api/modules.html#modules_require_id) and [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports).

Baleada Gesture has no dependencies.
