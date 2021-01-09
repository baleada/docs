---
title: Using context
tags: Components
publish: true
order: 2
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

The `useContext` function allows you to initialize and read from the reactive object that serves as a central, shared data store for all Baleada Prose components in your app.


:::
## Initializing context
:::

The first time `useContext` is called, it accepts one optional parameter. That parameter is an object, which `useContext` will use in order to initialize Baleada Prose's context.

Here's a full breakdown of that object:


::: ariaLabel="useContext initialization options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `fullPath` | Ref (String), String | `window.location.pathname` | <p>Everything that comes after the base path of your site's URL.</p><p>A common value to pass here is `route.fullPath` from the `route` object returned by [Vue Router's `useRoute` composition function](https://next.router.vuejs.org/api/#useroute).</p> |
| `messages` | Ref | [default `messages`](/) |  |
| `defaultProps` | Ref | [default `defaultProps`](/) |  |
| `interfaceProps` | Ref | [default `interfaceProps`](/) |  |
| `scrollableContainer` | Ref (HTMLElement) | `document.body` | A reference to the HTML element that serves as a scrollable container for your content. |
:::

::: type="warning"
After `useContext` is called for the first time, it will no longer accept an initialization object.

All Baleada Prose components call `useContext` internally, so if you want to initialize context, it needs to be done before any Baleada Prose components are mounted.
:::


:::
## Reading from context
:::

After context is initialized, you can read from it at any time by calling `useContext` with no arguments. The primary use cases for this feature are:
- Reading `context.article.headings` (Array) to retrieve data on `ProseHeading`s so you can populate a linked table of contents
- Reading `context.article.media` (Array) to retrieve data on `ProseMedia`s so you can populate a gallery or carousel of media

:::
```js
import { useContext } from '@baleada/vue-prose'

const { article: { headings, media } } = useContext()
```
:::

Each item in `context.article.headings` has the following structure:

::: ariaLabel="heading metadata breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `level` | Number | The heading's level number—for example, an `<h1>` would produce `level: 1`. |
| `slug` | String | A slug of the heading's text, created by [Baleada Logic's `slugable` factory](/docs/logic/factories/slugable). This slug also becomes the HTML `id` of the heading, so you can use it to create anchored links. |
| `text` | String | The text content of the rendered HTML inside the heading. |
:::

Each item in `context.article.media` has the following structure:

::: ariaLabel="heading metadata breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `type` | String | The value passed to the [`ProseMedia`](/docs/prose/components/media) instance's `type` prop. |
| `tag` | String | The actual HTML tag `ProseMedia` renders on the page, inferred from the `type`. |
| `src` | String | The value passed to the [`ProseMedia`](/docs/prose/components/media) instance's `src` prop. |
| `ariaLabel` | String | The value passed to the [`ProseMedia`](/docs/prose/components/media) instance's `ariaLabel` prop. |
:::


:::
## Writing to context
:::

The context object return from `useContext` is reactive, but it's a readonly copy of the real context object.

Type definitions will inform you that you can pass a callback function to `useContext`, and that your callback function will receive a writeable version of the context object.

While this is possible, it's only useful for Prose components as they read from and write to context for their own internal purposes. There aren't any reasons for a Baleada Prose user to write to context.
