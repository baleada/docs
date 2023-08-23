---
title: find index async
tags: UI Logic
source: array async.ts
publish: true
order: 0
---

`createFindIndexAsync` is a pipe that accepts an array as an input, and asynchronously outputs <!--TODO-->.

::: type="info"
`createFindIndexAsync` is a light wrapper around [`findIndex`](https://github.com/RobinMalfait/lazy-collections#findIndex) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `findIndexAsync`
:::

Call `createFindIndexAsync` with no parameters to create your `findIndexAsync` function.

Call `createFindIndexAsync` with the parameters listed below to create your `findIndexAsync` function:

::: ariaLabel="createFindIndexAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createFindIndexAsync` with TypeScript 🚀
