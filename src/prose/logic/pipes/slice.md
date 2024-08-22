---
title: slice
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createSlice` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a sliced array.

::: type="info"
`createSlice` is a light wrapper around [`slice`](https://github.com/RobinMalfait/lazy-collections#slice) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).

Only break this rule if you're passing negative indices to `createSlice`—`lazy-collections` doesn't support them for performance reasons, but `createSlice` will gracefully fall back to an `Array.prototype.slice` implementation.
:::


:::
## Create slice
:::

Call `createSlice` with these parameters to create your `slice` function:

::: ariaLabel="createSlice parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | number | yes | The index to start the slice from. A negative `from` will count back from the end of the array. |
| `to` | number | yes | The index to slice to. The item at `to` will not be included in the sliced array. A negative `to` will count back from the end of the array. |
:::
