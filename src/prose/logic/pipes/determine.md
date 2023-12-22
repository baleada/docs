---
title: determine
tags: UI Logic
source: number.ts
tests: node/number.test.ts
publish: true
order: 0
---

`createDetermine` is a [pipe](/docs/logic/pipes-overview) that transforms a number (usually generated randomly) to some outcome (which can be any data type) based on the probability of each outcome.


:::
## Create determine
:::

Call `createDetermine` with these parameters to create your `determine` function:

::: ariaLabel="createDetermine parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `potentialities` | Array | yes | <p>An array of object, each of which specify an `outcome` (any data type) and a `probability` (number).</p><p>The `probability` numbers don't have to be on any particular scale. They're treated as weighted values, relative to the sum of all `probability` values.</p><p>For example, if you pass four objects, each with a `probability` of `0.25`, and then call `determine(Math.random())`, each outcome will have a 25% chance of occurring</p><p>Likewise, if you pass four objects, each with a `probability` of `1`, and then call `determine(Math.random())`, each outcome will _still_ have a 25% chance of occurring, because the `probability` values of `1` are weighted relative to the probability sum of `4`.</p> |
:::


:::
## Example
:::

:::
```ts
import { createDetermine } from '@baleada/logic'

const determine = createDetermine([
  { outcome: 'red', probability: 1 },
  { outcome: 'green', probability: 1 },
  { outcome: 'blue', probability: 1 },
])

// Each outcome has a 33% chance of occurring
const outcome = determine(Math.random());
```
:::

:::
```ts
import { createDetermine } from '@baleada/logic'

const determine = createDetermine([
  { outcome: 'red', probability: 3 },
  { outcome: 'green', probability: 0 },
  { outcome: 'blue', probability: 0 },
])

// `red` has a 100% chance of occurring
const outcome = determine(Math.random());
```
:::

:::
```ts
import { createDetermine } from '@baleada/logic'
const determine = createDetermine([
  { outcome: 'red', probability: 2 },
  { outcome: 'green', probability: 1 },
  { outcome: 'blue', probability: 1 },
])

// `red` has a 50% chance of occurring, and both
// `green` and `blue` have a 25% chance of occurring
const outcome = determine(Math.random());
```
:::
