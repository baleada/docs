---
title: associative array set
source: associative-array.ts
tests: node/associative-array.test.ts
publish: true
order: 0
---

`createAssociativeArraySet` is a [link](/docs/logic/links-overview) that sets a key/value pair on an [associative array](/docs/logic/associative-array-overview).


:::
## Create set
:::

Call `createAssociativeArraySet` with these parameters to create your `set` function:

::: ariaLabel="createAssociativeArraySet parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | any | yes | The key to set (add or overwrite). |
| `value` | any | yes | The value to set on the associative array. |
| `options` | Object | no | Options to customize the behavior of the `set` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createAssociativeArrayHas options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `predicateKey` | Function | Strict equality check | <p>A function that accepts a key and returns a boolean indicating whether or not the key matches the one you're looking for.</p><p>When you're setting a new key, `predicateKey` is expected to return `false` on all existing keys.</p> |
:::
