---
title: directed acyclic async depth-first steps
source: directed-acyclic-async.ts
tests: node/directed-acyclic-async.test.ts
publish: false
order: 0
---

`createDirectedAcyclicAsyncDepthFirstSteps` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an [async directed acyclic graph](/docs/logic/graph-overview#async-graph) to depth-first [steps](/docs/logic/graph-overview#step) through the graph.

Your created `directedAcyclicAsyncDepthFirstSteps` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each step separately.


:::
## Create depth-first steps
:::

Call `createDirectedAcyclicAsyncDepthFirstSteps` with no parameters to create your `directedAcyclicAsyncDepthFirstSteps` function.

Call `createDirectedAcyclicAsyncDepthFirstSteps` with these parameters to create your `directedAcyclicAsyncDepthFirstSteps` function:

::: ariaLabel="createDirectedAcyclicAsyncDepthFirstSteps parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

