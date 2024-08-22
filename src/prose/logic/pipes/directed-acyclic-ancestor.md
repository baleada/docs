---
title: directed acyclic ancestor
source: directed-acyclic-node.ts
tests: node/directed-acyclic.test.ts
publish: false
order: 0
---

`createDirectedAcyclicAncestor` is a [pipe](/docs/logic/pipes-overview) that transforms two [nodes](/docs/logic/graph-overview#graph-node-and-edge) in a directed acyclic graph to a boolean indicating whether or not the second node is an ancestor of the first.


:::
## Create ancestor
:::

Call `createDirectedAcyclicAncestor` with no parameters to create your `directedAcyclicAncestor` function.

Call `createDirectedAcyclicAncestor` with these parameters to create your `directedAcyclicAncestor` function:

::: ariaLabel="createDirectedAcyclicAncestor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclic` | Graph | yes | The directed acyclic graph to analyze. |
:::

