---
title: createProse
tags: Components
publish: true
order: 1
---

Baleada Prose exports a `createProse` function, which you can use to create a Vue plugin that sets up Baleada Prose.

More specifically, `createProse` allows you to:
- Globally register Baleada Prose components, so that you can freely use them inside of any other component
- Customize the default value for any prop on any component
- Customize default text that appears for certain components
- Treeshake Baleada Prose if you only want to use certain components, and would rather not globally register others
- Create a [Pinia](https://pinia.esm.dev) instance (used by Baleada Prose for sharing state), if you aren't doing that elsewhere in your app
- Connect Baleada Prose to Vue Router, or any other router, so that certain Prose components are aware of when page navigation happens


:::
```js
import { createApp } from 'vue'
import { createProse, components } from '@baleada/vue-prose'

const app = createApp()

app.use(createProse({ components, createsPinia: true }))
```
:::


:::
## Reducing bundle size
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
