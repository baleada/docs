---
title: keyrelease
tags: UI Logic
source: createKeyrelease.ts
publish: true
order: 1
---

`createKeyrelease` is a [factory](/docs/logic/factories-overview) that returns [`Recognizeable` effects](/docs/logic/classes/recognizeable#effect-workflow) for recognizing one or more [keycombos](/docs/logic/keycombo-overview.md).

A **key release** is a sequence of `keydown` and `keyup` events, with no `visibilitychange` events in between. All keys in a given combo must go down, and then one key must come up in order for the keyrelease to be recognized.

A keyrelease can be recognized multiple times, as long as the final key in the keycombo is pressed down and then released again. It's not necessary to lift up all keys in the combo before recognizing again. A keyrelease is only recognized when the final key in the combo is released—it does not recognize again when other keys in the combo are released.

A keyrelease is denied by `visibilitychange`, and by the `keydown` event of a key that is not part of any of the given keycombos. As soon as a keyrelease is denied, all keys must come up before the keyrelease will start trying to recognize again.


:::
## Create keyrelease
:::

Call `createKeyrelease` with these parameters to create your `keydown`, `keyup`, and `visibilitychange` effects:

::: ariaLabel="createKeyrelease parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `keycombo` | Array, String | yes | <p>The [keycombo](/docs/logic/keycombo-overview) or array of keycombos to recognize.</p><p>If you pass an array of keycombos, the keyrelease will recognize whenever the current keyboard state exactly matches any one of those keycombos, and the final key of the combo is then released.</p> |
| `options` | Object | no | Options to customize the behavior of the `keydown`, `keyup`, and `visibilitychange` effects. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createKeyrelease options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDuration` | number | `0` | The minimum millisecond duration of the key release, in milliseconds. |
| `preventsDefaultUnlessDenied` | boolean | `true` | <p>Whether to call `preventDefault` on the `keydown`, `keyup`, and `visibilitychange` events, unless the keyrelease is denied.</p><p>If the keyrelease has been denied, the default will never be prevented (although you can still prevent it via the hooks listed below).</p> |
| `onDown` | Function | `undefined` | <p>A function that is called when any key is pressed down.</p><p>`onDown` receives the [`keyrelease` hook API](#hook-api) as its only parameter.</p> |
| `onUp` | Function | `undefined` | <p>A function that is called when any key is released.</p><p>`onUp` receives the [`keyrelease` hook API](#hook-api) as its only parameter.</p> |
| `onVisibilityChange` | Function | `undefined` | <p>A function that is called when the page visibility changes.</p><p>`onVisibilityChange` receives the [`keyrelease` hook API](#hook-api) as its only parameter.</p> |
:::


:::
#### Hook API
:::

The hook API is an object that is passed to the `onDown`, `onUp`, and `onVisibilityChange` options as their only parameter. It contains the following properties:

::: ariaLabel="`keyrelease` hook API" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `status` | string | The status of the sequence. One of `recognized`, `denied`, or `recognizing`. |
| `metadata` | Object | Metadata about the sequence. See the [Metadata](#metadata) section for more guidance. |
| `sequence` | Array | The sequence of events that have occurred so far. |
:::


:::
## Metadata
:::

Your created keyrelease effects store data in the `Recognizeable` instance's `metadata` property.

Keyrelease metadata includes all [keyboard metadata](/docs/logic/factories/recognizeable-effects-overview#keyboard-metadata).

:::
## Using with `Listenable`
:::

The easiest way to use `createKeyrelease` with [`Listenable`](/docs/logic/classes/listenable) is to use the `Keyrelease` class, which is a very minimal [subclass of `Listenable`](/docs/logic/factories/recognizeable-overview#listenable-subclasses) that handles configuration for you.

Here's an example of how to use `Keyrelease` to nicely combine `createKeyrelease` with `Listenable`:

:::
```ts
import { Keyrelease } from '@baleada/logic'

const keyrelease = new Keyrelease(keycomboOrKeycombos, [keyreleaseOptions])

keyrelease.listen(() => {
  console.log(keyrelease.metadata.duration)
})
```
:::

