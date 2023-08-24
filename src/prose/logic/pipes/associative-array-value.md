---
title: associative array value
tags: UI Logic
source: associative-array.ts
publish: true
order: 0
---

`createAssociativeArrayValue` is a [pipe](/docs/logic/pipes-overview) that retrieves a value from an [associative array](/docs/logic/associative-array-overview).


:::
## Create value
:::

Call `createAssociativeArrayValue` with these parameters to create your `value` function:

::: ariaLabel="createAssociativeArrayValue parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | Any | yes | The key to retrieve. |
| `options` | Object | no | Options to customize the behavior of the `value` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createAssociativeArrayHas options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `predicateKey` | Function | Strict equality check | A function that accepts a key and returns a boolean indicating whether or not the key matches the one you're trying to retrieve. |
:::
