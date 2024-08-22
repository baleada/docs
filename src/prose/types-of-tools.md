---
title: Types of tools
publish: true
order: 1
---

Each tool in the Baleada app-building toolkit falls into one of the following categories:
- [UI logic](#ui-logic)
- [Server logic](#backend-logic)
- [Composables (a.k.a. hooks)](#composables-a-k-a-hooks)
- [Components](#components)
- [Configuration utilities](#configuration-utilities)

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


:::
## Server logic
:::

Server logic is code that powers **server-side behaviors**. Baleada provides server logic for small, specific behaviors that are commonly needed, but can be complex to implement in a reusable way.

For example:
- Tools to model relationships as an edge list
- TBD...still exploring this space!


:::
## Composables (a.k.a. hooks)
:::

"Composable" is a term coined by the [Vue](https://vuejs.org) team to describe functions that use the Vue Composition API and **colocate code** related to the same logical concern.

In [React](https://react.org), these functions are called "hooks", but the concept and motivations are virtually the same.

Baleada's definition of a "composable" is just a little stricter. All composables in Baleada meet these conditions:
- They internally use reactivity APIs and/or perform side effects during a component lifecycle
- They have a return value that includes reactive state
- Their names are always camelCased, starting with `use` and ending with a noun


:::
## Components
:::

In their docs, the [Svelte](https://svelte.dev) team include a great definition of components: "A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together."

The only thing Svelte's definition is missing (other than an Oxford comma 🤓) is a clarification that not all components need to have HTML, CSS, _and_ JavaScript, all together, all of the time. 

Baleada's components always include HTML, but they omit all CSS so that you can style the component yourself. Many Baleada Components contain JavaScript, but some just contain HTML.

Currently, all Baleada components are written to work with Vue 3.


:::
## Configuration utilities
:::

The build process for JavaScript-driven sites and apps is notoriously complex. Configuration files for tools like Vite, Rollup, Tailwind CSS, etc. make build customization much easier, but, when you're feeling picky about your developer experience, it can still be pretty difficult to get your configuration _just_ right.

Baleada's configuration utilities are functions that you can use to generate configurations and abstract away certain parts of the configuration process. They're opinionated enough to steer you toward a particular developer experience, but still offer customization options of their own.
