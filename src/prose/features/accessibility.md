---
title: Accessibility
tags: Composition functions
publish: true
order: 2
---


:::
## Core accesibility features
:::

::: type="danger"
WIP
:::


:::
## As-needed accessibility features
:::

All of Baleada Features' functions (listed in the **Functions** section under the **Features** heading in the left sidebar) return objects, and some of those objects contain [single element API objects](/docs/features/element-api) that can help you enhance the accessibility of your UI.

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

Managing unique IDs for all your inputs and matching those IDs up with labels is tedious work, so the `useTextbox` function is designed to handle this for you:

:::
```html
<template>
  <input
    :ref="textbox.root.ref"
    type="text"
  />
  <!--
    Here, we take advantage of the `textbox.label` property in
    useTextbox's return object.
    
    `textbox.label` is a single element API object. This means it
    has a `ref` property, which you can bind to the `ref` attribute
    on an element to give `useTextbox` access to it.
    
    We'll bind `textbox.label.ref` to our `label`. This
    tells `useTextbox` that it should assign a unique ID
    to your `input`, then set the same ID as the value of
    the `for` attribute on your `label`.
  -->
  <label :ref="textbox.label.ref">
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

The functions in Baleada Features apply this same pattern to all kinds of content that improves accessibility. The important takeaways are:
- Certain properties in the return objects of Baleada Features functions contain [single element API](/docs/features/element-api) objects.
- Those objects have a `ref` property, which you can bind to the `ref` attribute of an HTML element.
- Baleada Features will assign values to ARIA attributes on elements that have a `ref` bound to them. Things like `aria-labelledby`, `aria-errormessage`, etc. will all be handled for you automatically.
- These single element API objects should only be used when you need them, and you have a specific accessibility goal in mind (for example, providing an accessible error message when invalid data has been entered into a textbox).
- Code snippets are provided in the docs of other Baleada Features functions to show how these single element APIs can be used to achieve accessibility goals.

In the docs for each function, you'll find a list of properties included in the return object for accessibility purposes. For example, `useTextbox`'s return object includes `label`, `errorMessage`, `description`, and `details` properties, all of which contain single element API objects.

Here's a breakdown of the properties that return single element API objects, and basic descriptions of how and why to use those objects:

::: ariaLabel="Properties of some functions' returned objects"
| Property | Description |
| --- | --- |
| `label` | <p>If an element serves as the accessible label for your textbox, `label.ref` should be bound to that element.</p><p>Binding `label.ref` will assign a unique ID to your accessible label and set that ID as the `aria-labelledby` of the labelled element. In some cases, it will also assign a unique ID to the labelled element, and set that ID as the `for` attribute of your accessible label.</p> |
| `errorMessage` | <p>If an element serves as the accessible error message when invalid data has been entered into a form field, `errorMessage.ref` should be bound to that element.</p><p>Binding `errorMessage.ref` will assign a unique ID to your accessible error message and set that ID as the `aria-errormessage` of the element that contains invalid data.</p> |
| `description` | <p>If an element serves as the accessible description for your textbox, `description.ref` should be bound to that element.</p><p>Binding `description.ref` will assign a unique ID to your accessible description and set that ID as the `aria-describedby` of the described element.</p> |
| `details` | <p>If an element serves as the accessible details for your textbox, `details.ref` should be bound to that element.</p><p>Binding `details.ref` will assign a unique ID to your accessible details and set that ID as the `aria-details` of the detailed element.</p> |
:::

You won't need to use every single one of these properties in every part of your UI. For example, if you're using `label` to connect an accessible label, there aren't many use cases where you'd also need to use `description` and `details`.

Be aware that if you don't use every property, all the other features of a given function will still work smoothly. These properties are specifically designed to be used as-needed, and if you don't use them, there won't be any negative side effects on other features.
