---
title: What is Baleada Composition?
framework: agnostic
publish: true
order: 0
---

Baleada Composition is a collection of composition functions (a.k.a. hooks) that accomplish two things:
1. Retrieve **state and methods** from one or more of the [Baleada Logic](/docs/logic) tools
2. Make all of the state **reactive**, using tools from the JavaScript framework of your choice

::: type="info"
Baleada's docs, which were built using [Nuxt.js](https://nuxtjs.org), use composition functions for touch detection, animation, navigating arrays, searching docs content, and more 🚀
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
