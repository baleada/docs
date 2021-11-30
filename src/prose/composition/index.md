---
title: What is Baleada Composition?
tags: Composition functions
publish: true
order: 0
---

Baleada Composition is a collection of stateless composition functions (a.k.a. hooks) that accomplish two things:
1. Retrieve **state and methods** from one or more of the [Baleada Logic](/docs/logic) tools
2. Make all of the state **reactive**, using tools from the JavaScript framework of your choice

::: type="info"
Baleada's docs, which were built using [Nuxt.js](https://nuxtjs.org), use Baleada Composition functions for touch detection, animation, navigating arrays, searching docs content, and more 🚀
:::


:::
## Installation
:::

Right now, only the [Vue](https://v3.vuejs.org) implementation of Baleada Composition is available:

:::
```bash
npm i @baleada/vue-composition
```
:::


:::
## Available composition functions
:::

Baleada Composition includes a composition function for each individual class in Baleada Logic.

All composition functions follow a simple naming convention: they start with `use` and end with the name of the class.

::: ariaLabel="Examples of composition function names"
| Class | Composition function |
| --- | --- |
| Animateable | `useAnimateable` |
| Fetchable | `useFetchable` |
| Searchable | `useSearchable` |
:::


:::
## Semantic versioning conventions
:::

The following things will trigger a new major release of Baleada Composition:
- Changes to the overall framework-specific API, import paths, or general workflow

The following things will trigger a new minor release:
- Any changes to reactivity behavior in Baleada Composition's supported frameworks
- Additions of new Baleada Logic classes
- Any changes to Baleada Logic classes or factories that result in changes to the internal structure of Baleada Composition (e.g. if a Baleada Logic class changes and now creates side effects that need to be cleaned up)
