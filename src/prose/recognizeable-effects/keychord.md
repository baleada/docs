---
title: keychord
tags: UI Logic
publish: true
order: 1
---

`keychord` is defined as a sequence of `keydown` events that:
- Happen in a specific order
- Are not separated by more than 5000ms, or a maximum interval of your choice

The `keychord` function returns an object that contains an event handler for the `keydown` event.


:::
## Create the `keychord` handler
:::

To create the `keychord` handler, import and call the `keychord` function:

:::
```js
import { key chord } from '@baleada/recognizeable-effects'

const keychordHandler = keychord('cmd+k cmd+b'[, options])

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: keychordHandler } }
)
```
:::

The `keychord` function requires one parameter: `keycombos`, which is the space-separated list of keys or key combinations that define the key chord.

Valid keys and key combinations include [any keycombo considered valid by the `Listenable` class](/docs/logic/classes/Listenable#how-to-format-key-combos-and-click-combos).

For example:

:::
```js
keychord('cmd+k cmd+b')

keychord('a b c')

keychord('up right down left')
```
:::

The `keychord` function also accepts an optional `options` object as its second parameter. Here's a breakdown of the `options` object:

::: ariaLabel="keychord options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `maxInterval` | Number | `5000` | The maximum number of milliseconds that can pass between each `keydown` event in your key chord. |
| `preventsDefaultUnlessDenied` | Boolean | `true` | <p>Indicates whether or not `event.preventDefault` should be called while the `Recognizeable` instance has fully or partially recognized the key chord.</p><p>`event.preventDefault` will never be called for keys and key combinations that are not part of the key chord, and it will never be called for keys and key combinations that _are_ part of the key chord, but were pressed in the wrong order.</p> |
| `onDown` | Function | none | <p>Hooks into the `mousedown` event that the `keychord` handlers listen to.</p><p>`onDown` receives the key chord hook API as its only argument. See the [Key chord hook API](#key-chord-hook-api) section for more info.</p> |
:::


:::
### Key chord hook API
:::

`keychord` provides a handler for the `keydown` event, and this handler gathers and stores all the metadata needed to recognize a key chord.

But, if you ever want to take some additional action during any of those events, you can use the `onDown` key chord hook.

The key chord hook gets called after the `keychord` handler has performed its necessary actions, and the hook receives the key chord hook API as its only argument. The key chord hook API is an object—here's a full breakdown:

::: ariaLabel="key chord hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access key chord metadata
:::

After a `keydown` event, `keychord` starts storing key chord metadata in the `Recognizeable` instance's `metadata` property (Object). `keychord` stores the following information:

::: ariaLabel="key chord metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `keycombos` | Array | <p>An array of objects that describe the key chord currently being recognized.</p><p>See the [How each keycombo is structured](#how-each-click-is-structured) section for more info.</p> |
:::


:::
### How each keycombo is structured
:::

As described above, `keycombos` is an array of objects, and each object contains metadata describing a key or key combination in the key chord.

Here's a breakdown of a `keycombo` object:

::: ariaLabel="key chord metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `name` | String | The key or key combination that was recognized. For example, in a `cmd+k cmd+b` key chord, the first `keycombo` object's `name` will be `cmd+k`. |
| `time` | Number | The timestamp (DOMHighResTimeStamp) of the corresponding `keydown` for that key or key combination. |
:::
