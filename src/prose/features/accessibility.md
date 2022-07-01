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

In Baleada Features, [interfaces](/docs/features#using-interfaces) and [combos](/docs/features#using-combos) are responsible for implementing essential accessibility features—bare minimum features that are required in every situation for a given UI pattern. Interfaces and combos (which are Vue composables) always accept optional parameters to lightly configure some of that essential behavior.

:::
```ts
import { useListbox } from '@baleada/vue-features'

const listbox = useListbox({
  // With the `useListbox` interface, customize the `orientation`
  // option, and Baleada Features will adjust accordingly.
  //
  // In this case, that means navigating the listbox using left and
  // right arrow keys, plus setting the `aria-orientation` attribute 
  // to 'horizontal' on the root element.
  orientation: 'horizontal',
  
  // Another example: use the `selectsOnFocus` option to determine
  // whether options get selected as soon as they receive keyboard\
  // focus, or whether the end user actually has to use a mouse,
  // touch, spacebar, or enter key to select the focused option.
  selectsOnFocus: true,
}),
```
:::

The best short summary I've seen of what is considered "essential" is [a checklist](https://twitter.com/devongovett/status/1542546932840534016?s=20&t=f8mdjeFBkZVjp-bAYHXYWg) from Devon Govett, one of the authors of the incredibly impressive [React Aria](https://react-spectrum.adobe.com/react-aria/index.html) library, one of Baleada Features' biggest inspirations.

In Baleada Features, I aim to check every box on that checklist, except for the markup and style related points (Baleada Features is logic-only and ships no markup or styles). Here's the abridged relevant list:

**Interactions:**
- Works with mouse, touch, and keyboard input
- Hover, active, and focus states as appropriate for device
- Predictable focus management
- Adapt UI and behavior for input type

**Accessibility:**
- Usable (tested) with multiple screen readers on various devices (e.g. mobile/desktop)

**Internationalization:**
- International dates, numbers, collation, etc.
- Localized strings, or the ability to provide them
- Right-to-left layout support
- Avoid locale-specific assumptions

When working with Baleada Features, you'll find that ARIA roles and attributes, keyboard interactions, and pointer interactions are all managed for you, closely following [ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/).

You'll also find tons of accessibility-related configuration options, and you'll always have access to functions and methods for highly specialized side effects (like programmatically selecting the next non-disabled listbox option). These tools allow you to craft custom, accessible user experiences, tailored to your project in a way that no general purpose library could or should do for you.

Accessibility is great UX, and it's one of the main motivations driving the entire Baleada Features project.


:::
## Accessibility extensions
:::

All of Baleada Features' [extensions](/docs/features#using-extensions) return objects, and some of those objects contain [element API objects](/docs/features/shared/element-api) that can help you enhance the accessibility of your UI.

For example, imagine you're using the [`useTextbox`](/docs/features/interfaces/textbox) interface to enhance an HTML input in your app. Here's how you would start:

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

<script setup>
import { useTextbox } from '@baleada/vue-features'

const textbox = useTextbox(),
</script>
```
:::

That's a good start, but assistive technology won't be able to tell the user anything about your `input`, other than its type. You'll want to add an accessible label, so that the user knows exactly what information they're supposed to type in.

One great way to do this is with a `label` element. If the `label` element has a `for` attribute that contains the unique ID of the `input`, assistive tech will read the contents of the `label` when describing the `input`.

Managing unique IDs for all your inputs and matching those IDs up with labels is tedious work, so the [`useLabel`](/docs/features/extensions/label) **extension** is designed to handle this for you:

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

<script setup>
import { useTextbox, useLabel } from '@baleada/vue-features'

const textbox = useTextbox()

// We can pass our `textbox` object directly into the `useLabel`
// extension. The extension knows that it should interact with 
// `textbox.root` when setting up accessibility features.
const label = useLabel(textbox)
</script>
```
:::

Baleada Features offers several accessibility extensions that follow this same pattern, automating the tedious parts of accessibility engineering, and letting you focus on more bespoke work:
- [`useLabel`](/docs/features/extensions/label)
- [`useDescription`](/docs/features/extensions/description)
- [`useDetails`](/docs/features/extensions/details)
- [`useErrorMessage`](/docs/features/extensions/error-message)
