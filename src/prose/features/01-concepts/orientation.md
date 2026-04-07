---
title: Orientation
source: extracted/orientation.ts
publish: true
order: 0
---

Baleada Features uses the concept of **orientation** to represent the axis along which a component's keyboard navigation operates.

When a component is `'vertical'`, it uses the up and down arrow keys to navigate between items. When a component is `'horizontal'`, it uses the left and right arrow keys instead.

Orientation also determines the value of the `aria-orientation` attribute on the component's root element, which communicates the navigation direction to assistive technologies.

You pass orientation as an option to composables that support it, including `useListbox`, `useTablist`, `useMenubar`, `useGrid`, `useMenu`, and `useSelect`.

:::
```html
<template>
  <div :ref="listbox.root.ref()">
    <div
      v-for="(option, index) in options"
      :key="option"
      :ref="listbox.options.ref(index)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useListbox } from '@baleada/vue-features'

// Horizontal listbox—navigate with left and right arrow keys
const listbox = useListbox({ orientation: 'horizontal' })
const options = ['Option 1', 'Option 2', 'Option 3']
</script>
```
:::

Each composable has a default orientation that matches its most common usage. `useListbox`, `useMenubar`, `useMenu`, `useGrid`, and `useSelect` default to `'vertical'`. `useTablist` defaults to `'horizontal'`.
