---
title: find index async
tags: UI Logic
source: array-async.ts
publish: true
order: 0
---

`createFindIndexAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to the index of the first one of its items to match a condition, or `-1` if a matching item can't be found.

::: type="info"
`createFindIndexAsync` is a light wrapper around [`findIndex`](https://github.com/RobinMalfait/lazy-collections#findIndex) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create find index async
:::

Call `createFindIndexAsync` with no parameters to create your `findIndex` function.

Call `createFindIndexAsync` with these parameters to create your `findIndex` function:

::: ariaLabel="createFindIndexAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

