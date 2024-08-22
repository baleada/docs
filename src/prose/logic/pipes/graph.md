---
title: graph
source: tree.ts
tests: node/graph.test.ts
publish: false
order: 0
---

`createGraph` is a [pipe](/docs/logic/pipes-overview) that transforms a tree to a [graph](/docs/logic/graph-overview).

Your created `graph` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that traverses your tree in depth-first order, yielding each new child node and the edge connected from its parent.


:::
## Create graph
:::

Call `createGraph` with these parameters to create your `graph` function:

::: ariaLabel="createGraph parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `graph` function. See the [Options](#options) section for more guidance. |
:::

:::
### Options
:::

::: ariaLabel="createGraph options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `toId` | Function | A simple counter | A function that accepts a node in your tree and returns a unique identifier for that node. |
| `toChildren` | Function | `node => node.children` | A function that accepts a node in your tree and returns an array of its children. |
:::

::: type="info"
`createGraph`'s default options are designed to work out of the box for DOM trees.
:::
