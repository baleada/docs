---
title: associative array delete
source: associative-array.ts
tests: node/associative-array.test.ts
publish: true
order: 0
---

`createAssociativeArrayDelete` is a [link](/docs/logic/links-overview) that deletes an entry from an [associative array](/docs/logic/associative-array-overview).


:::
## Create delete
:::

Call `createAssociativeArrayDelete` with these parameters to create your `delete` function:

::: ariaLabel="createAssociativeArrayDelete parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | any | yes | The key to delete. |
| `options` | Object | no | Options to customize the behavior of the `delete` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createAssociativeArrayHas options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `predicateKey` | Function | Strict equality check | A function that accepts a key and returns a boolean indicating whether or not the key matches the one you're looking for. |
:::
