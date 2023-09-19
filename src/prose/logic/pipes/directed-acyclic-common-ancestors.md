---
title: directed acyclic common ancestors
tags: UI Logic
source: directed-acyclic-node.ts
publish: false
order: 0
---

`createDirectedAcyclicCommonAncestors` is a [pipe](/docs/logic/pipes-overview) that transforms two [nodes](/docs/logic/graph-overview#graph-node-and-edge) in a directed acyclic graph to all of the [common ancestors](/docs/logic/graph-overview#common-ancestor) of both.

Your created `directedAcyclicCommonAncestors` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each common ancestor separately, starting with the one that is deepest in the graph (closest to the two nodes) and ending with the one that is shallowest in the graph (furthest from the two nodes).


:::
## Create common ancestors
:::

Call `createDirectedAcyclicCommonAncestors` with no parameters to create your `directedAcyclicCommonAncestors` function.

Call `createDirectedAcyclicCommonAncestors` with these parameters to create your `directedAcyclicCommonAncestors` function:

::: ariaLabel="createDirectedAcyclicCommonAncestors parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclic` | Graph | yes | The directed acyclic graph to analyze. |
:::

