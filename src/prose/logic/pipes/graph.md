---
title: graph
tags: UI Logic
source: tree.ts
publish: true
order: 0
---

`createGraph` is a [pipe](/docs/logic/pipes-overview) that transforms a tree to a [graph](/docs/logic/graph-overview).

Your created `graph` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that traverses your tree in depth-first order, yielding each new child node and the edge connected from its parent.


:::
## Create graph
:::

Call `createGraph` with no parameters to create your `graph` function.

Call `createGraph` with these parameters to create your `graph` function:

::: ariaLabel="createGraph parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

