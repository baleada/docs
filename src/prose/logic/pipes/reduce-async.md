---
title: reduce async
tags: UI Logic
source: array async.ts
publish: true
order: 0
---

`createReduceAsync` is a pipe that accepts an array as an input, and asynchronously outputs <!--TODO-->.

::: type="info"
`createReduceAsync` is a light wrapper around [`reduce`](https://github.com/RobinMalfait/lazy-collections#reduce) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `reduceAsync`
:::

Call `createReduceAsync` with no parameters to create your `reduceAsync` function.

Call `createReduceAsync` with the parameters listed below to create your `reduceAsync` function:

::: ariaLabel="createReduceAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createReduceAsync` with TypeScript 🚀
