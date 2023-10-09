---
title: mousepress
tags: UI Logic
source: createMousepress.ts
publish: true
order: 1
---

`createMousepress` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing mouse presses.

A **mouse press** starts with a `mousedown` event, and is denied by a `mouseup` or `mouseleave` event.

While the mouse is still down, `createMousepress` continuously recognizes the gesture at a rate of 60fps. The gesture is recognized when the mouse has been down for a minimum duration and has moved a minimum distance, both of which are configurable.


:::
## Create mousepress
:::

Call `createMousepress` with these parameters to create your `mousedown`, `mouseleave`, and `mouseup` effects:

::: ariaLabel="createMousepress parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `mousedown`, `mouseleave`, and `mouseup` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createMousepress options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the mouse press, in milliseconds. |
| `minDistance` | number | `0` | The minimum pixel distance the mouse must move. |
| `onDown` | Function | `undefined` | <p>A function that is called when the mouse is pressed down.</p><p>`onDown` receives the [`mousepress` hook API](#hook-api) as its only parameter.</p> |
| `onMove` | Function | `undefined` | <p>A function that is called when the mouse moves.</p><p>`onMove` receives the [`mousepress` hook API](#hook-api) as its only parameter.</p> |
| `onLeave` | Function | `undefined` | <p>A function that is called when the mouse leaves the target.</p><p>`onLeave` receives the [`mousepress` hook API](#hook-api) as its only parameter.</p> |
| `onUp` | Function | `undefined` | <p>A function that is called when the mouse is released.</p><p>`onUp` receives the [`mousepress` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onDown`, `onMove`, `onLeave`, and `onUp` options as their only parameter. It contains the following properties:

::: ariaLabel="`mousepress` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created mousepress effects store data in the `Recognizeable` instance's `metadata` property.

Mousepress metadata includes all [pointer metadata](/docs/logic/factories/recognizeable-effects-overview#pointer-metadata).


:::
## Using with `Listenable`
:::

The easiest way to use `createMousepress` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Mousepress` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Mousepress` to nicely combine `createMousepress` with `Listenable`:

:::
```ts
import { Mousepress } from '@baleada/logic'

const mousepress = new Mousepress([mousepressOptions])

mousepress.listen(() => {
  console.log(mousepress.metadata.duration)
})
```
:::

