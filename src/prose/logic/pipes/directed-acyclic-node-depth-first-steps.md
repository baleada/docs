---
title: directed acyclic node depth-first steps
source: directed-acyclic.ts
tests: node/directed-acyclic.test.ts
publish: false
order: 0
---

`createDirectedAcyclicNodeDepthFirstSteps` is a [pipe](/docs/logic/pipes-overview) that transforms a node in a [directed acyclic graph](/docs/logic/graph-overview) to depth-first [steps](/docs/logic/graph-overview#step) in the graph where the step's path ends at that node.

Your created `directedAcyclicNodeDepthFirstSteps` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each step separately.


:::
## Create node depth-first steps
:::

Call `createDirectedAcyclicNodeDepthFirstSteps` with no parameters to create your `directedAcyclicNodeDepthFirstSteps` function.

Call `createDirectedAcyclicNodeDepthFirstSteps` with these parameters to create your `directedAcyclicNodeDepthFirstSteps` function:

::: ariaLabel="createDirectedAcyclicNodeDepthFirstSteps parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

