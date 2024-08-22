---
title: number format
source: number.ts
tests: node/number.test.ts
publish: true
order: 0
---

`createDateFormat` is a [pipe](/docs/logic/pipes-overview) that transforms a date or timestamp (number) to a string formatted by [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).


:::
## Create format
:::

Call `createDateFormat` with the [`Intl.DateTimeFormat` constructor's parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) to create your `format` function.

Creating new `Intl` instances can be expensive, so `createDateFormat` implements some performance improvements:
1. Each time you call `createDateFormat`, it checks to see if you have already created a `DateTimeFormat` instance with the same parameters. If you have, it reuses that instance.
2. Each time you call your `format` function, it reuses the same `DateTimeFormat` instance.

:::
```ts
import { createDateFormat as createFormat } from '@baleada/logic'

// The first time you call `createFormat`, it creates a new
// `DateTimeFormat` instance, and returns the `format` function.
const format = createFormat(
  'en',
  {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
)

format(new Date()) // 'Tuesday, August 20, 2024'

// In a distant part of your app, you might call `createFormat`
// again with the same parameters. `createFormat` will check for
// deep equality between the parameters you pass and any parameters
// that have been passed before.
//
// In this case, parameters are deeply equal, so `createFormat`
// will internally reuse the original `DateTimeFormat` instance,
// boosting your app's performance:
const formatAgain = createFormat(
  'en',
  {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
)

formatAgain(new Date()) // 'Tuesday, August 20, 2024'
```
:::
