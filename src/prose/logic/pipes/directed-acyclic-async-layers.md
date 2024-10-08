---
title: directed acyclic async layers
source: directed-acyclic-async.ts
tests: node/directed-acyclic-async.test.ts
publish: false
order: 0
---

`createDirectedAcyclicAsyncLayers` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an [async directed acyclic graph](/docs/logic/graph-overview#async-graph) to an array of arrays of [nodes](/docs/logic/graph-overview#graph-node-and-edge). Each sub-array contains all the nodes that are at a given depth in the tree.


:::
## Create layers
:::

Call `createDirectedAcyclicAsyncLayers` with no parameters to create your `directedAcyclicAsyncLayers` function.

Call `createDirectedAcyclicAsyncLayers` with these parameters to create your `directedAcyclicAsyncLayers` function:

::: ariaLabel="createDirectedAcyclicAsyncLayers parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

