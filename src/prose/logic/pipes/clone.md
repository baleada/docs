---
title: clone
source: any.ts
tests: node/any.test.ts
publish: true
order: 0
---

`createClone` is a [pipe](/docs/logic/pipes-overview) that transforms anything to a deep clone of itself.

::: type="info"
`createClone` is a thin wrapper around [`klona`](https://github.com/lukeed/klona).
:::


:::
## Create clone
:::

Call `createClone` with no parameters to create your `clone` function.
