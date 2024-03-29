---
title: Description
tags: Composables
publish: true
order: 0
---

`useDescription` is an extension that connects an element in your user interface (e.g. an `input`) to the element that serves as its accessible description.

In other words, `useDescription` does the following:
- Generates a unique ID for the element that serves as your accessible description, or retrieves a unique ID that you've already assigned to that element
- Assigns the unique ID to the [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.2/#aria-describedby) property on your element


:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseDescription.vue)

<ExampleUseDescription class="with-mt" />


:::
## Create a description
:::

To wire up an accessible description, call the `useDescription` function, which requires one parameter:

::: ariaDescription="useDescription parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `extendable` | Interface, Ref (HTMLElement) | yes | <p>The return object from a Baleada Features [interface](/docs/features#using-functions), or a reactive reference to an HTML element.</p><p>If you pass an interface object, `useDescription` will set the `aria-describedby` of the `root` element.</p> |
:::

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { useTextbox, useDescription } from '@baleada/vue-features'

const textbox = useTextbox(),
      description = useDescription(textbox[, options])
</script>
```
:::


:::
## Use your description
:::

`useDescription` returns `description`—an object with tools you can use to wire up an accessible description.

Here's a breakdown of that object:

::: ariaDescription="size breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `root` | Object | <p>A [single element API object](/docs/features/shared/element-api).</p><p>`root.ref` should be bound to the element that serves as your accessible description.</p> |
| `id` | Ref (String) | A reactive reference to the unique ID generated by `useDescription`, or the existing ID of your description element if available. |
:::


Here's a more complete example of how to use `useDescription` with any DOM element:

:::
```html
<template>
  <input type="checkbox" ref="input" />
  <!--
    This description needs to be properly connected to the checkbox
    so that assistive technology understands their relationship.

    To make that work, we'll bind `description.root.ref` to the element's
    `ref` attribute.
  -->
  <p :ref="description.root.ref">Lorem ipsum...</p>
</template>

<script setup>
import { ref } from 'vue'
import { useDescription } from '@baleada/vue-features'

// Here, we'll set up a template ref for our input
const input = ref(null)

// Then, we'll pass that reference to `useDescription`.
//
// With this done, assistive tech will understand
// that it should read our description when describing
// the checkbox.
const description = useDescription(input)
</script>
```
:::
