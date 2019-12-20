---
title: Types of tools
framework: agnostic
publish: true
order: 1
---

Each tool in the Baleada app-building toolkit falls into one of the following categories:
- [UI logic](#ui-logic)
- [Composition functions (a.k.a. hooks)](#composition-functions-a-k-a-hooks)
- [Icon components](#icon-components)

Each category of tools has its own NPM package that you can install:

::: ariaLabel="Table showing tool categories and the corresponding NPM package for each category"
| Tool category | NPM package |
| --- | --- |
| UI logic | `@baleada/logic` |
| Composition functions | `@baleada/composition` |
| Icon components | `@baleada/icons` |
:::

If you're itching to install those packages and get started with the tools they offer, you can check out the dedicated guides for [Baleada Logic](/docs/logic), [Baleada Composition](/docs/composition), and [Baleada Icons](/docs/icons).

If you're not quite sure what all these terms mean, feel free to keep reading!

:::
## UI logic
:::

Broadly, UI logic is JavaScript that powers **user interface behaviors**. Baleada provides UI logic for specific behaviors that are commonly needed, but can be complex to implement in a reusable way.

For example:
:::
- Allowing the user to enter a search term, query an array of strings or objects, and receive a list of search results based on fuzzy matches
- Autocompleting text, replacing all or part of the original text with a completed value
- Detecting and reacting to common gestures (pan, swipe, double-tap, drag, drag-and-drop, etc.), or even custom gestures that you define
:::

To get started with Baleada's logic, check out the [Baleada Logic](/docs/logic) package.

:::
## Composition functions (a.k.a. hooks)
:::

"Composition function" is a term coined by the [Vue](https://vuejs.org) team to describe functions that **collocate code** related to the same logical concern. In [React](https://react.org), these functions are called "hooks", but the concept and motivations are virtually the same.

Baleada's composition functions collocate **reactivity** code with **UI logic** code. More specifically, each Baleada composition function retrieves state and methods from one or more of the Baleada Logic tools, then makes all of the state reactive, using tools from the JavaScript framework of your choice.

To get started with Baleada's composition functions, check out the [Baleada Composition](/docs/composition) package.

:::
## Icon components
:::

There are [tons of reasons](http://www.fullstackradio.com/47) to use **true SVG icons** instead of icon fonts. But copy/pasting SVG markup all over your website or app is tedious, not readable, and not maintainable.

If you're using a component framework like Vue, React, or Svelte, the clear solution is to wrap up your SVG icons in reusable components, so that you get all the benefits of SVGs while writing efficient code.

Baleada's icon components do just that! To get started with them, check out the [Baleada Icons](/docs/icons) package.
