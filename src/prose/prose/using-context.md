---
title: Using context
tags: Components
publish: false
order: 1
---

In many cases, you can start using Baleada Prose components, and everything will just work.

Sometimes, though, you'll want to:
- Scroll your article to different headings automatically, based on changes in the page's URL
- Set custom default values for the props of all instances of a particular component
- Access data about the current article—for example, a list of metadata for all rendered `ProseHeading`s, which you can use to build a table of contents.

To support those needs, Baleada Prose exports a `useContext` composition function.

:::
```js
import { useContext } from '@baleada/vue-prose'
```
:::

The `useContext` function allows you to initialize, read from, and write to the reactive object that serves as a central, shared data store for all Baleada Prose components in your app.


:::
## Initializing context
:::

The first time `useContext` is called, it accepts one optional parameter. That parameter is an object, which `useContext` will use in order to initialize Baleada Prose's context.

Here's a full breakdown of that object:


