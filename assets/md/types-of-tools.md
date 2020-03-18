---
title: Types of tools
tags: agnostic
publish: true
order: 1
---

Each tool in the Baleada app-building toolkit falls into one of the following categories:
- [UI logic](#ui-logic)
- [Composition functions (a.k.a. hooks)](#composition-functions-a-k-a-hooks)
- [Components](#components)
- [Configuration utilities](#configuration-utilities)

Each category of tools has its own NPM package that you can install:

::: ariaLabel="Table showing tool categories and the corresponding NPM package for each category" classes="wide-2"
| Tool category | NPM packages |
| --- | --- |
| UI logic | <p>[`@baleada/logic`](/docs/logic)</p><p>`@baleada/listenable-gestures`</p><p>[`@baleada/animateable-timings`](/docs/logic/classes/animateable#how-to-format-timing)</p> |
| Composition functions | [`@baleada/composition`](/docs/composition) |
| Components | <p>[`@baleada/icons`](/docs/icons)</p><p>[`@baleada/prose`](/docs/prose)</p><p>`@baleada/interface`</p> |
| Configuration utilities | <p>[`@baleada/linear-numeric`](/docs/linear-numeric)</p><p>[`@baleada/source-transform`](/docs/source-transform)</p><p>[`@baleada/spa-links`](/docs/spa-links)</p> |
:::

If you're itching to install those packages and get started with the tools they offer, you can check out the dedicated guides in the sidebar navigation.

If you're not quite sure what all these terms mean, feel free to keep reading!


:::
## UI logic
:::

Broadly, UI logic is JavaScript that powers **user interface behaviors**. Baleada provides UI logic for small, specific behaviors that are commonly needed, but can be complex to implement in a reusable way.

For example:
- Allowing the user to enter a search term, query an array of strings or objects, and receive a list of search results based on fuzzy matches
- Autocompleting text, replacing all or part of the original text with a completed value
- Detecting and reacting to gestures (pan, swipe, double-tap, drag, drag-and-drop, etc.)

UI logic like this is not only useful in its own right, but also when it gets composed into larger, more complicated UI features, which are way easier to build when you're working with the right tools!

To get started with Baleada's UI logic, check out the [Baleada Logic](/docs/logic) package.


:::
## Composition functions (a.k.a. hooks)
:::

"Composition function" is a term coined by the [Vue](https://vuejs.org) team to describe functions that **collocate code** related to the same logical concern. In [React](https://react.org), these functions are called "hooks", but the concept and motivations are virtually the same.

Baleada's composition functions collocate **reactivity** code with **UI logic** code. More specifically, each Baleada composition function retrieves state and methods from one or more of the Baleada Logic tools, then makes all of the state reactive, using tools from the JavaScript framework of your choice.

To get started with Baleada's composition functions, check out the [Baleada Composition](/docs/composition) package.


:::
## Components
:::

In their docs, the [Svelte](https://svelte.dev) team include a fantastic definition of components: "A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together."

The only thing Svelte's definition is missing (other than an Oxford comma 🤓) is a clarification that not all components need to have HTML, CSS, _and_ JavaScript, all together, all of the time. Baleada's components in particular always include HTML, but they omit all CSS so that you can style the component yourself. Some Baleada Components contain JavaScript, but some just contain HTML.

Regardless of what they actually contain, all of Baleada's components are easy to import into any JavaScript-driven site or app, and they add value in different ways.

To get started with Baleada's components, check out these packages:
- [Baleada Icons](/docs/icons)
- [Baleada Prose](/docs/prose)


:::
## Configuration utilities
:::

The build process for JavaScript-driven sites and apps is notoriously complex. Configuration files for build tools like Webpack, Rollup, Tailwind CSS, etc. make things much easier, but, when you're feeling picky about your developer experience, it can still be pretty difficult to get your configuration _just_ right.

Baleada's configuration utilities are functions that you can use to generate configurations and abstract away certain parts of the configuration process. They're opinionated enough to steer you toward a particular developer experience, but still offer customization options of their own.

To get started with Baleada's configuration utilities, check out these packages:
- [Baleada Linear Numeric](/docs/linear-numeric)
- [Baleada Source Transform](/docs/source-transform)
- [Baleada SPA Links](/docs/spa-links)

