---
title: incoming
tags: UI Logic
source: graph-node.ts
publish: false
order: 0
---

`createIncoming` is a [pipe](/docs/logic/pipes-overview) that transforms a [node](/docs/logic/graph-overview#graph-node-and-edge) to the node's incoming edges.

Your created `incoming` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each edge separately.


:::
## Create incoming
:::

Call `createIncoming` with these parameters to create your `incoming` function:

::: ariaLabel="createIncoming parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `graph` | [graph](/docs/logic/graph-overview) | yes | The graph to analyze. |
:::

