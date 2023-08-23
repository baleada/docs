---
title: concat
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createConcat` is a pipe that accepts an array as an input, and outputs <!--TODO-->.

::: type="info"
`createConcat` is a light wrapper around [`concat`](https://github.com/RobinMalfait/lazy-collections#concat) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `concat`
:::

Call `createConcat` with no parameters to create your `concat` function.

Call `createConcat` with the parameters listed below to create your `concat` function:

::: ariaLabel="createConcat parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createConcat` with TypeScript 🚀
