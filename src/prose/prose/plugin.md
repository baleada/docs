---
title: Plugin
tags: Components
publish: true
order: 2
---

The Baleada Prose plugin globally registers all Baleada Prose components with your Vue instance. This means you can use any Baleada Prose component inside of any other component without importing it and registering it in the component's `components` option.

:::
```js
import { createApp } from 'vue'
import { plugin as prose } from '@baleada/vue-prose'

const app = createApp()

app.use(prose)
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
