---
title: keycombo match
tags: UI Logic
source: keyboard-event-descriptor.ts
tests: node/keyboard-event-descriptor.test.ts
publish: true
order: 0
---

`createKeycomboMatch` is a [pipe](/docs/logic/pipes-overview) that transforms a keyboard event descriptor to a boolean indicating whether or not the event matches a given [keycombo](/docs/logic/keycombo-overview).

A keyboard event descriptor is an object with `code`, `shiftKey`, `altKey`, `ctrlKey`, and `metaKey` properties, all of which are optional. This means your `keycomboMatch` function works not only with keyboard events, but also mouse, pointer, and touch events.


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

`createKeycomboMatch` accepts [the standard options for configuring the keycombo system](/docs/logic/keycombo-overview#configuring-the-keycombo-system)
