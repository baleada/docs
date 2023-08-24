---
title: outgoing
tags: UI Logic
source: graph.ts
publish: true
order: 0
---

`createOutgoing` is a [pipe](/docs/logic/pipes-overview) that transforms a node in a [graph](/docs/logic/graph-overview) to the node's outgoing edges.

Your created `outgoing` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each edge separately.


:::
## Create outgoing
:::

Call `createOutgoing` with these parameters to create your `outgoing` function:

::: ariaLabel="createOutgoing parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `graph` | [graph](/docs/logic/graph-overview) | yes | The graph to analyze. |
:::
