---
title: sort
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createSort` is a pipe that accepts an array as an input, and outputs <!--TODO-->.

::: type="info"
`createSort` is a light wrapper around [`sort`](https://github.com/RobinMalfait/lazy-collections#sort) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `sort`
:::

Call `createSort` with no parameters to create your `sort` function.

Call `createSort` with the parameters listed below to create your `sort` function:

::: ariaLabel="createSort parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createSort` with TypeScript 🚀
