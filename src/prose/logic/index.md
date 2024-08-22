---
title: What is Baleada Logic?
source: logic
publish: true
order: 0
summary: TypeScript that implements low-level UI logic
---

Baleada Logic is TypeScript that implements **low-level UI logic**.

Explore the philosophy behind Baleada Logic in [Identifying UI Logic](/docs/logic/identifying-ui-logic).

UI logic tools are implemented with several different patterns, each of which has its own overview guide:
- [Classes](/docs/logic/classes-overview)
- [Pipes](/docs/logic/pipes-overview)
- [Links](/docs/logic/links-overview)
- [Factories](/docs/logic/factories-overview)

Some tools also deal with shared data structures and concepts, which are documented here (and always linked from the docs for individual tools that deal with these things):
- [Graph](/docs/logic/graph-overview)
- [Keycombo](/docs/logic/keycombo-overview)
- [Associative array](/docs/logic/associative-array-overview)


:::
## Install
:::

:::
```bash
npm i @baleada/logic
```
:::


:::
## Import a tool
:::

All classes, pipes, links, and factories are named exports in Baleada Logic's entry file, so you can import them like so:

:::
```js
// Import a class
import { Delayable } from '@baleada/logic'

// Import a pipe
import { createReorder } from '@baleada/logic'

// Import a link
import { createAssociativeArraySet } from '@baleada/logic'

// Import a factory
import { createMousepress } from '@baleada/logic'
```
:::


:::
## Available tools
:::

All available classes, pipes, links, and factories are listed in this site's navigation under **LOGIC** and linked to their specific documentation.
