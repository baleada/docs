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

In that code example, you'll see that `createProse` was called with no arguments. That will never happen in any real-world use case—instead, you'll pass an optional `options` argument as the first and only argument for `createProse`.

Here's a breakdown of the `options` object:

::: ariaLabel="useTablist options" classes="wide-4 wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `createsPinia` | Boolean | No | `false` | <p>Indicates whether or not Baleada Prose should install [Pinia](https://pinia.esm.dev) in your Vue app.</p><p>Baleada Prose depends on Pinia for shared state. If you use Pinia too, and you've already installed Pinia yourself with the [`createPinia`](https://pinia.esm.dev/api/modules/pinia.html#createpinia) function, then leave `createsPinia` as `false`.</p><p>If you're not using Pinia, and you'd rather have Baleada Prose do that installation behind the scenes, set `createsPinia` to `true`.</p> |
| `components` | Array | No | `[]` | <p>An array of functions that return Baleada Prose components for global registration in your Vue app.</p><p>See the [Choose your components](#choose-your-components) section for more guidance.</p> |
| getFullPath | Function, `vue-router` | No | `() => window.location.pathname` | <p>A function that gets the full path to the current route location.</p><p>If you're using [Vue Router](https://next.router.vuejs.org/), you should set `getFullPath` to the string `'vue-router'`, instead of a function. Then, Baleada Prose will automatically keep track of [Vue Router's `fullPath`](https://next.router.vuejs.org/api/#fullpath).</p> |
| propDefaults |
| messages |
:::






:::
## Choose your components
:::




If you import Baleada Prose's default plugin, **every** Baleada Prose component will be bundled with your app code, regardless of whether or not the component is actually used in any of your articles.

Baleada Prose is a pretty small package to begin with, but if you know for certain that you won't be using certain components, and you want to make your bundle even smaller, you can import and globally register only specific components.

All Baleada Prose components are exported from the package, so here is the workflow for registering them:

:::
```js
import { createApp } from 'vue'
import {
  ProseAside,
  ProseBlockquote,
  ProseDetails,
  ProseCodeblock
} from '@baleada/vue-prose'

const app = createApp()

[ProseAside, ProseBlockquote, ProseDetails, ProseCodeblock].forEach(component => {
  // All Baleada Prose components store their name in the
  // Vue component's `name` option.
  app.component(component.name, component)
})
```
:::
