---
title: What is Baleada SPA Links?
tags: Configuration utilities, Markdown-it, Inertia, Next, Nuxt, Sapper, React, Vue, Svelte
source: markdown-it-spa-links
publish: true
order: 0
---

Baleada SPA Links is a [Markdown-it](https://markdown-it.github.io/) plugin that replaces the default link markup with markup that tells your single-page application to handle the routing (i.e. navigate to the route without doing a full page refresh).

For example, if you're using [Nuxt](https://nuxtjs.org), you can write the following Markdown:

:::
```md
[My other page](/my-other-page)
```
:::

And Baleada SPA Links will render this:

:::
```html
<p><RouterLink to="/my-other-page">My other page</RouterLink></p>
```
:::

The plugin supports link components for the following tools:
- [Inertia](https://inertiajs.com)
- [Next](https://nextjs.org)
- [Nuxt](https://nuxtjs.org)
- [React Router](https://reacttraining.com/react-router/)
- [Vue Router](https://router.vuejs.org/)

::: type="info"
[Sapper](https://sapper.svelte.dev) was originally on the list of supported link components as well, but since [Sapper links are simply `<a>` elements](https://sapper.svelte.dev/docs#Comparison_with_Next_js) instead of specific components, special rendering is not necessary.
:::


:::
## Installation
:::

You can install Baleada SPA Links from NPM.

:::
```bash
npm i @baleada/markdown-it-spa-links
```
:::


:::
## Usage
:::

To get started, import the plugin from the entry file of `@baleada/spa-links`, and create a Markdown-it instance.

:::
```js
import MarkdownItSpaLinks from '@baleada/spa-links'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
```
:::

Use the `use` method of your Markdown-it instance to register the plugin. Pass the plugin as the first argument, and for the second argument, you can pass a configuration object. That object can have two properties:

::: ariaLabel="Baleada SPA Links configuration schema" classes="wide-5"
| Property | Type | Required | Default | Value description |
| --- | --- | --- | --- | --- |
| `spa` | String | yes | none | <p>Indicates which tool you are using to build your SPA, so that the plugin can identify the correct link component.</p><p>See the [Link components by tool](#Link-components-by-tool) reference table to see valid values for the `spa` option and which link components get rendered.</p> |
| `base` | String | no | none | <p>Passes the base URL of your site to help the plugin identify links within the site.</p><p>If `base` is not passed, the plugin will only use link components for URLs that start with `/`.</p> |
:::

For example, here's how you would configure the plugin to work with Nuxt:

:::
```js
import MarkdownItSpaLinks from '@baleada/spa-links'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

md.use(MarkdownItSpaLinks, { spa: 'nuxt' })
```
:::

And here's how you would pass the optional base URL:

:::
```js
import MarkdownItSpaLinks from '@baleada/spa-links'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

md.use(MarkdownItSpaLinks, { spa: 'nuxt', base: 'https://example.com' })
```
:::


:::
### Link components by tool
:::

::: ariaLabel="Reference table matching SPA tools with link components"
| When `spa` is... | Links are rendered with... |
| --- | --- |
| `inertia` | [`inertia-link`](https://inertiajs.com/links#top) |
| `next` | [`Link` > `a`](https://nextjs.org/docs#with-link) |
| `nuxt` | [`RouterLink`](https://nuxtjs.org/api/components-nuxt-link#the-lt-nuxt-link-gt-component) |
| `react` | [`Link`](https://reacttraining.com/react-router/web/api/Link) |
| `vue` | [`RouterLink`](https://router.vuejs.org/api/#router-link) |
:::
