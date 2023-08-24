---
title: unique
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createUnique` is a [pipe](/docs/logic/pipes-overview) that transforms an array to an array of unique items.

::: type="info"
`createUnique` is a light wrapper around [`unique`](https://github.com/RobinMalfait/lazy-collections#unique) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create unique
:::

Call `createUnique` with no parameters to create your `unique` function.

Call `createUnique` with these parameters to create your `unique` function:

::: ariaLabel="createUnique parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

