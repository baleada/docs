---
title: touchdragdrop
tags: UI Logic
publish: true
order: 1
---

`touchdragdrop` is defined as a single touch that:
- starts at a given point
- travels a distance greater than 0px (or a minimum distance of your choice)
- travels at a velocity of greater than 0px/ms (or a minimum velocity of your choice)
- does not cancel or end

The `touchdragdrop` function returns an object that contains event handlers for the following events:
- `touchstart`
- `touchmove`
- `touchcancel`
- `touchend`

::: type="info"
In Baleada Recognizeable Handlers, `touchdragdrop` is the touch event equivalent of [`mousedragdrop`](/docs/recognizeable-effects/mousedragdrop).
:::

::: type="warning"
`touchdragdrop` only works with touch events. It won't have any effect if the user uses a mouse.
:::

::: type="info"
`touchdragdrop` can be used with [`Listenable`](/docs/logic/classes/Listenable) to detect swipe gestures. It stores the swipe direction in `recognizeable.metadata` to help your `listenable.listen` callback make changes in the UI.
:::


:::
## Create the `touchdragdrop` handlers
:::

To create the `touchdragdrop` handlers, import and call the `touchdragdrop` function:

:::
```js
import { touchdragdrop } from '@baleada/recognizeable-effects'

const touchdragdropHandlers = touchdragdrop(/* options */)

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: touchdragdropHandlers } }
)
```
:::

Optionally, you can pass an `options` object as the first argument of the `touchdragdrop` function. Here's a breakdown of the `options` object:

::: ariaLabel="drag options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDistance` | Number | `0` | The minimum distance in pixels that the cursor must travel in order to be considered a drag gesture. |
| `minVelocity` | Number | `0` | The minimum velocity in pixels per millisecond that the cursor must travel in order to be considered a touchdragdrop gesture. |
| `onStart` | Function | none | <p>Hooks into the `touchstart` event that the `pan` handlers listen to.</p><p>`onStart` receives the pan hook API as its only argument. See the [Swipe hook API](#pan-hook-api) section for more info.</p> |
| `onMove` | Function | none | <p>Hooks into the `touchmove` event that the `pan` handlers listen to.</p><p>`onMove` receives the pan hook API as its only argument. See the [Swipe hook API](#pan-hook-api) section for more info.</p> |
| `onCancel` | Function | none |  <p>Hooks into the `touchcancel` event that the `pan` handlers listen to.</p><p>`onCancel` receives the pan hook API as its only argument. See the [Swipe hook API](#pan-hook-api) section for more info.</p> |
| `onEnd` | Function | none | <p>Hooks into the `touchend` event that the `pan` handlers listen to.</p><p>`onEnd` receives the pan hook API as its only argument. See the [Swipe hook API](#pan-hook-api) section for more info.</p> |
:::


:::
### Swipe hook API
:::

`touchdragdrop` provides handlers for the `touchstart`, `touchmove`, `touchcancel`, and `touchend` events, and those handlers gather and store all the metadata needed to recognize a touchdragdrop gesture.

But, if you ever want to take some additional action during any of those events, you can use the touchdragdrop hooks:
- `onStart`
- `onMove`
- `onCancel`
- `onEnd`

The drag hooks get called after the `touchdragdrop` handlers have performed their necessary actions, and each hook receives the touchdragdrop hook API as its only argument. The touchdragdrop hook API is an object—here's a full breakdown:

::: ariaLabel="touchdragdrop hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access `touchdragdrop` metadata
:::

After a `touchstart` event, `touchdragdrop` starts storing gesture metadata in the `Recognizeable` instance's `metadata` property (Object). `touchdragdrop` stores the following information:

::: ariaLabel="touchdragdrop metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `times` | Object | <p>The `times`  object has two properties: `start` and `end`.</p><p>`times.start` is the timestamp (DOMHighResTimeStamp) of the `touchstart` event that started the `touchdragdrop` recognizing process.</p><p>`times.end` is always the timestamp (DOMHighResTimeStamp) of the most recent event in the `touchdragdrop` sequence.</p><p>`times.end` updates after every `touchmove` and after the `touchend` that completes the gesture.</p> |
| `points` | Object | <p>The `points`  object has two properties: `start` and `end`.</p><p>`points.start` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the location of the `touchstart` event that started the `touchdragdrop` recognizing process.</p><p>`points.end` is an object whose `x` and `y` properties always contain the x and y coordinates (Numbers) of the most recent event in the `touchdragdrop` sequence.</p><p>`points.end.x` and `points.end.y` update after every `touchmove` and after the `touchend` that completes the gesture.</p> |
| `distance` | Object | <p>The `distance` object has two properties: `fromStart` and `fromPrevious`.</p><p>`distance.fromStart` is the straight-line distance (Number, measured in pixels), between `points.end` and `points.start` .</p><p>`distance.fromPrevious` is the straight-line distance (Number, measured in pixels) between `points.end` and the x and y coordinates of the second-to-last event in the sequence.</p><p>`distance.fromStart` and `distance.fromPrevious` update after every `touchmove` and after the `touchend` that completes the gesture.</p> |
| `angle` | Object | <p>The `angle` object has two properties: `fromStart` and `fromPrevious`.</p><p>`angle.fromStart` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from `points.start` to `points.end`.</p><p>`angle.fromPrevious` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`angle.fromStart` and `angle.fromPrevious` update after every `touchmove` and after the `touchend` that completes the gesture.</p> |
| `direction` | Object | <p>The `direction` object has two properties: `fromStart` and `fromPrevious`.</p><p>`direction.fromStart` is the direction (String) of the straight line from `points.start` to `points.end`.</p><p>`direction.fromPrevious` is the direction (String) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`direction.fromStart` and `direction.fromPrevious` update after every `touchmove` and after the `touchend` that completes the gesture.</p><p>Possible directions are:</p><ul><li>`'up'`</li><li>`'upRight'`</li><li>`'right'`</li><li>`'downRight'`</li><li>`'down'`</li><li>`'downLeft'`</li><li>`'left'`</li><li>`'upLeft'`</li></ul> |
| `velocity` | Object | <p>The velocity (Number, measured in pixels per millisecond) at which the mouse is currently traveling.</p><p>`velocity` updates after every `touchmove` and after the `touchend` that completes the gesture.</p> |
| `touchTotal` | Number | Used mostly for internal purposes, `touchTotal` indicates the current number of active touch points. If `touchTotal` exceeds `1`, the gesture will be denied. |
:::



