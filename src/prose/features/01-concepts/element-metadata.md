---
title: Element metadata
publish: true
order: 0
---

Baleada Features implements an **element metadata** system that allows you to associate metadata—like accessible labels, enabled/disabled state, and valid/invalid state—with elements in your UI.

Element metadata is an object that gets passed as an argument to function ref getters from the [element API](/docs/features/element-api).

For single elements, metadata is the first and only argument:

:::
```html
<template>
  <div :ref="elementApi.ref({ ... })">
</template>

<script setup lang="tsx">
import { useElementApi } from '@baleada/vue-features'
const elementApi = useElementApi({
  defaultMeta: { ... }
})
</script>
```
:::

For lists, metadata is the second argument, passed after `index`:

:::
```html
<template>
  <div
    v-for="(item, index) in items"
    :key="item"
    :ref="listApi.ref(index, { ... })"
  >
</template>

<script setup lang="tsx">
import { useListApi } from '@baleada/vue-features'

const items = ref([...])
const listApi = useListApi({
  defaultMeta: { ... }
})
</script>
```
:::

For planes, metadata is the second argument, passed after `coordinates`:

:::
```html
<template>
  <div
    v-for="(row, rowIndex) in rows"
    :key="row"
  >
    <div
      v-for="(cell, columnIndex) in row"
      :key="cell"
      :ref="planeApi.ref(
        { row: rowIndex, column: columnIndex },
        { ... }
      )"
    >
  </div>
</template>

<script setup lang="tsx">
import { usePlaneApi } from '@baleada/vue-features'

const rows = ref([...])

const planeApi = usePlaneApi({
  defaultMeta: { ... }
})
</script>
```
:::

Metadata passed in these objects can be **static** or **reactive**. If metadata is reactive, Baleada Features' internals will respond to changes in the reactive data, keeping interaction logic and accessibility features in sync with any changes.

The exact properties and values that are supported in metadata objects vary for each of Baleada Features' [interfaces](/docs/features/interfaces). The documentation for each interface will detail the metadata properties that are supported.


:::
## Examples
:::

Below are some practical examples of the metadata system.


:::
### Textbox metadata
:::

:::
```html
<template>
  <!--
    Metadata can be static or reactive.

    In this case, the label is static, while validity
    and the error message ID are reactive.

    Internally, Baleada Features will use this metadata
    to bind the `aria-label`, `aria-description`, `aria-invalid`,
    `aria-disabled`, and `aria-describedby` attributes, and
    to set up UI logic for various interactions.
    
    The values of `aria-invalid`, `aria-disabled`, and
    `aria-describedby` will update reactively when Vue
    detects changes in the reactive data.
  -->
  <input
    :ref="textbox.root.ref({
      label: 'What\'s your favorite color?',
      description: 'This field is required.',
      validity,
      ability,
      errorMessage: errorMessage.id.value,
    })"
  />
  <p
    :ref="errorMessage.ref()"
    v-if="validity === 'invalid'"
  >
    This field is required.
  </p>
</template>

<script setup lang="tsx">
import { useTextbox, useElementApi } from '@baleada/vue-features'

const textbox = useTextbox()
const errorMessage = useElementApi({ identifies: true })

const validity = computed(() => (
  textbox.text.string
    ? 'valid'
    : 'invalid'
))

const props = defineProps<{
  formStatus: boolean,
}>()
const ability = computed(() => (
  props.formStatus === 'editable'
    ? 'enabled'
    : 'disabled'
))
</script>
```
:::


:::
### Listbox metadata
:::

:::
```html
<template>
  <!--
  In this example, we're passing metadata to `listbox.root`
  to set a static label and description, and a reactive
  enabled/disabled state.
  -->
  <div
    :ref="listbox.root.ref({
      label: 'Select donation recipient',
      description: 'This field is required.',
      ability,
    })"
  >
    <!-- 
    For each option in the listbox, we're setting a label and
    description, and also disabling any options that have
    already received more than 10 donations.

    We're also using the `candidate` property of metadata to tell
    Baleada Features that the typeahead for this listbox should
    only match against the `name` property of each organization,
    instead of scanning the entire description.
    -->
    <div
      v-for="({ name, why, donations }, index) in organizations"
      :key="name"
      :ref="listbox.options.ref(
        index,
        {
          label: name,
          description: why.join(' '),
          ability: donations.length > 10 ? 'disabled' : 'enabled',
          candidate: name,
        }
      )"
    >
      <h2>{{ name }}</h2>
      <p v-for="p in why" :key="p">{{ p }}</p>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useListbox } from '@baleada/vue-features'
import { organizations } from '@alexvipond/mulago'

const listbox = useListbox()

const props = defineProps<{
  formStatus: boolean,
}>()
const ability = computed(() => (
  props.formStatus === 'editable'
    ? 'enabled'
    : 'disabled'
))
</script>
```
:::
