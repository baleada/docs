---
title: remove
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createRemove` is a [pipe](/docs/logic/pipes-overview) that transforms an array to an array with an item at a given index removed.

::: type="info"
`createRemove` is a light wrapper around [`remove`](https://github.com/RobinMalfait/lazy-collections#remove) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create remove
:::

Call `createRemove` with no parameters to create your `remove` function.

Call `createRemove` with these parameters to create your `remove` function:

::: ariaLabel="createRemove parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

