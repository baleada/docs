---
title: keypress
source: createKeypress.ts
tests: browser/createKeypress.test.ts
publish: true
order: 1
---

`createKeypress` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing one or more [keycombos](/docs/logic/keycombo-overview.md).

A **key press** starts when the final key in a keycombo goes down, and is denied by the `keydown` event of a key that is not part of any of the given keycombos, or by a `keyup` or `visibilitychange` event.

While the keycombo is still down, `createKeypress` continuously recognizes the gesture at a rate of 60fps. The gesture is recognized when the keycombo has been down for a minimum duration, which is configurable.


:::
## Create keypress
:::

Call `createKeypress` with these parameters to create your `keydown`, `keyup`, and `visibilitychange` effects:

::: ariaLabel="createKeypress parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `keycombo` | Array, String | yes | <p>The [keycombo](/docs/logic/keycombo-overview) or array of keycombos to recognize.</p><p>If you pass an array of keycombos, the keypress will start recognizing whenever the current keyboard state exactly matches any one of those keycombos.</p> |
| `options` | Object | no | Options to customize the behavior of the `keydown`, `keyup`, and `visibilitychange` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createKeypress options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the mouse press, in milliseconds. |
| `preventsDefaultUnlessDenied` | boolean | `true` | <p>Whether to call `preventDefault` on the `keydown`, `keyup`, and `visibilitychange` events, unless the keypress is denied.</p><p>If the keypress has been denied, the default will never be prevented (although you can still prevent it via the hooks listed below).</p> |
| `onDown` | Function | `undefined` | <p>A function that is called when any key is pressed down.</p><p>`onDown` receives the [`keypress` hook API](#hook-api) as its only parameter.</p> |
| `onUp` | Function | `undefined` | <p>A function that is called when any key is released.</p><p>`onUp` receives the [`keypress` hook API](#hook-api) as its only parameter.</p> |
| `onVisibilityChange` | Function | `undefined` | <p>A function that is called when the page visibility changes.</p><p>`onVisibilityChange` receives the [`keypress` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onDown`, `onUp`, and `onVisibilityChange` options as their only parameter. It contains the following properties:

::: ariaLabel="`keypress` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created keypress effects store data in the `Recognizeable` instance's `metadata` property.

Keypress metadata includes all [keyboard metadata](/docs/logic/factories/recognizeable-effects-overview#keyboard-metadata).

:::
## Using with `Listenable`
:::

The easiest way to use `createKeypress` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Keypress` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Keypress` to nicely combine `createKeypress` with `Listenable`:

:::
```ts
import { Keypress } from '@baleada/logic'

const keypress = new Keypress(keycomboOrKeycombos, [keypressOptions])

keypress.listen(() => {
  console.log(keypress.metadata.duration)
})
```
:::

