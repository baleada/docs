---
title: Graph
tags: UI Logic
source: extracted/graph.ts
publish: true
order: 6
---

Baleada Logic includes [pipes](/docs/logic/pipes-overview) for working with graphs, i.e. collections of interconnected nodes.

Currently, pipes focus on a specific type of graph, the [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph), because that's the type of graph that's most commonly found in UIs.

Examples of directed acyclic graphs that exist right now in your UI:
- Multi-step forms, especially ones that branch off in multiple directions
- User onboarding flows
- Grids/tables/spreadsheets
- The DOM
- Rich text editor contents (which are basically the DOM, but text editor libraries often maintain a custom internal data structure that's also a directed acyclic graph)

Baleada Logic's goals in this area are:
- Create a unified, flexible data structure that fits all of these use cases
- Make it possible to write more patterned, reusable, type-safe code when interacting with that data structure
- Make sure it's relatively easy to write code or build UI that can add to the data structure

More documentation might land here in the future, but if you want to learn more in the meantime, click the link at the top of this article to view the source code and type definitions for graphs in Baleada Logic.

You can also check out any of the Baleada Logic pipes related to graphs:
- [incoming](/docs/logic/pipes/incoming)
- [indegree](/docs/logic/pipes/indegree)
- [outgoing](/docs/logic/pipes/outgoing)
- [outdegree](/docs/logic/pipes/outdegree)
- [root](/docs/logic/pipes/root)
- [directed-acyclic-ancestor](/docs/logic/pipes/directed-acyclic-ancestor)
- [directed-acyclic-common-ancestors](/docs/logic/pipes/directed-acyclic-common-ancestors)
- [directed-acyclic-depth-first-steps](/docs/logic/pipes/directed-acyclic-depth-first-steps)
- [directed-acyclic-layers](/docs/logic/pipes/directed-acyclic-layers)
- [directed-acyclic-node-depth-first-steps](/docs/logic/pipes/directed-acyclic-node-depth-first-steps)
- [directed-acyclic-path](/docs/logic/pipes/directed-acyclic-path)
- [directed-acyclic-roots](/docs/logic/pipes/directed-acyclic-roots)
- [directed-acyclic-tree](/docs/logic/pipes/directed-acyclic-tree)
- [async-directed-acyclic-ancestor](/docs/logic/pipes/async-directed-acyclic-ancestor)
- [async-directed-acyclic-common-ancestors](/docs/logic/pipes/async-directed-acyclic-common-ancestors)
- [async-directed-acyclic-depth-first-steps](/docs/logic/pipes/async-directed-acyclic-depth-first-steps)
- [async-directed-acyclic-layers](/docs/logic/pipes/async-directed-acyclic-layers)
- [async-directed-acyclic-node-depth-first-steps](/docs/logic/pipes/async-directed-acyclic-node-depth-first-steps)
- [async-directed-acyclic-path](/docs/logic/pipes/async-directed-acyclic-path)
- [async-directed-acyclic-tree](/docs/logic/pipes/async-directed-acyclic-tree)
- [decision-tree-ancestor](/docs/logic/pipes/decision-tree-ancestor)
- [decision-tree-common-ancestors](/docs/logic/pipes/decision-tree-common-ancestors)
- [decision-tree-depth-first-steps](/docs/logic/pipes/decision-tree-depth-first-steps)
- [decision-tree-node-depth-first-steps](/docs/logic/pipes/decision-tree-node-depth-first-steps)
- [decision-tree-path](/docs/logic/pipes/decision-tree-path)
- [decision-tree-tree](/docs/logic/pipes/decision-tree-tree)
- [graph](/docs/logic/pipes/graph)
- [tree-find](/docs/logic/pipes/tree-find)
