---
title: directed acyclic layers
tags: UI Logic
source: directed-acyclic.ts
tests: node/directed-acyclic.test.ts
publish: false
order: 0
---

`createDirectedAcyclicLayers` is a [pipe](/docs/logic/pipes-overview) that transforms a [directed acyclic graph](/docs/logic/graph-overview) to an array of arrays of [nodes](/docs/logic/graph-overview#graph-node-and-edge). Each sub-array contains all the nodes that are at a given depth in the tree.


:::
## Create layers
:::

Call `createDirectedAcyclicLayers` with no parameters to create your `directedAcyclicLayers` function.

Call `createDirectedAcyclicLayers` with these parameters to create your `directedAcyclicLayers` function:

::: ariaLabel="createDirectedAcyclicLayers parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

