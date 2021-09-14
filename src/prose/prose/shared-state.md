---
title: Shared state
tags: Components
publish: true
order: 3
---

Baleada Prose components use a [Pinia](https://pinia.esm.dev/) store to share some state that you might find useful:
- A list of metadata for all currently rendered `BaleadaProseHeading` components. You can use this to build a reactive table of contents.
- A list of metadata for all currently rendered `BaleadaProseMedia` components. You can use this to build a reactive media carousel for an article.

To support those use cases, Baleada Prose exports a `useStore` composition function that you can use to access this data:

:::
```js
import { useStore } from '@baleada/vue-prose'

// Like all Pinia stores, the `useStore` function returns
// a reactive object with shared state.
const store = useStore()

// There are a few other things in this store, but
// `headings` and `media` are the useful ones.
store.headings // -> Array of heading metadata
store.media // -> Array of media metadata
```
:::

Each item in `store.headings` has the following structure:

::: ariaLabel="heading metadata breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `level` | Number | The heading's level number—for example, an `<h1>` would produce `level: 1`. |
| `slug` | String | A slug of the heading's text, created by [Baleada Logic's `createSlug` pipe](/docs/logic/pipes/createSlug). This slug also becomes the HTML `id` of the heading, so you can use it to create anchored links. |
| `text` | String | The text content of the rendered HTML inside the heading. |
:::

Each item in `store.media` has the following structure:

::: ariaLabel="media metadata breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `type` | String | The value passed to the [`BaleadaProseMedia`](/docs/prose/components/media) instance's `type` prop. |
| `tag` | String | The actual HTML tag `BaleadaProseMedia` renders on the page, inferred from the `type`. |
| `src` | String | The value passed to the [`BaleadaProseMedia`](/docs/prose/components/media) instance's `src` prop. |
| `ariaLabel` | String | The value passed to the [`BaleadaProseMedia`](/docs/prose/components/media) instance's `ariaLabel` prop. |
:::

::: type="info"
The table of contents in the right sidebar is powered by Baleada Prose's `useStore`.

Check out the [source code](https://github.com/baleada/docs/blob/main/src/components/LayoutTableOfContents.vue) to see how it works.
:::
