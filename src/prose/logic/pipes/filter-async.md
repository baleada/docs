---
title: filter async
tags: UI Logic
source: array-async.ts
publish: true
order: 0
---

`createFilterAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to a filtered `toArray`.

::: type="info"
`createFilterAsync` is a light wrapper around [`filter`](https://github.com/RobinMalfait/lazy-collections#filter) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create filter
:::

Call `createFilterAsync` with no parameters to create your `filter` function.

Call `createFilterAsync` with these parameters to create your `filter` function:

::: ariaLabel="createFilterAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

