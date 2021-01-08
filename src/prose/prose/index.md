---
title: What is Baleada Prose?
tags: Components
publish: true
order: 0
---

Baleada Prose is a library of components that enhance prose, adding tweetable blockquotes, copiable codeblocks, anchored headings, filterable tables, and more. It's designed to bring a base layer of rich interactivity to articles written by programmers and non-programmers alike.

::: type="success"
Every article in the Baleada Docs is written in Baleada-flavored Markdown and enhanced by Baleada Prose!
:::


:::
## Installation
:::

Currently, Baleada Prose only offers components for [Vue 3](https://v3.vuejs.org):

```bash
npm i @baleada/vue-prose
```


:::
## Workflow
:::

Unlike most component libraries, Baleada Prose is not designed to be directly coded by hand. The intended workflow is:
1. Write an article using Baleada's extension of the Markdown syntax.
2. Use a Markdown parser and renderer with a Baleada plugin installed to parse your Baleada-flavored Markdown and render it, rendering Baleada Prose tags instead of HTML tags where appropriate.
3. Pass the rendered HTML + Baleada Prose string through a toolchain that can render Baleada Prose tags and their contents as fully reactive components.

Currently, Baleada supports [`markdown-it`](https://markdown-it.github.io/) as the Markdown parser and renderer, and it supports Vue as the reactivity and component framework that can render Baleada Prose tags.

Using those tools, here is the more specific workflow you should follow:


Write your article using Baleada's extension of the Markdown syntax. Eventually, you should read the [Markdown syntax](/docs/prose/markdown-syntax) guide for full documentation, but here's a quick example for now:

:::
```md
    :::
    # My article
    :::

    This article is written mostly in normal Markdown, but anything
    surrounded by these triple colons will become a Baleada Prose component.

    ☝️ That heading, for example, will be automatically linked.

    👇 This blockquote is customized with props, so it will have
    a tweet button:

    ::: readerCanTweet tweetVia="BaleadaToolkit" tweetUrl="current"
    > I'll be an enhanced blockquote!
    :::

    > I'll be a normal HTML blockquote, since I'm not surrounded by triple colons.

    👇 This table, also customized with props, will render with a
    type-to-filter search box:

    ::: readerCanSearch ariaLabel="Alphabet table"
    | Letter | Word |
    | --- | --- |
    | A | Apple |
    | B | Banana |
    | C | Captain Jean Luc Picard of the USS Enterprise |
    | D | Dog |
    :::
```
:::

Then, use [`markdown-it`](https://markdown-it.github.io/) with the [Baleada Prose Container](/docs/prose-container) plugin to parse and render your content.

This is normally done inside a larger code-bundling toolchain, but here are the bits that matter:

:::
```js
import MarkdownIt from 'markdown-it'
import MarkdownItProseContainer from '@baleada/markdown-it-prose-container'

const md = new MarkdownIt()

md.use(MarkdownItProseContainer, { template: 'vue' })

const myRenderedHtmlString = md.render(myBaleadaFlavoredMarkdownString)
// ->
// An HTML string, with many HTML tags replaced by their
// Baleada Prose equivalents, along with any props the
// author passed.
```
:::

Finally, use Vue to render the HTML string as an interactive article.

This task involves one important additional task: globally registering Baleada Prose components with Vue so they can be used in any template. Baleada Prose provides a Vue plugin to make this easier. The code below shows how to use the plugin, and you can [visit the plugin guide](/docs/prose/plugin) to learn more.

Again, this is normally done in the context of a larger toolchain, especially one that supports Vue's [Single File Components](https://v3.vuejs.org/guide/single-file-component.html#introduction), but here is the basic concept:

:::
```js
import { createApp } from 'vue'
import { plugin as prose } from '@baleada/vue-prose'

const app = createApp({
  template: myRenderedHtmlString,
})

app.use(prose)

app.mount('#app')
```
:::

And that's the bare minimum workflow to get Baleada Prose working! To see it in action, [click the Run button on this REPL](https://repl.it/@AlexVipond/Baleada-Prose-Demo#src/entry.js).


:::
### Using components directly
:::

As mentioned, Baleada Prose components are not primarily designed to be used directly. However, many of them can be imported and used just like any other Vue component:

:::
```html
<template>
  <!--
    ProseAside will render an <aside>, along with an icon
    determined by the `type` prop.
  -->
  <ProseAside type="info" class="bg-blue-100 text-blue-900">
    <p>Here's some info you should know!</p>
  </ProseAside>
</template>

<script>
import { ProseAside } from '@baleada/vue-prose'

export default {
  components: { ProseAside },
}
</script>
```
:::

`ProseGrid` and `ProseList` are the only two components that are downright uncomfortable to write by hand—it would involve calculating total rows and columns, calculating x/y coordinates for each table cell or list item, and writing lots of repetitive markup.

In other words, it's a great task to delegate to the Baleada Prose Container plugin, which transforms your Markdown tables into the correct markup automatically.


:::
```
### Writing collections of Baleada Prose content
```
:::

The REPL linked above shows a basic example of just one Prose-powered article, but Baleada Prose was really designed for blogs and documentation sites, where you'll be writing entire collections of articles.

To enhance collections of articles, Baleada Prose offers two important tools: the `ProseArticle` component and the `useContext` composition function. These tools work just fine with traditional server-rendered websites, but they also have features that support single-page apps, like those built with [Vite](https://vitejs.dev), [Nuxt](https://nuxtjs.org/), or [Vue CLI](https://cli.vuejs.org/).





:::
## Available components
:::

Here are the available components in the Baleada Prose library, each linked to their specific documentation:
- [`ProseArticle`](/docs/prose/components/article)
- [`ProseAside`](/docs/prose/components/aside)
- [`ProseBlockquote`](/docs/prose/components/blockquote)
- [`ProseCodeblock`](/docs/prose/components/codeblock)
- [`ProseDetails`](/docs/prose/components/details)
- [`ProseGrid`](/docs/prose/components/grid)
- [`ProseHeading`](/docs/prose/components/heading)
- [`ProseLayout`](/docs/prose/components/layout)
- [`ProseList`](/docs/prose/components/list)
- [`ProseMedia`](/docs/prose/components/media)
- [`ProseSection`](/docs/prose/components/section)
