---
title: associative array has
tags: UI Logic
source: associative-array.ts
publish: true
order: 0
---

`createAssociativeArrayHas` is a [pipe](/docs/logic/pipes-overview) that transforms an [associative array](/docs/logic/associative-array-overview) to a boolean indicating whether or not the associative array has a given key.


:::
## Create has
:::

Call `createAssociativeArrayHas` with these parameters to create your `has` function:

::: ariaLabel="createAssociativeArrayHas parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | any | yes | The key to check for. |
| `options` | Object | no | Options to customize the behavior of the `has` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createAssociativeArrayHas options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `predicateKey` | Function | Strict equality check | A function that accepts a key and returns a boolean indicating whether or not the key matches the one you're looking for. |
:::

