---
title: swap
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createSwap` is a [pipe](/docs/logic/pipes-overview) that transforms an array to an array with the positions of two items swapped.


:::
## Create swap
:::

Call `createSwap` with these parameters to create your `swap` function:

::: ariaLabel="createSwap parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `item1Index` | number | yes | The index of the first item to swap. |
| `item2Index` | number | yes | The index of the second item to swap. |
:::
