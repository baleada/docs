---
title: Accessibility
tags: Composables
publish: true
order: 2
---

Comprehensive, flexible accessibility is one of the core motivations behind Baleada Features.

The accessibility tools built into Baleada Features can be divided into two categories:
1. **Essential accessibility**: bare minimum features that are required in every situation for a given UI pattern
2. **Accessibility extensions**: features that should only be used in certain situations for a given UI pattern, but not every situation

The rest of this guide explains those tools in more technical detail.


:::
## Essential Accessibility
:::

::: type="danger"
WIP
:::


:::
## Accessibility extensions
:::

All of Baleada Features' [interfaces](/docs/features#using-functions) return objects, and some of those objects contain [single element API objects](/docs/features/element-api) that can help you enhance the accessibility of your UI.

For example, imagine you're using the `useTextbox` function to enhance an HTML input in your app. Here's how you would start:

:::
```html
<template>
  <!--
    Here, we bind `textbox.root.ref` to our HTML input,
    so that `useTextbox` can enhance it with additional
    features.
  -->
  <input
    :ref="textbox.root.ref"
    type="text"
  />
</template>

<script lang="js">
import { useTextbox } from '@baleada/vue-features'

export default {
  setup () {
    return {
      textbox: useTextbox(),
    }
  }
}
</script>
```
:::

That's a good start, but assistive technology won't be able to tell the user anything about your `input`, other than its type. You'll want to add an accessible label, so that the user knows exactly what information they're supposed to type in.

One great way to do this is with a `label` element. If the `label` element has a `for` attribute that contains the unique ID of the `input`, assistive tech will read the contents of the `label` when describing the `input`.

Managing unique IDs for all your inputs and matching those IDs up with labels is tedious work, so the `useLabel` **extension** is designed to handle this for you:

:::
```html
<template>
  <input
    :ref="textbox.root.ref"
    type="text"
  />
  <!--
    Here, we take advantage of the `label.root` property in
    useLabel's return object.
    
    `label.root` is a single element API object. This means it
    has a `ref` property, which you can bind to the `ref` attribute
    on an element to give `useLabel` access to it.
    
    We'll bind `label.root.ref` to our `label`. This
    tells `useLabel` that it should assign a unique ID
    to your `input` (the `root` of your `textbox`), then
    set the same ID as the value of the `for` attribute
    on your `label`.
  -->
  <label :ref="label.root.ref">
    What's your favorite color?
  </label>
  <!-- 
    Also good to know: if you've already manually assigned a 
    unique ID to the `input`, `useTextbox` will respect that
    choice, and use your custom ID for the `for` attribute
    on the `label`.

    Tedious work, automated away!
  -->
</template>

<script lang="js">
import { useTextbox, useLabel } from '@baleada/vue-features'

export default {
  setup () {
    const textbox = useTextbox(),
          // We can pass our `textbox` object directly into
          // the `useLabel` extension. The extension knows
          // that it should interact with `textbox.root` when
          // setting up accessibility features.
          label = useLabel(textbox)
    
    return { textbox, label }
  }
}
</script>
```
:::

Baleada Features offers several accessibility extensions that follow this same pattern, automating the tedious parts of accessibility engineering, and letting you focus on more bespoke work:
- [`useLabel`](/docs/features/extensions/label)
- [`useDescription`](/docs/features/extensions/description)
- [`useDetails`](/docs/features/extensions/details)
- [`useErrorMessage`](/docs/features/extensions/error-message)


<!-- ::: ariaLabel="Properties of some functions' returned objects"
| Property | Description |
| --- | --- |
| `label` | <p>If an element serves as the accessible label for your textbox, `label.ref` should be bound to that element.</p><p>Binding `label.ref` will assign a unique ID to your accessible label and set that ID as the `aria-labelledby` of the labelled element. In some cases, it will also assign a unique ID to the labelled element, and set that ID as the `for` attribute of your accessible label.</p> |
| `errorMessage` | <p>If an element serves as the accessible error message when invalid data has been entered into a form field, `errorMessage.ref` should be bound to that element.</p><p>Binding `errorMessage.ref` will assign a unique ID to your accessible error message and set that ID as the `aria-errormessage` of the element that contains invalid data.</p> |
| `description` | <p>If an element serves as the accessible description for your textbox, `description.ref` should be bound to that element.</p><p>Binding `description.ref` will assign a unique ID to your accessible description and set that ID as the `aria-describedby` of the described element.</p> |
| `details` | <p>If an element serves as the accessible details for your textbox, `details.ref` should be bound to that element.</p><p>Binding `details.ref` will assign a unique ID to your accessible details and set that ID as the `aria-details` of the detailed element.</p> |
::: -->
