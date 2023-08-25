---
title: directed acyclic async node depth-first steps
tags: UI Logic
source: directed-acyclic-async.ts
publish: true
order: 0
---

`createDirectedAcyclicAsyncNodeDepthFirstSteps` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms a [node](/docs/logic/graph-overview#graph-node-and-edge) in an [async directed acyclic graph](/docs/logic/graph-overview#async-graph) to depth-first [steps](/docs/logic/graph-overview#step) in the graph, where the step's path ends at that node.

Your created `directedAcyclicAsyncNodeDepthFirstSteps` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each step separately.


:::
## Create node depth-first steps
:::

Call `createDirectedAcyclicAsyncNodeDepthFirstSteps` with no parameters to create your `directedAcyclicAsyncNodeDepthFirstSteps` function.

Call `createDirectedAcyclicAsyncNodeDepthFirstSteps` with these parameters to create your `directedAcyclicAsyncNodeDepthFirstSteps` function:

::: ariaLabel="createDirectedAcyclicAsyncNodeDepthFirstSteps parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclicAsync` | GraphAsync | yes | The async directed acyclic graph to analyze. |
| `options` | Object | no | Options to customize the behavior of the `directedAcyclicAsyncNodeDepthFirstSteps` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createDirectedAcyclicAsyncNodeDepthFirstSteps options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `createDepthFirstSteps` | Object | See description | <p>Options for the `createDepthFirstSteps` pipe used under the hood.</p><p>See the [directed acyclic depth first steps](/docs/logic/pipes/directed-acyclic-depth-first-steps) docs for more info on properties, their defaults, and their effect on graph traversal.</p> |
:::

