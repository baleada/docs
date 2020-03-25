---
title: What is Baleada Composition?
tags: Composition functions, Vue, React, Svelte
publish: true
order: 0
---

Baleada Composition is a collection of composition functions (a.k.a. hooks) that accomplish two things:
1. Retrieve **state and methods** from one or more of the [Baleada Logic](/docs/logic) tools
2. Make all of the state **reactive**, using tools from the JavaScript framework of your choice

::: type="info"
Baleada's docs, which were built using [Nuxt.js](https://nuxtjs.org), use Baleada Composition functions for touch detection, animation, navigating arrays, searching docs content, and more 🚀
:::

Composition functions are supported for the following frameworks:
- [Vue](https://vuejs.org)
- [React](https://react.org) [WIP]
- [Svelte](https://svelte.dev) [WIP]

::: type="info"
Didn't see your favorite framework in the list? Feel free to [raise an issue](https://gitlab.com/baleada/composition/issues) and ask for support.
:::


:::
## Install
:::

:::
```bash
npm i @baleada/composition
```
:::


:::
## Available composition functions
:::

`@baleada/composition` includes a composition function for each individual class in Baleada Logic.

All composition functions follow a simple naming convention: they start with `use` and end with the name of the class.

::: ariaLabel="Examples of composition function names"
| Class | Composition function |
| --- | --- |
| Animateable | `useAnimateable` |
| Fetchable | `useFetchable` |
| Searchable | `useSearchable` |
:::



:::
## Language, compilation, browser support, and dependencies
:::

The functions in Baleada Composition are written in modern JavaScript. [Baleada Logic](/docs/logic) is a peer dependency, and depending on the component framework you're using, additional peer dependencies are required:

::: ariaLabel="Peer dependencies by framework"
| Framework | Peer dependencies |
| --- | --- |
| Vue | <p>['vue'](https://github.com/vuejs/vue)</p><p>[`@vue/composition-api](https://github.com/vuejs/composition-api)</p> |
| React | WIP |
| Svelte | WIP |
:::

Baleada Composition functions are compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Composition has no side effects and is bundled by [Rollup](https://rollupjs.org/), outputting [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).


:::
## Semantic versioning conventions
:::

The following things will trigger a new major release of Baleada Composition:
- Any changes to the existing options accepted by any of the Baleada Composition functons
- Any changes to the existing metadata stored by the functions

The following things will trigger a new minor release:
- Tha addition of functions for new gestures
- Added options for the functions
- Additional metadata stored by the functions