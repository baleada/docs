---
title: Setup
tags: Components
publish: true
order: 1
---

Setting up Baleada Prose is a two-part process:
1. Using the exported `createProse` function to create a Vue plugin that will globally register Prose components, among other things
2. Using the exported `useEffects` function in the setup function to make sure certain side effects (e.g. smoothly scrolling your article to an anchored heading) are being performed


:::
## Create your Baleada Prose plugin
:::

Baleada Prose exports a `createProse` function, which sets up Baleada Prose components and returns a Vue plugin.

More specifically, you can use `createProse` to:
- Globally register Baleada Prose components, so that you can freely use them inside of any other component
- Customize the default value for any prop on any component
- Customize default text that appears for certain components
- Treeshake Baleada Prose if you only want to use certain components, and would rather not globally register others
- Install [Pinia](https://pinia.esm.dev) (used by Baleada Prose for sharing state), unless you're already doing that elsewhere in your app
- Connect Baleada Prose to Vue Router, or any other router, so that certain Prose components are notified when page navigation happens

To get started, import `createProse` from Baleada Prose. In many cases, you'll do this in your Vue app's entry file, or wherever you go to register Vue plugins.

:::
```js
import { createApp } from 'vue'
import { createProse, components } from '@baleada/vue-prose'

const app = createApp()

app.use(createProse())
```
:::

In that code example, you'll see that `createProse` was called with no arguments. That will never happen in any real-world use case—instead, you'll pass an optional `options` object as the first and only argument for `createProse`.

Here's a breakdown of the `options` object:

::: ariaLabel="createProse options breakdown" classes="wide-4 wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `createsPinia` | Boolean | no | `false` | <p>Indicates whether or not Baleada Prose should install [Pinia](https://pinia.esm.dev) in your Vue app.</p><p>Baleada Prose depends on Pinia for shared state. If you use Pinia too, and you've already installed Pinia yourself with the [`createPinia`](https://pinia.esm.dev/api/modules/pinia.html#createpinia) function, then leave `createsPinia` as `false`.</p><p>If you're not using Pinia, and you'd rather have Baleada Prose do that installation behind the scenes, set `createsPinia` to `true`.</p> |
| `components` | Array | no | `[]` | <p>An array of functions that return Baleada Prose components for global registration in your Vue app.</p><p>See the [Choose your components](#choose-your-components) section for more guidance.</p> |
| `getFullPath` | Function, `vue-router` | no | `() => window.location.pathname` | <p>A function that gets the full path to the current route location.</p><p>If you're using [Vue Router](https://next.router.vuejs.org/), you should set `getFullPath` to the string `'vue-router'`, instead of a function. Then, Baleada Prose will automatically keep track of [Vue Router's `fullPath`](https://next.router.vuejs.org/api/#fullpath).</p> |
| `propDefaults` | Object | no | See the [Customize prop defaults](#customize-prop-defaults) section | <p>An object that can configure a default value for any prop on any Baleada Prose component.</p><p>See the [Customize prop defaults](#customize-prop-defaults) section for more guidance.</p> |
| `messages` | Object | no | See the [Customize messages](#customize-messages) section | <p>An object that can configure text displayed by certain Baleada Prose components.</p><p>See the [Customize messages](#customize-messages) section for more guidance.</p> |
:::



:::
### Choose your components
:::

`createProse` can globally register Baleada Prose components, so that they can be freely used by any Vue component.

By default, though, `createProse` actually doesn't register any components. To make sure components are registered, you need to import them from Baleada Prose, and pass them to the `components` option.

In most cases, you'll use the exported `components` array to do this:

:::
```js
import { createProse, components } from '@baleada/vue-prose'

// Create a `prose` plugin for your Vue app that
// globally registers every Baleada Prose component
const prose = createProse({ components })
```
:::

This might seem strange, but it's a great way to give you more control over your bundle size. If you know for certain that you won't be using certain components, then don't import them, and your build tool will be able to treeshake the unused code.

Instead of importing the `components` array, you can import individual components:

:::
```js
// In this example, you only want to use Baleada Prose
// components for headings, tables, and blockquotes.
import {
  createProse,
  BaleadaProseHeading,
  BaleadaProseTable,
  BaleadaProseBlockquote,
} from '@baleada/vue-prose'

// Create a `prose` plugin for your Vue app that
// only registers the Baleada Prose components you
// actually want.
const prose = createProse({
  components: [
    BaleadaProseHeading,
    BaleadaProseTable,
    BaleadaProseBlockquote,
  ]
})
```
:::

Keep in mind that Baleada Prose is a pretty small package to begin with, so in most cases, you'll take the happy path and use the `components` array to register all components.


:::
### Customize prop defaults
:::

Baleada Prose is designed to replace every block-level element in Markdown, plus a few block-level elements that Markdown doesn't natively support, with a custom component.

Manually passing props to every single component to customize its behavior would suck! Instead, you can configure Baleada Prose with default values for any prop on any component.

To do this, you'll set an object as the value of the `propDefaults` key of your `createProse` `options` object.

:::
```js
import { createProse, components } from '@baleada/vue-prose'

const prose = createProse({
  components,
  propDefaults: {...},
})
```
:::

The properties of that object should be the short names of the available Baleada Prose components:

::: ariaLabel="Short names by component"
| Component | Short name for the `propDefaults` object |
| --- | --- |
| `BaleadaProseAside` | `aside` |
| `BaleadaProseBlockquote` | `blockquote` |
| `BaleadaProseCodeblock` | `codeblock` |
| `BaleadaProseDetails` | `details` |
| `BaleadaProseHeading` | `heading` |
| `BaleadaProseList` | `list` |
| `BaleadaProseMedia` | `media` |
| `BaleadaProseSection` | `section` |
| `BaleadaProseTable` | `table` |
:::

Each property's value should be an object, whose keys are the component's props, and whose values are the default values you want to set up.

:::
```js
import { createProse, components } from '@baleada/vue-prose'

const prose = createProse({
  components,
  propDefaults: {
    aside: {...},
    heading: {...},
  },
})
```
:::

Your prop defaults will be deeply merged with the default `propDefaults` configuration that Baleada Prose uses, so don't feel the need to configure every prop on every component.

See the [Prop defaults](/docs/prose/prop-defaults) guide for a full breakdown of what props are available for customization, what the default `propDefaults` are, and a more complete and detailed customization example.


:::
### Customize messages
:::

Certain Baleada Prose components display text alongside other UI elements. For example, this `BaleadaProseList` renders a type-to-filter box, with placeholder text:

::: readerCanSearch
- A is for Apple
- B is for Banana
- C is for Captain Jean Luc Picard of the USS Enterprise
- D is for Dog
:::

To customize that placeholder text, and other text rendered by Prose components, you'll set an object as the value of the `messages` key of your `createProse` `options` object.

:::
```js
import { createProse, components } from '@baleada/vue-prose'

const prose = createProse({
  components,
  messages: {...},
})
```
:::

The properties of that object should be the short names of the Baleada Prose components that render text:

::: ariaLabel="Short names by component"
| Component | Short name for the `propDefaults` object |
| --- | --- |
| `BaleadaProseList` | `list` |
| `BaleadaProseTable` | `table` |
:::

Each property's value should be an object, whose keys are the component's props, and whose values are the default values you want to set up.

:::
```js
import { createProse, components } from '@baleada/vue-prose'

const prose = createProse({
  components,
  propDefaults: {
    list: {...},
    table: {...},
  },
})
```
:::

Your messages will be deeply merged with the default `messages` configuration that Baleada Prose uses, so don't feel the need to configure every message on every component.

See the [Messages](/docs/prose/messages) guide for a full breakdown of what messages are available for customization, what the default messages are, and a more complete and detailed customization example.


:::
## Wire up side effects
:::

Two features of Baleada Prose can be considered side effects:
1. Smooth scrolling your article to the top or to an anchored `BaleadaProseHeading` based on URL changes
2. Setting up Baleada Prose's internal shared store to reactively track the route location, which is used by `BaleadaProseBlockquote` to generate [tweet intents](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent) for tweet buttons.

To wire up these side effects, you can call the `useEffects` function exported by Baleada Prose:

:::
```js
import { useEffects } from '@baleada/vue-prose'

useEffects(..)
```
:::

You should call `useEffects` from inside the `setup` function of a Vue component that **renders before the first Prose component** in your component tree.

`App.vue`, for example, is the highest component in the tree of many Vue apps, so you could call it there:

:::
```html
<!-- App.vue -->
<template>...</template>
<script>
import { useEffects } from '@baleada/vue-prose'

export default {
  setup () {
    useEffects(...)
  }
}
</script>
```
:::

However, it doesn't have to be `App.vue`, and it doesn't event have to be an ancestor of your Baleada Prose components. As long as it renders before the first Prose component in your tree, side effects will be wired up correctly.

`useEffects` accepts an `options` object as its only argument. Here's a breakdown of that object:

::: ariaLabel="useEffects options breakdown" classes="wide-4 wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `scrollableContainer` | Ref (HTMLElement) | no | none | <p>A reactive reference to an element that contains your article, i.e., an element that can be scrolled to move to different positions in your article.</p><p>`scrollableContainer` is not required, but if you don't pass it, Baleada Prose's smooth scrolling features won't work.</p> |
| `scrollIntoView` | ScrollIntoViewOptions | no | `{ behavior: 'auto', block: 'start' }` | An object that passes options for the [`Element.scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) function, used under the hood by Baleada Prose for smooth scrolling. |
:::

Here's a more complete example of how to call and configure `useEffects`:

:::
```html
<!-- SomeComponent.vue -->
<template>
  <article ref="article">
    <a-vue-component-that-renders-prose-components />
  </article>
</template>

<script>
import { ref } from 'vue'
import { useEffects } from '@baleada/vue-prose'

export default {
  setup () {
    // Set up the reactive reference
    const article = ref(null)
    
    // Pass the `article` element reference as the
    // scrollable container, and configure smooth scrolling.
    useEffects({
      scrollableContainer: article,
      scrollIntoView: {
        block: 'start',
        behavior: 'smooth',
      }
    })

    return { article }
  }
}
</script>
```
:::

::: type="success"
Congrats! You finished setting up the front end of Baleada Prose.

Explore the **Prose** section of the left sidebar to learn more about Baleada Prose, or head to the [Baleada Prose Container](/docs/prose-container) docs to set up a build toolchain that will convert your Baleada-flavored Markdown into a Vue template with Baleada Prose components.
:::
