---
title: filter
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createFilter` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a filtered array.

::: type="info"
`createFilter` is a light wrapper around [`filter`](https://github.com/RobinMalfait/lazy-collections#filter) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create filter
:::

Call `createFilter` with no parameters to create your `filter` function.

Call `createFilter` with these parameters to create your `filter` function:

::: ariaLabel="createFilter parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::
