---
title: touchpress
tags: UI Logic
source: createTouchpress.ts
publish: true
order: 1
---

`createTouchpress` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing touch presses.

A **touch press** starts with a `touchstart` event, and is denied by a `touchend` or `touchcancel` event.

While the touch is still down, `createTouchpress` continuously recognizes the gesture at a rate of 60fps. The gesture is recognized when the touch has been down for a minimum duration and has moved a minimum distance, both of which are configurable.


:::
## Create touchpress
:::

Call `createTouchpress` with these parameters to create your `touchstart`, `touchcancel`, and `touchend` effects:

::: ariaLabel="createTouchpress parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `touchstart`, `touchcancel`, and `touchend` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createTouchpress options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the touch press, in milliseconds. |
| `minDistance` | number | `0` | The minimum pixel distance the touch must move. |
| `onStart` | Function | `undefined` | <p>A function that is called when the touch starts.</p><p>`onStart` receives the [`touchpress` hook API](#hook-api) as its only parameter.</p> |
| `onMove` | Function | `undefined` | <p>A function that is called when the touch moves.</p><p>`onMove` receives the [`touchpress` hook API](#hook-api) as its only parameter.</p> |
| `onCancel` | Function | `undefined` | <p>A function that is called when the touch is canceled.</p><p>`onCancel` receives the [`touchpress` hook API](#hook-api) as its only parameter.</p> |
| `onEnd` | Function | `undefined` | <p>A function that is called when the touch is released.</p><p>`onEnd` receives the [`touchpress` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onStart`, `onMove`, `onCancel`, and `onEnd` options as their only parameter. It contains the following properties:

::: ariaLabel="`touchpress` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created touchpress effects store data in the `Recognizeable` instance's `metadata` property.

Touchpress metadata includes all [pointer metadata](/docs/logic/factories/recognizeable-effects-overview#pointer-metadata).

:::
## Using with `Listenable`
:::

The easiest way to use `createTouchpress` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Touchpress` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Touchpress` to nicely combine `createTouchpress` with `Listenable`:

:::
```ts
import { Touchpress } from '@baleada/logic'

const touchpress = new Touchpress([touchpressOptions])

touchpress.listen(() => {
  console.log(touchpress.metadata.duration)
})
```
:::

