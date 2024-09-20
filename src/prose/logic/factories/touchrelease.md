---
title: Touchrelease
source: createTouchrelease.ts
tests: browser/createTouchrelease.test.ts
publish: true
order: 1
---

`createTouchrelease` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing touch releases.

A **touch release** is a sequence of a `touchstart` and a `touchend`, and allows for `touchmove` in between those events, but denies the event on `touchcancel`.

`createTouchrelease` attempts to recognize the gesture when `touchend` fires. The gesture is recognized at on `touchstart` if the touch has been down for a minimum duration and has moved a minimum distance, both of which are configurable.


:::
## Create touchrelease
:::

Call `createTouchrelease` with these parameters to create your `touchend`, `touchcancel`, and `touchstart` effects:

::: ariaLabel="createTouchrelease parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `touchend`, `touchcancel`, and `touchstart` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createTouchrelease options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the touch release, in milliseconds. |
| `minDistance` | number | `0` | The minimum pixel distance the touch must move. |
| `minVelocity` | number | `0` | The minimum pixel velocity the touch must move. |
| `onStart` | Function | `undefined` | <p>A function that is called when the touch starts.</p><p>`onStart` receives the [`touchrelease` hook API](#hook-api) as its only parameter.</p> |
| `onMove` | Function | `undefined` | <p>A function that is called when the touch moves.</p><p>`onMove` receives the [`touchrelease` hook API](#hook-api) as its only parameter.</p> |
| `onCancel` | Function | `undefined` | <p>A function that is called when the touch leaves the target.</p><p>`onCancel` receives the [`touchrelease` hook API](#hook-api) as its only parameter.</p> |
| `onUp` | Function | `undefined` | <p>A function that is called when the touch is released.</p><p>`onUp` receives the [`touchrelease` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onStart`, `onMove`, `onCancel`, and `onUp` options as their only parameter. It contains the following properties:

::: ariaLabel="`touchrelease` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created touchrelease effects store data in the `Recognizeable` instance's `metadata` property.

Touchrelease metadata includes all [pointer metadata](/docs/logic/factories/recognizeable-effects-overview#pointer-metadata).

:::
## Using with `Listenable`
:::

The easiest way to use `createTouchrelease` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Touchrelease` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Touchrelease` to nicely combine `createTouchrelease` with `Listenable`:

:::
```ts
import { Touchrelease } from '@baleada/logic'

const touchrelease = new Touchrelease([touchreleaseOptions])

touchrelease.listen(() => {
  console.log(touchrelease.metadata.velocity)
})
```
:::

