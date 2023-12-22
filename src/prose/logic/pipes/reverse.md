---
title: reverse
tags: UI Logic
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createReverse` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a reversed array.

::: type="info"
`createReverse` is a light wrapper around [`reverse`](https://github.com/RobinMalfait/lazy-collections#reverse) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create reverse
:::

Call `createReverse` with no parameters to create your `reverse` function.
