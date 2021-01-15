---
title: What is Baleada Features?
tags: Composition functions
publish: true
order: 0
---

Baleada Features is a collection of stateless composition functions that implement the UI logic for features and widgets like tablists, comboboxes, carousels, etc.

Baleada Features doesn't include any markup or styles. Instead, it combines composition functions from [Baleada Composition](/docs/composition) with reactivity frameworks to create JavaScript-only layers of logic, which you can use directly in your app, or to power your own custom component library, with your own custom markup and styles.


:::
## Installation
:::

Right now, only the [Vue](https://v3.vuejs.org) implementation of Baleada Features is available:

:::
```bash
npm i @baleada/vue-features
```
:::


:::
## Available features
:::

See the **Functions** section under the **Features** heading in the left sidebar for a complete list of available features.


:::
## Affordances
:::

Baleada Features' Vue implementation also exposes an **affordances** export:

:::
```js
import * as affordances from @baleada/vue-features
```
:::

This export includes functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside composition functions.

Vue templates, for example, allow you to easily bind static reactive data to the attributes of any element:

:::
```html
<!-- MyComponent.vue -->
<template>
  <div
    role="tab"
    :aria-selected="isSelected"
    :class="isSelected ? 'border-blue-600' : 'border-gray-200'"
  >
    ...
  </div>
</template>
```
:::

Inside a composition function, it's not obvious how to properly recreate this behavior, but Baleada Features' `useBindings` affordance makes it a cinch:

:::
```js
// useMyFeature.js
export default function useMyFeature () {
  const el = ref(null),
        isSelected = computed(...)

  useBindings({
    target: el,
    bindings: {
      // useBindings can assign static values
      role: 'tab',
      // But it really shines with reactive values
      ariaSelected: isSelected,
      class: computed(() => 
        isSelected.value 
          ? 'border-blue-600' 
          : 'border-gray-200'
      ),
    }
  })

  // This returned ref would be attached to an element
  // in the Vue template
  return el
}
```
:::

These functions are primarily used internally as utility functions by Baleada Features. However, they are exported publicly because they are useful for authors who want to write their own Vue composition functions, following some of the style and patterns of Baleada Features.


:::
### Available affordances
:::

See the **Affordances** section under the **Features** heading in the left sidebar for a complete list of available affordances.

