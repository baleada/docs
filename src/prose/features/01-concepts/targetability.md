---
title: Targetability
source: extracted/targetability.ts
publish: true
order: 0
---

Baleada Features uses the concept of **targetability** to represent whether the keyboard target element of a component is currently accepting keyboard interactions.

Each component has a keyboard target—the element that its keyboard event listeners are bound to. When the keyboard target is `'targetable'`, it responds to keyboard events normally. When it is `'untargetable'`, all keyboard interaction handling is suppressed.

You can use [element metadata](/docs/features/element-metadata) to tell Baleada Features whether the keyboard target element is targetable or untargetable, and Baleada Features will implement all the appropriate interaction logic.

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
  <!-- Reassign the keyboard target to a separate element -->
  <input :ref="listbox.keyboardTarget.ref({ targetability: 'untargetable' })" />
</template>

<script setup lang="tsx">
import { useListbox } from '@baleada/vue-features'

const listbox = useListbox()
const options = ['Option 1', 'Option 2', 'Option 3']
</script>
```
:::

Depending on your app, targetability might be static or reactive. The example above shows a static targetability, but you can also use reactive data.

Baleada Features will respond to changes in the reactive data, keeping interaction logic in sync with any changes.

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
  <!-- Keyboard target is only active while the popup is open -->
  <input
    :ref="listbox.keyboardTarget.ref({ targetability })"
    @click="isOpen = !isOpen"
  />
</template>

<script setup lang="tsx">
import { ref, computed } from 'vue'
import { useListbox } from '@baleada/vue-features'

const listbox = useListbox()
const options = ['Option 1', 'Option 2', 'Option 3']

const isOpen = ref(false)
const targetability = computed(() => isOpen.value ? 'targetable' : 'untargetable')
</script>
```
:::

This concept is primarily applied in [`useCombobox`](/docs/features/combos/combobox), but can also support any custom use cases you might have, such as a search field for a popup keyboard-navigable grid.
