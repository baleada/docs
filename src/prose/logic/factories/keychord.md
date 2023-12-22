---
title: keychord
tags: UI Logic
source: createKeychord.ts
tests: browser/createKeychord.test.ts
publish: true
order: 1
---

`createKeychord` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing a keychord, i.e. multiple [keycombos](/docs/logic/keycombo-overview.md) pressed and released in a specific order.

A **key chord** is a sequence of [keyreleases](/docs/logic/factories/keyrelease) that are "played" in a specific order.

Each keyrelease in the sequence must be played for a minimum duration, and the time between the end of one keyrelease and the start of the next cannot exceed a maximum interval. Both the duration and the interval are configureable.


:::
## Create keychord
:::

Call `createKeychord` with these parameters to create your `keydown`, `keyup`, and `visibilitychange` effects:

::: ariaLabel="createKeychord parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `keycombos` | String | yes | The space-separated sequence of [keycombos](/docs/logic/keycombo-overview) to recognize. |
| `options` | Object | no | Options to customize the behavior of the `keydown`, `keyup`, and `visibilitychange` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createKeychord options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of every key release, in milliseconds. |
| `maxInterval` | number | `5000` | <p>The maximum millisecond interval between the end of one key release and the start of the next, in milliseconds.</p> |
| `preventsDefaultUnlessDenied` | boolean | `true` | <p>Whether to call `preventDefault` on the `keydown`, `keyup`, and `visibilitychange` events, unless the keychord is denied.</p><p>If the keychord has been denied, the default will never be prevented (although you can still prevent it via the hooks listed below).</p> |
| `onDown` | Function | `undefined` | <p>A function that is called when any key is pressed down.</p><p>`onDown` receives the [`keychord` hook API](#hook-api) as its only parameter.</p> |
| `onUp` | Function | `undefined` | <p>A function that is called when any key is released.</p><p>`onUp` receives the [`keychord` hook API](#hook-api) as its only parameter.</p> |
| `onVisibilityChange` | Function | `undefined` | <p>A function that is called when the page visibility changes.</p><p>`onVisibilityChange` receives the [`keychord` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onDown`, `onUp`, and `onVisibilityChange` options as their only parameter. It contains the following properties:

::: ariaLabel="`keychord` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created keychord effects store data in the `Recognizeable` instance's `metadata` property.

Keychord metadata has one property: `played`, an array of [keyboard metadata](/docs/logic/factories/recognizeable-effects-overview#keyboard-metadata) objects that describe each individual keycombo in the chord.


:::
## Using with `Listenable`
:::

The easiest way to use `createKeychord` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Keychord` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Keychord` to nicely combine `createKeychord` with `Listenable`:

:::
```ts
import { Keychord } from '@baleada/logic'

const keychord = new Keychord(keycombos, [keychordOptions])

keychord.listen(() => {
  console.log(keychord.metadata.played[0].duration)
})
```
:::

