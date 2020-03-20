---
title: What is Baleada Listenable Gestures?
tags: UI logic
publish: true
order: 0
---

[WIP]

<!-- Baleada Listenable Gestures is a collection of [factory functions](https://www.youtube.com/watch?v=ImwrezYhw4w) that return "gesture recognizers".

These recognizers are simply JavaScript objects with properties that handle DOM events and recognize whether or not the events form a [gesture](/docs/gesture#what-is-a-gesture).

Under the hood, each function in Baleada Listenable Gestures is composed using [Baleada Gesture](/docs/gesture)'s `gesture` function and can
Each Baleada Listenable Gestures are designed to be passed to Baleada Logic's [`Listenable`](/docs/logic/classes/Listenable) class.

:::
## A note, before you dive in
:::

Baleada Listenable Gestures was designed and written during the development of the [`Listenable`](/docs/logic/classes/listenable) class in Baleada Logic




:::
## Installation
:::

:::
```bash
npm i @baleada/listenable-gestures
```
:::


:::
## Usage
:::

To get started, you'll import one of the Baleada Listenable Gestures from the entry file:

:::
```js
import { swipe } from '@baleada/listenable-gestures'
```
:::

The asset you import is actually not the gesture recognizer iteself, but is actually an object that you should pass directly to the `gesture` option of the `Listenable` constructor:

:::
```js
import { swipe } from '@baleada/listenable-gestures'
import { Listenable } from '@baleada/logic'

const instance = new Listenable ('swipe', { gesture: swipe })

Object.keys(swipe) // -> ['factory', 'events', 'recognized']
```
:::

If there's ever a scenario where you want to import one of the factory functions directly, you can access them as named exports from the `factories.js` file at the root of `@baleada/listenable-gestures`:

:::
```js
import { swipe } from '@baleada/listenable-gestures/factories'
```
:::

Each factory function accepts one optional parameter: an object whose key/value pairs customize the behavior of the recognizer that the function returns.

:::
```js
import { taps } from '@baleada/listenable-gestures/factories'

const recognizer = taps({ minTaps: 2 }) // Recognizes a double tap
```
:::

When you're using `Listenable`, pass your options object to the `gesture` property of the `listen` method's second argument.

:::
```js
import { taps as gesture } from '@baleada/listenable-gestures'
import { Listenable } from '@baleada/logic'

const taps = new Listenable ('taps', { gesture })

taps.listen(myListener, {
  gesture: { minTaps: 2 },
})
```
::: -->

<!-- A good way to increase code clarity is to name the `Listenable` instance after the event type you're listening for. If you want to do that, simply use your import statement to change the name of the import.

This example changes `swipe` to `gesture` and uses destructuring to pass it to the `Listenable` constructor:

:::
```js
import { swipe as gesture } from '@baleada/listenable-gestures'
import { Listenable } from '@baleada/logic'

const swipe = new Listenable ('swipe', { gesture })

// Your other code will be more explicit:
swipe.listen(...)
```
::: -->






<!-- :::
## Language, compilation, browser support, and dependencies
:::

Baleada Listenable Gestures are written in modern JavaScript and compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Listenable Gesture's compiled code has no side effects and uses [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) instead of [`require()`](https://nodejs.org/api/modules.html#modules_require_id) and [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports).

Baleada Listenable Gesture's only dependency is Baleada Gesture. -->
