---
title: number format
source: number.ts
tests: node/number.test.ts
publish: true
order: 0
---

`createNumberFormat` is a [pipe](/docs/logic/pipes-overview) that transforms a number to a string formatted by [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).


:::
## Create format
:::

Call `createNumberFormat` with the [`Intl.NumberFormat` constructor's parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) to create your `format` function.

Creating new `Intl` instances can be expensive, so `createNumberFormat` implements some performance improvements:
1. Each time you call `createNumberFormat`, it checks to see if you have already created a `NumberFormat` instance with the same parameters. If you have, it reuses that instance.
2. Each time you call your `format` function, it reuses the same `NumberFormat` instance.

:::
```ts
import { createNumberFormat as createFormat } from '@baleada/logic'

// The first time you call `createFormat`, it creates a new
// `NumberFormat` instance, and returns the `format` function.
const format = createFormat(
  'en',
  { style: 'decimal' }
)

format(1234567) // '1,234,567'

// In a distant part of your app, you might call `createFormat`
// again with the same parameters. `createFormat` will check for
// deep equality between the parameters you pass and any parameters
// that have been passed before.
//
// In this case, parameters are deeply equal, so `createFormat`
// will internally reuse the original `NumberFormat` instance,
// boosting your app's performance:
const formatAgain = createFormat(
  'en',
  { style: 'decimal' }
)

formatAgain(1234567) // '1,234,567'
```
:::
