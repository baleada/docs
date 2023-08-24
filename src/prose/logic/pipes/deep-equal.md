---
title: deep equal
tags: UI Logic
source: any.ts
publish: true
order: 0
---

`createDeepEqual` is a [pipe](/docs/logic/pipes-overview) that transforms anything to a boolean that indicates whether or not it deeply equals another value.

::: type="info"
`createDeepEqual` is a thin wrapper around [`dequal`](https://github.com/lukeed/dequal).
:::


:::
## Create deep equal
:::

Call `createDeepEqual` with these parameters to create your `deepEqual` function:

::: ariaLabel="createDeepEqual parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `compared` | any | yes | The value to compare for deep equality. |
:::

