---
title: sanitize
tags: UI Logic
source: string.ts
publish: true
order: 0
---

`createSanitize` is a [pipe](/docs/logic/pipes-overview) that transforms an HTML string to a sanitized HTML string.

::: type="info"
`createSanitize` is a thin wrapper around [`DOMPurify`](https://cure53.de/purify).
:::

:::
## Create sanitize
:::

Call `createSanitize` with these parameters to create your `sanitize` function:

::: ariaLabel="createSanitize parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `sanitize` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

In its `options` parameter, `createSanitize` accepts [all configuration options for `DOMPurify`](https://github.com/cure53/DOMPurify#can-i-configure-dompurify).

