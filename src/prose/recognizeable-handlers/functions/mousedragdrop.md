---
title: mousedragdrop
tags: UI Logic
publish: true
order: 0
---

`mousedragdrop` is defined as a single click that:
- starts at a given point
- travels a distance greater than 0px (or a minimum distance of your choice)
- travels at a velocity of greater than 0px/ms (or a minimum velocity of your choice)
- does not exit the element and all of its descendants
- ends

The `mousedragdrop` function returns an object that contains event handlers for the following events:
- `mousedown`
- `mouseleave`
- `mouseup`

Under the hood, `mousedragdrop` also uses a `mousemove` event listener to gather data. However, listening to every `mousemove` event on a page can cause performance issues, so `mousedragdrop` adds its `mousemove` listener on the fly after a succesful `mousedown`, and removes it on `mouseleave` and `mouseup`.

::: type="info"
In Baleada Recognizeable Handlers, `mousedragdrop` is the mouse event equivalent of [`touchdragdrop`](/docs/recognizeable-handlers/functions/touchdragdrop).
:::

::: type="warning"
`mousedragdrop` only works with mouse events. It won't have any effect if the user uses a touchscreen.
:::

::: type="info"
`mousedragdrop` does not rely on the [HTML drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

It's primarily useful when you want to detect a drag gesture but don't want to comply with the web API's requirements, namely:
- Adding a `draggable="true"` attribute to the draggable element
- Cancelling both the `dragenter` and `dragover` events on drop zone elements
- Working with the `DataTransfer` API to set the drag image, specify the drop effect, and of course, transfer data.
:::


:::
## Create the `mousedragdrop` handlers
:::

To create the `mousedragdrop` handlers, import and call the `mousedragdrop` function:

:::
```js
import { mousedragdrop } from '@baleada/recognizeable-handlers'

const mousedragdropHandlers = mousedragdrop(/* options */)

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: mousedragdropHandlers } }
)
```
:::

Optionally, you can pass an `options` object as the first argument of the `mousedragdrop` function. Here's a breakdown of the `options` object:

::: ariaLabel="drag options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDistance` | Number | `0` | The minimum distance in pixels that the cursor must travel in order to be considered a drag gesture. |
| `minVelocity` | Number | `0` | The minimum velocity in pixels per millisecond that the cursor must travel in order to be considered a mousedragdrop gesture. |
| `onDown` | Function | none | <p>Hooks into the `mousedown` event that the `mousedragdrop` handlers listen to.</p><p>`onDown` receives the mousedragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
| `onMove` | Function | none | <p>Hooks into the `mousemove` event that the `mousedragdrop` handlers listen to.</p><p>`onMove` receives the mousedragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
| `onLeave` | Function | none |  <p>Hooks into the `mouseleave` event that the `mousedragdrop` handlers listen to.</p><p>`onLeave` receives the mousedragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
| `onUp` | Function | none | <p>Hooks into the `mouseup` event that the `mousedragdrop` handlers listen to.</p><p>`onUp` receives the mousedragdrop hook API as its only argument. See the [Drag hook API](#drag-hook-api) section for more info.</p> |
:::


:::
### Dragdrop hook API
:::

`mousedragdrop` provides handlers for the `mousedown`, `mousemove`, `mouseleave`, and `mouseup` events, and those handlers gather and store all the metadata needed to recognize a mousedragdrop gesture.

But, if you ever want to take some additional action during any of those events, you can use the drag hooks:
- `onDown`
- `onMove`
- `onLeave`
- `onUp`

The drag hooks get called after the `mousedragdrop` handlers have performed their necessary actions, and each hook receives the mousedragdrop hook API as its only argument. The mousedragdrop hook API is an object—here's a full breakdown:

::: ariaLabel="mousedragdrop hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access `mousedragdrop` metadata
:::

After a `mousedown` event, `mousedragdrop` starts storing gesture metadata in the `Recognizeable` instance's `metadata` property (Object). `mousedragdrop` stores the following information:

::: ariaLabel="mousedragdrop metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `times` | Object | <p>The `times`  object has two properties: `start` and `end`.</p><p>`times.start` is the timestamp (DOMHighResTimeStamp) of the `mousedown` event that started the `mousedragdrop` recognizing process.</p><p>`times.end` is always the timestamp (DOMHighResTimeStamp) of the most recent event in the `mousedragdrop` sequence.</p><p>`times.end` updates after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `points` | Object | <p>The `points`  object has two properties: `start` and `end`.</p><p>`points.start` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the location of the `mousedown` event that started the `mousedragdrop` recognizing process.</p><p>`points.end` is an object whose `x` and `y` properties always contain the x and y coordinates (Numbers) of the most recent event in the `mousedragdrop` sequence.</p><p>`points.end.x` and `points.end.y` update after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `distance` | Object | <p>The `distance` object has two properties: `fromStart` and `fromPrevious`.</p><p>`distance.fromStart` is the straight-line distance (Number, measured in pixels), between `points.end` and `points.start` .</p><p>`distance.fromPrevious` is the straight-line distance (Number, measured in pixels) between `points.end` and the x and y coordinates of the second-to-last event in the sequence.</p><p>`distance.fromStart` and `distance.fromPrevious` update after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `angle` | Object | <p>The `angle` object has two properties: `fromStart` and `fromPrevious`.</p><p>`angle.fromStart` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from `points.start` to `points.end`.</p><p>`angle.fromPrevious` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`angle.fromStart` and `angle.fromPrevious` update after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `direction` | Object | <p>The `direction` object has two properties: `fromStart` and `fromPrevious`.</p><p>`direction.fromStart` is the direction (String) of the straight line from `points.start` to `points.end`.</p><p>`direction.fromPrevious` is the direction (String) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`direction.fromStart` and `direction.fromPrevious` update after every `mousemove` and after the `mouseup` that completes the gesture.</p><p>Possible directions are:</p><ul><li>`'up'`</li><li>`'upRight'`</li><li>`'right'`</li><li>`'downRight'`</li><li>`'down'`</li><li>`'downLeft'`</li><li>`'left'`</li><li>`'upLeft'`</li></ul> |
| `velocity` | Object | <p>The velocity (Number, measured in pixels per millisecond) at which the mouse is currently traveling.</p><p>`velocity` updates after every `mousemove` and after the `mouseup` that completes the gesture.</p> |
| `mouseStatus` | String | Used mostly for internal purposes, `mouseStatus` can be `down`, `leave`, or `up`. |
:::



