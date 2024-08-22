---
title: Ability
source: extracted/ability.ts
publish: true
order: 0
---

Baleada Features uses the concept of **ability** to represent the enabled/disabled state of a form control, or one of the descendants of a form control (e.g. an option inside a listbox).

You can use [element metadata](/docs/features/element-metadata) to tell Baleada Features whether an element is enabled or disabled, and Baleada Features will implement all the appropriate interaction logic and accessibility features.

:::
```html
<template>
  <input :ref="textbox.root.ref({ ability: 'disabled' })" />
  
  <div :ref="listbox.root.ref({ ability: 'enabled' })">
    <div 
      v-for="({ label, ability }, index) in listboxOptions"
      :key="label"
      :ref="listbox.options.ref(index, { ability })"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { useTextbox, useListbox } from '@baleada/vue-features'

const textbox = useTextbox()
const listbox = useListbox()

const listboxOptions = [
  { label: 'Option 1', ability: 'disabled' },
  { label: 'Option 2', ability: 'enabled' },
]
</script>
```
:::

Depending on your app, ability might be static or reactive. The example above shows a static ability, but you can also use reactive data.

Baleada Features will respond to changes in the reactive data, keeping interaction logic and accessibility features in sync with any changes.

:::
```html
<template>
  <input :ref="textbox.root.ref({ ability })" />
  
  <div :ref="listbox.root.ref({ ability })">
    <div 
      v-for="(option, index) in listboxOptions"
      :key="option"
      :ref="listbox.options.ref(
        index,
        { ability: listboxOptionAbilities[index] }
      )"
    >
      {{ option }}
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { useTextbox, useListbox } from '@baleada/vue-features'

const textbox = useTextbox()
const listbox = useListbox()

const ability = ref('disabled')

const listboxOptions = [
  'Option 1',
  'Option 2',
]

const listboxOptionAbilities = ref([
  'disabled',
  'enabled',
])
</script>
```
:::
