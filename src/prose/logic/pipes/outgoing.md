---
title: outgoing
source: graph-node.ts
tests: node/graph-node.test.ts
publish: false
order: 0
---

`createOutgoing` is a [pipe](/docs/logic/pipes-overview) that transforms a [node](/docs/logic/graph-overview#graph-node-and-edge) to the node's outgoing edges.

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
