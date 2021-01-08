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

Each component's root element has a `.baleada-prose-[component]` class, where `[component]` is the name of the component, lowercased and with the word `Prose` removed.

::: type="info"
Inspect this element in devtools! Its root element has a `.baleada-prose-aside` class.
:::

In each component, the content you actually write is inserted into an element with a `.baleada-prose-contents` class. The only exception is `ProseArticle`, which only has the top level `.baleada-prose-article` element, with your content inside.

::: type="info"
In devtools, you'll see that this text renders as a `<p>` tag. It slots into a `<section>` tag with a `.baleada-prose-contents` class, so you can target `.baleada-prose-aside .baleada-prose-contents` to style anything in here.
:::

::: type="warning"
In almost every component with `.baleada-prose-contents` (i.e., every component except `ProseArticle`), your content is the _only_ thing inside the `.baleada-prose-contents` element.

The only exception is `ProseCodeblock`, specifically when the `hasLineNumbers` or `hasLang` props are true. Each of those props causes an additional `<pre><code>` to render inside the `.baleada-prose-contents` element.

See the [`ProseCodeblock` docs](/docs/prose/components/codeblock) for the complete markup outline.
:::

Finally, each component's documentation includes an outline of the complete markup structure. You could always use devtools to inspect markup structure, but hopefully those outlines make it easier to write effective CSS selectors.


:::
## Components accept additional classes
:::

Each component has a `classes` prop, and you can pass a String to that prop to add additional classes

:::
```html
<template>
  <ProseAside :classes="bg-blue-100 text-blue-900">
    ...
  </ProseAside>
</template>
```
:::

This isn't particularly useful when you're writing the component directly, since Vue will pass any normal `class` value down to the root element anyway.

It's more useful when you need to add a class to a particular Prose component inside a Markdown file:

:::
```md
    ::: type=info classes="bg-blue-100 text-blue-900"
    I'm a blue ProseAside.
    :::
```
:::


:::
### `useContext` can set default classes
:::

When you call Baleada Prose's `useContext` composition function for the first time (and before any other Prose components are mounted), you can pass an object as the first parameter, and the object will initialize Prose's context with certain data.

See the [Using context](/docs/prose/using-context) guide for full details on initializing context, but for styling purposes, be aware that you can use the `defaultProps` property of your context initialization object to set default classes for any component:

:::
```js
useContext({
  defaultProps: {
    heading: {
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
