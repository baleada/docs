<template lang="md">
# Types of tools
<UpdatedAt timestamp="Sun Sep 22 2019 11:18:40 GMT-0600 (CST)" />

Each tool in the Baleada app-building toolkit falls into one of the following categories:
- <NuxtLink to="#ui-logic">UI logic</NuxtLink>
- <NuxtLink to="#composition-functions-a-k-a-hooks">Composition functions (a.k.a. hooks)</NuxtLink>
- <NuxtLink to="#icon-components">Icon components</NuxtLink>

Each category of tools has its own NPM package that you can install:

| Tool category | NPM package |
| --- | --- |
| UI logic | `@baleada/logic` |
| Composition functions | `@baleada/composition` |
| Icon components | `@baleada/icons` |

If you're itching to install those packages and get started with the tools they offer, you can check out the dedicated guides for <NuxtLink to="/docs/logic">Baleada Logic</NuxtLink>, <NuxtLink to="/docs/composition">Baleada Composition</NuxtLink>, and <NuxtLink to="/docs/icons">Baleada Icons</NuxtLink>.

If you're not quite sure what all these terms mean, feel free to keep reading!

## UI logic

UI logic is JavaScript that powers **user interface behaviors**. Baleada provides UI logic for specific behaviors that are commonly needed, but can be complex to implement in a reusable way.

For example:
- Allowing the user to edit any and all kinds of state (strings, numbers, arrays, objects, etc.), save changes when they're ready, or cancel their changes and revert to the previous version.
- Allowing the user to enter a search term, query an array of strings or objects, and receive a list of search results based on fuzzy matches
- Autocompleting text, replacing all or part of the original text with a completed value

To get started with Baleada's logic, check out the <NuxtLink to="/docs/logic">Baleada Logic</NuxtLink> package.


## Composition functions (a.k.a. hooks)

"Composition function" is a term coined by the [Vue](https://vuejs.org) team to describe functions that **collocate code** related to the same logical concern. In [React](https://react.org), these functions are called "hooks", but the concept is virtually the same.

Baleada's composition functions collocate **reactivity** code with **UI logic** code. More specifically, each Baleada composition function retrieves state and methods from one or more of the Baleada Logic tools, then makes all of the state reactive, using tools from the JavaScript framework of your choice.

To get started with Baleada's composition functions, check out the <NuxtLink to="/docs/composition">Baleada Composition</NuxtLink> package.


## Icon components

There are [tons of reasons](http://www.fullstackradio.com/47) to use **true SVG icons** instead of icon fonts. But copy/pasting SVG markup all over your website or app is tedious, not readable, and not maintainable.

If you're using a component framework like Vue, React, or Svelte, the clear solution is to wrap up your SVG icons in reusable components, so that you get all the benefits of SVGs while writing efficient code.

Baleada's icon components do just that! To get started with them, check out the <NuxtLink to="/docs/icons">Baleada Icons</NuxtLink> package.
</template>

<script>
export default {
  layout: 'article',
  head: () => ({
    title: 'Baleada - Types of tools',
  })
}
</script>
