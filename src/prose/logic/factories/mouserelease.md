---
title: mouserelease
tags: UI Logic
source: createMouserelease.ts
tests: browser/createMouserelease.test.ts
publish: true
order: 1
---

`createMouserelease` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing mouse releases.

A **mouse release** is a sequence of a `mousedown` and a `mouseup`, and allows for `mousemove` in between those events, but denies the event on `mouseleave`.

`createMouserelease` attempts to recognize the gesture when `mouseup` fires. The gesture is recognized at on `mouseup` if the mouse has been down for a minimum duration and has moved a minimum distance, both of which are configurable.


:::
## Create mouserelease
:::

Call `createMouserelease` with these parameters to create your `mousedown`, `mouseleave`, and `mouseup` effects:

::: ariaLabel="createMouserelease parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `mousedown`, `mouseleave`, and `mouseup` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createMouserelease options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the mouse release, in milliseconds. |
| `minDistance` | number | `0` | The minimum pixel distance the mouse must move. |
| `minVelocity` | number | `0` | The minimum pixel velocity the mouse must move. |
| `onDown` | Function | `undefined` | <p>A function that is called when the mouse is pressed down.</p><p>`onDown` receives the [`mouserelease` hook API](#hook-api) as its only parameter.</p> |
| `onMove` | Function | `undefined` | <p>A function that is called when the mouse moves.</p><p>`onMove` receives the [`mouserelease` hook API](#hook-api) as its only parameter.</p> |
| `onLeave` | Function | `undefined` | <p>A function that is called when the mouse leaves the target.</p><p>`onLeave` receives the [`mouserelease` hook API](#hook-api) as its only parameter.</p> |
| `onUp` | Function | `undefined` | <p>A function that is called when the mouse is released.</p><p>`onUp` receives the [`mouserelease` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onDown`, `onMove`, `onLeave`, and `onUp` options as their only parameter. It contains the following properties:

::: ariaLabel="`mouserelease` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created mouserelease effects store data in the `Recognizeable` instance's `metadata` property.

Mouserelease metadata includes all [pointer metadata](/docs/logic/factories/recognizeable-effects-overview#pointer-metadata).

:::
## Using with `Listenable`
:::

The easiest way to use `createMouserelease` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Mouserelease` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Mouserelease` to nicely combine `createMouserelease` with `Listenable`:

:::
```ts
import { Mouserelease } from '@baleada/logic'

const mouserelease = new Mouserelease([mousereleaseOptions])

mouserelease.listen(() => {
  console.log(mouserelease.metadata.velocity)
})
```
:::

