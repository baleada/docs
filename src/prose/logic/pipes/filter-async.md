---
title: filter async
tags: UI Logic
source: array async.ts
publish: true
order: 0
---

`createFilterAsync` is a pipe that accepts an array as an input, and asynchronously outputs <!--TODO-->.

::: type="info"
`createFilterAsync` is a light wrapper around [`filter`](https://github.com/RobinMalfait/lazy-collections#filter) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `filterAsync`
:::

Call `createFilterAsync` with no parameters to create your `filterAsync` function.

Call `createFilterAsync` with the parameters listed below to create your `filterAsync` function:

::: ariaLabel="createFilterAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createFilterAsync` with TypeScript 🚀
