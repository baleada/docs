---
title: directed acyclic roots
tags: UI Logic
source: directed-acyclic.ts
publish: false
order: 0
---

`createDirectedAcyclicRoots` is a [pipe](/docs/logic/pipes-overview) that transforms a [directed acyclic graph](/docs/logic/graph-overview) to the root [nodes](/docs/logic/graph-overview#graph-node-and-edge) of that graph (i.e. any node that has zero incoming edges).

Your created `directedAcyclicRoots` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each root node separately.

:::
## Create roots
:::

Call `createDirectedAcyclicRoots` with no parameters to create your `directedAcyclicRoots` function.

Call `createDirectedAcyclicRoots` with these parameters to create your `directedAcyclicRoots` function:

::: ariaLabel="createDirectedAcyclicRoots parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

