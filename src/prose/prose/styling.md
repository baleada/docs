---
title: Styling
tags: Components
publish: true
order: 4
---

Baleada Prose intentionally ships no styles, but it _does_ ship several features that make styling easier.


:::
## Components have consistent classes
:::

Each component's root element has a `.baleada-prose-[component]` class, where `[component]` is the name of the component, lowercased.

::: type="info"
Inspect this element in devtools! Its root element has a `.baleada-prose-aside` class.
:::

In each component, the content you actually write is inserted into an element with a `.baleada-prose-contents` class.

::: type="info"
In devtools, you'll see that this text renders as a `<p>` tag. It slots into a `<section>` tag with a `.baleada-prose-contents` class, so you can target `.baleada-prose-aside .baleada-prose-contents` to style anything in here.
:::

::: type="warning"
In almost every component with `.baleada-prose-contents`, your content is the _only_ thing inside the `.baleada-prose-contents` element.

The only exception is `BaleadaProseCodeblock`, specifically when the `showsLineNumbers` or `showsLang` props are true. Each of those props causes an additional `<pre><code>` to render inside the `.baleada-prose-contents` element.

[See the `BaleadaProseCodeblock` docs](/docs/prose/components/codeblock) for the complete markup outline.
:::

Finally, each component's documentation includes an outline of the complete markup structure. You could always use devtools to inspect markup structure, but hopefully those outlines make it easier to write effective CSS selectors.


:::
## Components accept additional classes
:::

Each component has a `classes` prop, and you can pass a String to that prop to add additional classes

:::
```html
<template>
  <BaleadaProseAside :classes="bg-blue-100 text-blue-900">
    ...
  </BaleadaProseAside>
</template>
```
:::

This is super useful when you need to add a class to a particular Prose component inside a Markdown file:

:::
```md
    ::: type=info classes="bg-blue-100 text-blue-900"
    I'm a blue ProseAside.
    :::
```
:::


:::
### You can set default classes for any component
:::

When you call Baleada Prose's [`createProse`](/docs/prose/setup/#create-your-baleada-prose-plugin) function to create your Vue plugin, you can pass options to customize default values for props.

:::
```js
import { createProse, components } from '@baleada/vue-prose'

const prosePlugin = createProse({
  components,

  // Use the `propDefaults` object to set default values
  // for the `classes` prop on any given component.
  propDefaults: {
    heading: {
      // Every `BaleadaProseHeading` will have `font-600 font-display`
      // added to the class list of its root element.
      classes: "font-600 font-display",
    },
    codeblock: {
      classes: "syntax-theme-dark",
    },
    table: {
      classes: "border border-gray-200",
    },
  }
})
```
:::

See the [Prop defaults](/docs/prose/prop-defaults) guide for more info.
