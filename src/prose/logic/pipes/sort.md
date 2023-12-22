---
title: sort
tags: UI Logic
source: array.ts
tests: node/array.test.ts
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

Call `createSort` with these parameters to create your `sort` function:

::: ariaLabel="createSort parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `compare` | Function | yes | <p>A function that compares two items in the array.</p><p>It should return a negative number if the first item should have a lower sort position than the second item, a positive number if the first item should have a higher sort position than the second item, or `0` if the items should remain in place.</p> |
:::

