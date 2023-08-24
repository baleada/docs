---
title: keycombo match
tags: UI Logic
source: keyboard-event.ts
publish: true
order: 0
---

`createKeycomboMatch` is a [pipe](/docs/logic/pipes-overview) that transforms a keyboard event to a boolean indicating whether or not the event matches a given [keycombo](/docs/logic/keycombo-overview).


:::
## Create keycombo match
:::

Call `createKeycomboMatch` with these parameters to create your `keycomboMatch` function:

::: ariaLabel="createKeycomboMatch parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `keycombo` | [keycombo](/docs/logic/keycombo-overview) | yes | The keycombo to match. |
| `options` | Object | no | Options to customize the behavior of the `keycomboMatch` function. See the [Options](#options) section for more guidance. |
:::

:::
### Options
:::

::: type="warning"
This section of documentation is WIP. These options are part of a fairly complex, difficult-to-explain system for matching keycombos, and they even allow you match keycombos on international and/or non-standard keyboard layouts.

The defaults for these options will match keycombos on standard US keyboard layouts.
:::

::: ariaLabel="createKeycomboMatch options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `toDownKeys` | Function | [`fromAliasToDownKeys`](https://github.com/baleada/logic/tree/main/src/extracted/fromAliasToDownKeys.ts) | A function that transforms a key alias (e.g. `a`, `A`, `á`) to an array of objects that describe the corresponding keyboard key that must be down in order for the keycombo to match. |
| `toAliases` | Function | [`fromEventToAliases`](https://github.com/baleada/logic/tree/main/src/extracted/fromEventToAliases.ts) | A function that transforms a keyboard event to an array of key aliases (e.g. `a`, `A`, `á`). |
