---
title: array format
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createArrayFormat` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a string formatted by [`Intl.ListFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat).


:::
## Create format
:::

Call `createArrayFormat` with the [`Intl.ListFormat` constructor's parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) to create your `format` function.

Creating new `Intl` instances can be expensive, so `createArrayFormat` implements some performance improvements:
1. Each time you call `createArrayFormat`, it checks to see if you have already created a `ListFormat` instance with the same parameters. If you have, it reuses that instance.
2. Each time you call your `format` function, it reuses the same `ListFormat` instance.

:::
```ts
import { createArrayFormat as createFormat } from '@baleada/logic'

// The first time you call `createFormat`, it creates a new
// `ListFormat` instance, and returns the `format` function.
const format = createFormat(
  'en',
  { style: 'long', type: 'conjunction' }
)

format(['one', 'two', 'three']) // 'one, two, and three'

// In a distant part of your app, you might call `createFormat`
// again with the same parameters. `createFormat` will check for
// deep equality between the parameters you pass and any parameters
// that have been passed before.
//
// In this case, parameters are deeply equal, so `createFormat`
// will internally reuse the original `ListFormat` instance,
// boosting your app's performance:
const formatAgain = createFormat(
  'en',
  { style: 'long', type: 'conjunction' }
)

formatAgain(['one', 'two', 'three']) // 'one, two, and three'
```
:::
