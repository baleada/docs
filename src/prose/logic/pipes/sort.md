---
title: sort
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createSort` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a sorted array.

::: type="info"
`createSort` is a light wrapper around [`sort`](https://github.com/RobinMalfait/lazy-collections#sort) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create sort
:::

Call `createSort` with no parameters to create your `sort` function.

Call `createSort` with these parameters to create your `sort` function:

::: ariaLabel="createSort parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

