---
title: Hover
source: createHover.ts
tests: browser/createHover.test.ts
publish: true
order: 1
---

`createHover` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing hover.

A **hover** starts with a `mouseover` event, and is denied by a `mouseout` event.

While the mouse is still over the target element, `createHover` continuously recognizes the gesture at a rate of 60fps. The gesture is recognized when the mouse has been over the element for a minimum duration, which is configurable.


:::
## Create hover
:::

Call `createHover` with these parameters to create your `mouseover` and `mouseout` effects:

::: ariaLabel="createHover parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `mouseover` and `mouseout` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createHover options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the hover, in milliseconds. |
| `onOver` | Function | `undefined` | <p>A function that is called when the mouse is over the target element.</p><p>`onOver` receives the [`hover` hook API](#hook-api) as its only parameter.</p> |
| `onOut` | Function | `undefined` | <p>A function that is called when the mouse leaves the target.</p><p>`onOut` receives the [`hover` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onOver` and `onOut` options as their only parameter. It contains the following properties:

::: ariaLabel="`hover` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created hover effects store data in the `Recognizeable` instance's `metadata` property.

Hover metadata includes all [pointer metadata](/docs/logic/factories/recognizeable-effects-overview#pointer-metadata).


:::
## Using with `Listenable`
:::

The easiest way to use `createHover` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Hover` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Hover` to nicely combine `createHover` with `Listenable`:

:::
```ts
import { Hover } from '@baleada/logic'

const hover = new Hover([hoverOptions])

hover.listen(() => {
  console.log(hover.metadata.duration)
})
```
:::

