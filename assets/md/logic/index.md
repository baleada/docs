---
title: What is Baleada Logic?
framework: agnostic
publish: true
order: 0
---

Baleada Logic is a collection of JavaScript [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and factory functions that implement **UI logic**.

::: type"info"
A "factory function" is a function that returns an object.
:::


:::
## A note, before you dive in
:::

All of Baleada Logic's classes and factories are framework-agnostic. However, the number one priority during Baleada's development was to add useful state and methods to websites and apps that are built on reactivity & component frameworks like Vue, React, or Svelte and bundled using Webpack, Rollup, or something similar. In most cases, it's recommended that you use [Baleada Composition](/docs/composition) inside the framework & build chain of your choice instead of importing classes and factories directly from Baleada Logic.

Baleada Composition has a dedicated composition function for each individual Baleada Logic class, plus composition functions that combine Baleada Logic classes to implement common UI patterns (think autocompletes, toasts, forms that auto-save, etc.).

If you're planning to use Baleada Composition, you won't need to know how to install and import classes and factories directly from Baleada Logic, but you'll still need to know how to use individual classes and factories. A great place to start is the [Concepts](/docs/logic/concepts) guide, which will teach you core concepts and patterns that will help you use Baleada Logic's classes and factories successfully.

All of that said, the number _two_ priority during Baleada's development was to ensure it's still perfectly possible to use Baleada Logic in simpler projects, built with smaller JavaScript frameworks or no framework at all. If that sounds like your use case, keep reading!


:::
## Language, compilation, browser support, and dependencies
:::

Classes and factories are written in modern JavaScript, and almost all of them have no dependencies of their own. They are compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Logic's compiled code uses [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) instead of [`require()`](https://nodejs.org/api/modules.html#modules_require_id) and [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports).

Dependencies, when they exist, were chosen with the following desirable characteristics in mind (in no particular order):
- Framework agnostic
- Few or no dependencies of their own
- Small file size
- Tree-shakeable
- Small impact on apps' bundle size
- Industry standard
- Recommended/used by proficient, well-known, independent developers

Not all dependencies meet every single one of those requirements. However, lots of care was taken to ensure that, if a dependency can be replaced by something better in the future, doing so will be quick and easy, and with any luck, won't result in breaking changes.



:::
## Install
:::

:::
```bash
npm i @baleada/logic
```
:::


:::
## Import a class or factory
:::

All classes are named exports in Baleada Logic's entry file, so you can import one like so:


:::
```js
import { Delayable } from '@baleada/logic'
```
:::

Factories are named exports in a `factories.js` file at the root of Baleada Logic, so you can import one like so:

:::
```js
import { markupable } from '@baleada/logic/factories'
```
:::


:::
## Available classes and factories
:::

All available classes and factories are listed in this site's navigation under **LOGIC** and linked to their specific documentation.
