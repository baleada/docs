---
title: What is Baleada Listenable Gestures?
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

Baleada Listenable Gestures is a collection of functions that can help you recognize gestures.

More specifically, each function in the Baleada Listenable Gestures collection returns an object that you can pass to the `handlers` option of Baleada Logic's [`Recognizeable` class](/docs/logic/classes/Recognizeable), or more commonly, to the `recognizeable.handlers` option of the [`Listenable` class](/docs/logic/classes/listenable).


:::
## Installation
:::

:::
```bash
npm i @baleada/listenable-gestures
```
:::


:::
## Workflow
:::

The best way to get a sense of the Baleada Listenable Gestures workflow is to see some code examples.

First, import one of the gestures from Baleada Listenable Gestures:

:::
```js
import { swipe } from '@baleada/listenable-gestures'
```
:::

The gestures are designed to work seamlessly with the `Listenable` class from Baleada Logic. 

In the example below, an instance of the `Listenable` class is  constructed using the `useListenable` composition function from [Baleada Composition](/docs/composition).

Note that the `options` object for the `Listenable` constructor should have a `recognizeable` property, whose value is an object with a `handlers` key. Call your Baleada Listenable Gestures function, passing the result to that key.

:::
```js
import { swipe } from '@baleada/listenable-gestures'

const instance = useListenable(
  'recognizeable', // The Listenable event type will be 'recognizeable'
  {
    // Options object has a `recognizeable` property 
    recognizeable: { 
      // Pass the function's result to options.recognizeable.handlers
      handlers: swipe()
    }
  }
)
```
:::

When you call the instance's `listen` method, `Listenable` will set up all the appropriate event listeners and will execute your callback when the gesture is recognized.

As explained in the [How to listen for gestures](/docs/logic/classes/listenable#how-to-listen-for-gestures) section of the `Listenable` docs, your callback's first parameter is an object with an `event` property and a `recognizeable` property.

All of the Baleada Listenable Gestures functions store their metadata in `recognizeable.metadata`:

:::
```js
instance.listen(({ event, recognizeable }) => {
  console.log(recognizeable.status) // 'recognized'

  // Log the swipe direction:
  console.log(recognizeable.metadata.direction.fromStart)
})
```
:::

Calling `Listenable`'s stop method will remove _all_ active event listeners for the gesture.

:::
```js
instance.stop() // Easy!
```
:::


:::
## Available gestures
:::

Baleada Listenable Gestures currently has functions available for the following gestures:

- [`clicks`](/docs/listenable-gestures/functions/clicks) (i.e. double-clicks, triple-clicks, etc.)
- [`drag`](/docs/listenable-gestures/functions/drag)
- [`dragdrop`](/docs/listenable-gestures/functions/dragdrop)
- [`pan`](/docs/listenable-gestures/functions/pan)
- [`swipe`](/docs/listenable-gestures/functions/swipe)
- [`taps`](/docs/listenable-gestures/functions/taps) (including double-taps, triple-taps, etc.)

And these gestures are on the to-do list:
- `pinch`
- `press`
- `rotate`


:::
## Language, compilation, browser support, and dependencies
:::

The functions in Baleada Listenable Gestures are written in modern JavaScript, and the package has no dependencies ([Baleada Logic](/docs/logic) is a peer dependency).

Functions are compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Logic's compiled code has no side effects and uses [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) instead of [`require()`](https://nodejs.org/api/modules.html#modules_require_id) and [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports).


:::
## Semantic versioning conventions
:::

The following things will trigger a new major release of Baleada Listenable Gestures:
- Any changes to the existing options accepted by any of the Baleada Listenable Gestures functons
- Any changes to the existing metadata stored by the functions

The following things will trigger a new minor release:
- Tha addition of functions for new gestures
- Added options for the functions
- Additional metadata stored by the functions