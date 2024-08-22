---
title: reduce
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createReduce` is a [pipe](/docs/logic/pipes-overview) that transforms an array to reduced array (which can be any data type).

::: type="info"
`createReduce` is a light wrapper around [`reduce`](https://github.com/RobinMalfait/lazy-collections#reduce) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create reduce
:::

Call `createReduce` with these parameters to create your `reduce` function:

::: ariaLabel="createReduce parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `accumulate` | Function | yes | <p>A function that returns the accumulated value.</p><p>`accumulate` receives the accumulated value (any data type), the current item (any data type), and the current item's index (number) as parameters.</p> |
| `initialValue` | any | no | <p>The initial value of the accumulator.</p><p>Defaults to `undefined`.</p> |
:::

