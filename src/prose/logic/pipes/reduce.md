---
title: reduce
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createReduce` is a [pipe](/docs/logic/pipes-overview) that transforms an array to reduced array (which can be any data type).

::: type="info"
`createReduce` is a light wrapper around [`reduce`](https://github.com/RobinMalfait/lazy-collections#reduce) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create reduce
:::

Call `createReduce` with no parameters to create your `reduce` function.

Call `createReduce` with these parameters to create your `reduce` function:

::: ariaLabel="createReduce parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

