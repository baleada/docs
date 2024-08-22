---
title: Validity
source: extracted/validity.ts
publish: true
order: 0
---

Baleada Features uses the concept of **validity** to represent the valid/invalid state of a form control.

You can use [element metadata](/docs/features/element-metadata) to tell Baleada Features whether an element is valid or invalid, and Baleada Features will implement all the appropriate interaction logic and accessibility features (e.g. announcing error messages to screen readers).

:::
```html
<template>
  <input
    :ref="textbox.root.ref({
      validity: 'invalid',
      errorMessage: errorMessage.id.value,
    })"
  />
  <p :ref="errorMessage.ref()">
    This field is required.
  </p>
</template>

<script setup lang="tsx">
import { useTextbox, useElementApi } from '@baleada/vue-features'

const textbox = useTextbox()
const errorMessage = useElementApi({ identifies: true })
</script>
```
:::

Depending on your app, validity might be static or reactive. The example above shows a static validity, but you can also use reactive data.

Baleada Features will respond to changes in the reactive data, keeping interaction logic and accessibility features in sync with any changes.

:::
```html
<template>
  <input
    :ref="textbox.root.ref({
      validity,
      errorMessage: errorMessage.id.value,
    })"
  />
  <p :ref="errorMessage.ref()" v-if="validity === 'invalid'">
    This field is required.
  </p>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { useTextbox, useElementApi } from '@baleada/vue-features'

const textbox = useTextbox()
const errorMessage = useElementApi({ identifies: true })

const validity = computed(() => (
  textbox.text.string
    ? 'valid'
    : 'invalid'
))
</script>
```
:::
