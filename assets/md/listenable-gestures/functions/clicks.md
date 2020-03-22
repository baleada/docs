---
title: clicks
tags: UI Logic, Vue, React, Svelte
publish: true
order: 0
---

`clicks` is defined as a single click that:
- starts at a given point
- does not move beyond a maximum distance
- does not exit the element and all of its descendants
- ends
- repeats 1 time (or a minimum number of your choice), with each click ending less than or equal to 500ms (or a maximum interval of your choice) after the previous click ended

The `clicks` function returns an object that contains event handlers for the following events:
- `mousedown`
- `mousemove`
- `mouseleave`
- `mouseup`

::: type="info"
In Baleada Listenable Gestures, `clicks` is the mouse event equivalent of [`taps`](/docs/listenable-gestures/functions/taps).
:::

::: type="warning"
If you're implementing a clicks feature for a touchscreen, use [`taps`](/docs/listenable-gestures/functions/taps) instead of `clicks` (which only works for mouse events).

Likewise, if you're implementing a taps feature for desktop, use `clicks` instead of [`taps`](/docs/listenable-gestures/functions/taps) (which only works for touch events).
:::


:::
## Create the `clicks` handlers
:::

To create the `clicks` handlers, import and call the `clicks` function:

:::
```js
import { clicks } from '@baleada/listenable-gestures'

const clicksHandlers = clicks(/* options */)

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: clicksHandlers } }
)
```
:::

Optionally, you can pass an `options` object as the first argument of the `clicks` function. Here's a breakdown of the `options` object:

::: ariaLabel="clicks options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minClicks` | Number | `1` | The minimum number of repetitions required before the gesture is recognized. |
| `maxInterval` | Number | `500` | The maximum number of milliseconds that can pass between the end of each click. |
| `maxDistance` | Number | `5` | The maximum distance the mouse can travel after `mousedown` and before `mouseup`. |
| `onDown` | Function | none | <p>Hooks into the `mousedown` event that the `clicks` handlers listen to.</p><p>`onDown` receives the clicks hook API as its only argument. See the [Clicks hook API](#clicks-hook-api) section for more info.</p> |
| `onMove` | Function | none | <p>Hooks into the `mousemove` event that the `clicks` handlers listen to.</p><p>`onMove` receives the clicks hook API as its only argument. See the [Clicks hook API](#clicks-hook-api) section for more info.</p> |
| `onLeave` | Function | none |  <p>Hooks into the `mouseleave` event that the `clicks` handlers listen to.</p><p>`onLeave` receives the clicks hook API as its only argument. See the Clicks hook API](#clicks-hook-api) section for more info.</p> |
| `onUp` | Function | none | <p>Hooks into the `mouseup` event that the `clicks` handlers listen to.</p><p>`onUp` receives the clicks hook API as its only argument. See the [Clicks hook API](#clicks-hook-api) section for more info.</p> |
:::


:::
### Clicks hook API
:::

`clicks` provides handlers for the `mousedown`, `mousemove`, `mouseleave`, and `mouseup` events, and those handlers gather and store all the metadata needed to recognize a clicks gesture.

But, if you ever want to take some additional action during any of those events, you can use the clicks hooks:
- `onDown`
- `onMove`
- `onLeave`
- `onUp`

The clicks hooks get called after the `clicks` handlers have performed their necessary actions, and each hook receives the clicks hook API as its only argument. The clicks hook API is an object—here's a full breakdown:

::: ariaLabel="clicks hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access `clicks` metadata
:::

After a `mousedown` event, `clicks` starts storing gesture metadata in the `Recognizeable` instance's `metadata` property (Object). `clicks` stores the following information:

::: ariaLabel="clicks metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `clicks` | Array | <p>An array of objects that describe the clicks currently being recognized.</p><p>See the [How each click is structured](#how-each-click-is-structured) section for more info.</p> |
| `lastClick` | Object| Easy access to the last click in the `clicks` array. |
| `mouseStatus` | String | Used mostly for internal purposes, `mouseStatus` can be `down`, `leave`, or `up`. |
:::


:::
### How each click is structured
:::

As described above, `clicks` is an array of objects, and each object contains metadata describing a click.

Each click object in the `clicks` array has three properties: `times`, `points`, and `distance`.

The `times`  object has two properties: `start` and `end`. `times.start` is the timestamp (DOMHighResTimeStamp) of the `mousedown` event for that click. `times.end` is the timestamp (DOMHighResTimeStamp) of the corresponding `mouseup` for that `mousedown`.

The `points`  object has two properties: `start` and `end`. `points.start` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the location of the `mousedown` event for that click. `points.end` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the corresponding `mouseup` for that `mousedown`.

`distance` is the straight-line distance (Number, measured in pixels) between `points.start` and `points.end`.

A new click is added to the `clicks` array each time a `mousedown` occurs, but that click's metadata isn't complete until the corresponding `mouseup` occurs.

Here's an example click:

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
