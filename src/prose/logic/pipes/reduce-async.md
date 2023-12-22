---
title: reduce async
tags: UI Logic
source: array-async.ts
tests: node/array-async.test.ts
publish: true
order: 0
---

`createReduceAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to a reduced array (which can be any data type).

::: type="info"
`createReduceAsync` is a light wrapper around [`reduce`](https://github.com/RobinMalfait/lazy-collections#reduce) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create reduce
:::

Call `createReduceAsync` with these parameters to create your `reduce` function:

::: ariaLabel="createReduceAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `accumulate` | Function | yes | <p>A function that returns a `Promise` that resolves to the accumulated value.</p><p>`accumulate` receives the accumulated value (any data type), the current item (any data type), and the current item's index (number) as parameters.</p> |
| `initialValue` | any | no | <p>The initial value of the accumulator.</p><p>Defaults to `undefined`.</p> |
:::

