---
title: reduce async
tags: UI Logic
source: array-async.ts
publish: true
order: 0
---

`createReduceAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to a reduced array (which can be any data type).

::: type="info"
`createReduceAsync` is a light wrapper around [`reduce`](https://github.com/RobinMalfait/lazy-collections#reduce) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create reduce
:::

Call `createReduceAsync` with no parameters to create your `reduce` function.

Call `createReduceAsync` with these parameters to create your `reduce` function:

::: ariaLabel="createReduceAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

