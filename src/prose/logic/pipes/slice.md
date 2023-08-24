---
title: slice
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createSlice` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a sliced array.

::: type="info"
`createSlice` is a light wrapper around [`slice`](https://github.com/RobinMalfait/lazy-collections#slice) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create slice
:::

Call `createSlice` with no parameters to create your `slice` function.

Call `createSlice` with these parameters to create your `slice` function:

::: ariaLabel="createSlice parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

