---
title: What is Baleada Logic?
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

Baleada Logic is a collection of JavaScript [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [pipes](/docs/logic/pipes) that implement **UI logic**.


:::
## Before you dive in
:::

All of Baleada Logic's classes and pipes are framework-agnostic. However, the number one priority during Baleada's development was to add useful state and methods to websites and apps that are built on reactivity & component frameworks like Vue, React, or Svelte and bundled using Webpack, Rollup, or something similar.

In most cases, it's recommended that you use [Baleada Composition](/docs/composition) inside the framework & build tools of your choice instead of importing classes directly from Baleada Logic, since Baleada Composition automatically cleans up side effects (i.e. prevents memory leaks) when your components are destroyed.

Baleada Composition has a dedicated composition function for each individual Baleada Logic class. You can also check out [Baleada Features](/docs/features), which combines Baleada Composition functions with other reactivity APIs to create things like keyboard accessible modals, tablists, autocompletes, etc.

If you're planning to use Baleada Composition or Baleada Features, you won't need to know how to install and import classes directly from Baleada Logic, but you'll still need to know how to use individual classes. A great place to start is the [Identifying UI Logic](/docs/logic/identifying-ui-logic) guide, which will teach you core concepts and patterns that will help you use Baleada Logic's classes successfully.

All of that said, the number _two_ priority during Baleada's development was to ensure it's still completely possible to use Baleada Logic in projects built with smaller JavaScript frameworks or no framework at all. If that sounds like your use case, keep reading! (And definitely check out the [Identifying UI Logic](/docs/logic/identifying-ui-logic) guide afterward.)


:::
## Install
:::

:::
```bash
npm i @baleada/logic
```
:::


:::
## Import a class or pipe
:::

All classes and pipes are named exports in Baleada Logic's entry file, so you can import them like so:

:::
```js
// Import a class
import { Delayable } from '@baleada/logic'

// Import a pipe
import { createReorder } from '@baleada/logic'
```
:::


:::
## Available classes and pipes
:::

All available classes and pipes are listed in this site's navigation under **LOGIC** and linked to their specific documentation.
