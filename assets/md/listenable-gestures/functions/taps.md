---
title: taps
tags: UI Logic, Vue, React, Svelte
publish: true
order: 0
---

`taps` is defined as a single touch that:
- starts at a given point
- does not move beyond a maximum distance
- does not cancel
- ends
- repeats 1 time (or a minimum number of your choice), with each tap ending less than or equal to 500ms (or a maximum interval of your choice) after the previous tap ended

The `taps` function returns an object that contains event handlers for the following events:
- `touchstart`
- `touchmove`
- `touchcancel`
- `touchend`

::: type="info"
In Baleada Listenable Gestures, `taps` is the touch event equivalent of [`clicks`](/docs/listenable-gestures/functions/clicks).
:::

::: type="warning"
If you're implementing a clicks feature for a touchscreen, use `taps` instead of [`clicks`](/docs/listenable-gestures/functions/clicks) (which only works for mouse events).

Likewise, if you're implementing a taps feature for desktop, use [`clicks`](/docs/listenable-gestures/functions/clicks) instead of `taps` (which only works for touch events).
:::


:::
## Create the `taps` handlers
:::

To create the `taps` handlers, import and call the `taps` function:

:::
```js
import { taps } from '@baleada/listenable-gestures'

const tapsHandlers = taps(/* options */)

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: tapsHandlers } }
)
```
:::

Optionally, you can pass an `options` object as the first argument of the `taps` function. Here's a breakdown of the `options` object:

::: ariaLabel="taps options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minTaps` | Number | `1` | The minimum number of repetitions required before the gesture is recognized. |
| `maxInterval` | Number | `500` | The maximum number of milliseconds that can pass between the end of each click. |
| `maxDistance` | Number | `5` | The maximum distance the mouse can travel after `touchstart` and before `touchend`. |
| `onStart` | Function | none | <p>Hooks into the `touchstart` event that the `taps` handlers listen to.</p><p>`onStart` receives the taps hook API as its only argument. See the [Taps hook API](#taps-hook-api) section for more info.</p> |
| `onMove` | Function | none | <p>Hooks into the `touchmove` event that the `taps` handlers listen to.</p><p>`onMove` receives the taps hook API as its only argument. See the [Taps hook API](#taps-hook-api) section for more info.</p> |
| `onCancel` | Function | none |  <p>Hooks into the `touchcancel` event that the `taps` handlers listen to.</p><p>`onCancel` receives the taps hook API as its only argument. See the [Taps hook API](#taps-hook-api) section for more info.</p> |
| `onEnd` | Function | none | <p>Hooks into the `touchend` event that the `taps` handlers listen to.</p><p>`onEnd` receives the taps hook API as its only argument. See the [Taps hook API](#taps-hook-api) section for more info.</p> |
:::


:::
### Taps hook API
:::

`taps` provides handlers for the `touchstart`, `touchmove`, `touchcancel`, and `touchend` events, and those handlers gather and store all the metadata needed to recognize a taps gesture.

But, if you ever want to take some additional action during any of those events, you can use the taps hooks:
- `onStart`
- `onMove`
- `onCancel`
- `onEnd`

The taps hooks get called after the `taps` handlers have performed their necessary actions, and each hook receives the taps hook API as its only argument. The taps hook API is an object—here's a full breakdown:

::: ariaLabel="taps hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access `taps` metadata
:::

After a `touchstart` event, `taps` starts storing gesture metadata in the `Recognizeable` instance's `metadata` property (Object). `taps` stores the following information:

::: ariaLabel="taps metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `taps` | Array | <p>An array of objects that describe the taps currently being recognized.</p><p>See the [How each tap is structured](#how-each-tap-is-structured) section for more info.</p> |
| `lastTap` | Object| Easy access to the last tap in the `taps` array. |
| `touchTotal` | Number | Used mostly for internal purposes, `touchTotal` indicates the current number of active touch points. If `touchTotal` exceeds `1`, the gesture will be denied. |
:::

:::
### How each tap is structured
:::

As described above, `taps` is an array of objects, and each object contains metadata describing a tap.

Each tap object in the `taps` array has three properties: `times`, `points`, and `distance`.

The `times`  object has two properties: `start` and `end`. `times.start` is the timestamp (DOMHighResTimeStamp) of the `touchstart` event for that tap. `times.end` is the timestamp (DOMHighResTimeStamp) of the corresponding `touchend` for that `touchstart`.

The `points`  object has two properties: `start` and `end`. `points.start` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the location of the `touchstart` event for that tap. `points.end` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the corresponding `touchend` for that `touchstart`.

`distance` is the straight-line distance (Number, measured in pixels) between `points.start` and `points.end`.

A new tap is added to the `taps` array each time a `touchstart` occurs when there isn't already an active touchpoint, but that tap's metadata isn't complete until the corresponding `touchend` occurs.

Here's an example tap:

:::
```js
{
  times: { start: 3908, end: 3980 },
  points: {
    start: { x: 56, y: 289 },
    end: { x: 56, y: 289 },
  },
  distance: 0,
  interval: 120,
}
```
:::
