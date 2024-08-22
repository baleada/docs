---
title: directed acyclic async common ancestors
source: directed-acyclic-async-node.ts
tests: node/directed-acyclic-async-node.test.ts
publish: false
order: 0
---

`createDirectedAcyclicAsyncCommonAncestors` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms two [nodes](/docs/logic/graph-overview#graph-node-and-edge) in a directed acyclic graph to all of the [common ancestors](/docs/logic/graph-overview#common-ancestor) of both.

Your created `directedAcyclicAsyncCommonAncestors` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each common ancestor separately, starting with the one that is deepest in the graph (closest to the two nodes) and ending with the one that is shallowest in the graph (furthest from the two nodes).


:::
## Create common ancestors
:::

Call `createDirectedAcyclicAsyncCommonAncestors` with no parameters to create your `directedAcyclicAsyncCommonAncestors` function.

Call `createDirectedAcyclicAsyncCommonAncestors` with these parameters to create your `directedAcyclicAsyncCommonAncestors` function:

::: ariaLabel="createDirectedAcyclicAsyncCommonAncestors parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclicAsync` | GraphAsync | yes | The async directed acyclic graph to analyze. |
:::

