---
title: dragdrop
tags: UI Logic, Vue, React, Svelte
publish: true
order: 0
---

`dragdrop` is defined as a single click that:
- starts at a given point
- travels a distance greater than 0px (or a minimum distance of your choice)
- travels at a velocity of greater than 0px/ms (or a minimum velocity of your choice)
- does not exit the element and all of its descendants
- ends

The `dragdrop` function returns an object that contains event handlers for the following events:
- `mousedown`
- `mousemove`
- `mouseleave`
- `mouseup`

::: type="info"
In Baleada Listenable Gestures, `dragdrop` is the mouse event equivalent of [`swipe`](/docs/listenable-gestures/functions/swipe).
:::

::: type="warning"
If you're implementing a drag-and-drop feature for a touchscreen, use [`swipe`](/docs/listenable-gestures/functions/swipe) instead of `dragdrop` (which only works for mouse events).

Likewise, if you're implementing a swipe feature for desktop, use `dragdrop` instead of [`swipe`](/docs/listenable-gestures/functions/swipe) (which only works for touch events).
:::


:::
## Create the `dragdrop` handlers
:::

To create the `dragdrop` handlers, import and call the `dragdrop` function:

:::
```js
import { dragdrop } from '@baleada/listenable-gestures'

const dragdropHandlers = dragdrop(/* options */)

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: dragdropHandlers } }
)
```
:::

Optionally, you can pass an `options` object as the first argument of the `dragdrop` function. Here's a breakdown of the `options` object:

::: ariaLabel="drag options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDistance` | Number | `0` | The minimum distance in pixels that the cursor must travel in order to be considered a drag gesture. |
| `minVelocity` | Number | `0` | The minimum velocity in pixels per millisecond that the cursor must travel in order to be considered a dragdrop gesture. |
| `onDown` | Function | none | <p>Hooks into the `mousedown` event that the `dragdrop` handlers listen to.</p><p>`onDown` receives the dragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
| `onMove` | Function | none | <p>Hooks into the `mousemove` event that the `dragdrop` handlers listen to.</p><p>`onMove` receives the dragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
| `onLeave` | Function | none |  <p>Hooks into the `mouseleave` event that the `dragdrop` handlers listen to.</p><p>`onLeave` receives the dragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
| `onUp` | Function | none | <p>Hooks into the `mouseup` event that the `dragdrop` handlers listen to.</p><p>`onUp` receives the dragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
:::


:::
### Dragdrop hook API
:::

`dragdrop` provides handlers for the `mousedown`, `mousemove`, `mouseleave`, and `mouseup` events, and those handlers gather and store all the metadata needed to recognize a dragdrop gesture.

But, if you ever want to take some additional action during any of those events, you can use the drag hooks:
- `onDown`
- `onMove`
- `onLeave`
- `onUp`

The drag hooks get called after the `dragdrop` handlers have performed their necessary actions, and each hook receives the dragdrop hook API as its only argument. The dragdrop hook API is an object—here's a full breakdown:

::: ariaLabel="dragdrop hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access `dragdrop` metadata
:::

After a `mousedown` event, `dragdrop` starts storing gesture metadata in the `Recognizeable` instance's `metadata` property (Object). `dragdrop` stores the following information:

::: ariaLabel="dragdrop metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `times` | Object | <p>The `times`  object has two properties: `start` and `end`.</p><p>`times.start` is the timestamp (DOMHighResTimeStamp) of the `mousedown` event that started the `dragdrop` recognizing process.</p><p>`times.end` is always the timestamp (DOMHighResTimeStamp) of the most recent event in the `dragdrop` sequence.</p><p>`times.end` updates after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `points` | Object | <p>The `points`  object has two properties: `start` and `end`.</p><p>`points.start` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the location of the `mousedown` event that started the `dragdrop` recognizing process.</p><p>`points.end` is an object whose `x` and `y` properties always contain the x and y coordinates (Numbers) of the most recent event in the `dragdrop` sequence.</p><p>`points.end.x` and `points.end.y` update after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `distance` | Object | <p>The `distance` object has two properties: `fromStart` and `fromPrevious`.</p><p>`distance.fromStart` is the straight-line distance (Number, measured in pixels), between `points.end` and `points.start` .</p><p>`distance.fromPrevious` is the straight-line distance (Number, measured in pixels) between `points.end` and the x and y coordinates of the second-to-last event in the sequence.</p><p>`distance.fromStart` and `distance.fromPrevious` update after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `angle` | Object | <p>The `angle` object has two properties: `fromStart` and `fromPrevious`.</p><p>`angle.fromStart` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from `points.start` to `points.end`.</p><p>`angle.fromPrevious` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`angle.fromStart` and `angle.fromPrevious` update after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `direction` | Object | <p>The `direction` object has two properties: `fromStart` and `fromPrevious`.</p><p>`direction.fromStart` is the direction (String) of the straight line from `points.start` to `points.end`.</p><p>`direction.fromPrevious` is the direction (String) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`direction.fromStart` and `direction.fromPrevious` update after every `mousemove` and after the `mouseup` that completes the gesture.</p><p>Possible directions are:</p><ul><li>`'up'`</li><li>`'upRight'`</li><li>`'right'`</li><li>`'downRight'`</li><li>`'down'`</li><li>`'downLeft'`</li><li>`'left'`</li><li>`'upLeft'`</li></ul> |
| `velocity` | Object | <p>The velocity (Number, measured in pixels per millisecond) at which the mouse is currently traveling.</p><p>`velocity` updates after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `mouseStatus` | String | Used mostly for internal purposes, `mouseStatus` can be `down`, `leave`, or `up`. |
:::



