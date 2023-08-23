---
title: reorder
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createReorder` is a pipe that accepts an array as an input, and outputs <!--TODO-->.

::: type="info"
`createReorder` is a light wrapper around [`reorder`](https://github.com/RobinMalfait/lazy-collections#reorder) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `reorder`
:::

Call `createReorder` with no parameters to create your `reorder` function.

Call `createReorder` with the parameters listed below to create your `reorder` function:

::: ariaLabel="createReorder parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createReorder` with TypeScript 🚀
