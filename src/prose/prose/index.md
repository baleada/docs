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

Right now, Baleada Prose only offers components for [Vue 3](https://v3.vuejs.org):

```bash
npm i @baleada/vue-prose
```


:::
## Workflow
:::

Unlike most component libraries, Baleada Prose is not designed to be directly coded by hand. The intended workflow is:
1. Write an article using Baleada's extension of the Markdown syntax.
2. Use a Markdown parser and renderer with a Baleada plugin installed to parse your Baleada-flavored Markdown and render it, replacing certain HTML tags with Baleada Prose components.
3. Pass the rendered HTML + Baleada Prose string through a toolchain that can render Baleada Prose tags and their contents as fully reactive components.

Currently, Baleada supports [`markdown-it`](https://markdown-it.github.io/) as the Markdown parser and renderer, and it supports Vue as the reactivity and component framework that can render Baleada Prose components.

Using those tools, here is the more specific workflow you should follow:


:::
### Write your article using Baleada's extension of the Markdown syntax.
:::

Eventually, you should read the [Baleada Markdown syntax](/docs/prose/markdown-syntax) guide for full documentation, but here's a quick example for now:

:::
```md
    :::
    # My article
    :::

    This article is written mostly in normal Markdown, but certain 
    block-level elements surrounded by triple colons will become
    Baleada Prose components.

    ☝️ That heading, for example, will render as a `BaleadaProseHeading`.

    👇 This blockquote is customized with props. It will be a
    `BaleadaProseBlockquote` with a custom tweet button:

    ::: readerCanTweet tweetVia="BaleadaToolkit" tweetUrl="current"
    > I'll be an enhanced blockquote!
    :::

    > I'll be a normal HTML blockquote, since I'm not surrounded by triple colons.

    👇 This table, also customized with props, will render with a
    custom type-to-filter search box:

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
import { createMarkdownItProseContainer } from '@baleada/markdown-it-prose-container'

const md = new MarkdownIt()

md.use(createMarkdownItProseContainer({ template: 'vue' }))

const myRenderedHtmlString = md.render(myBaleadaFlavoredMarkdownString)
// ->
// An HTML string, with many HTML tags replaced by their
// Baleada Prose equivalents, along with any props the
// author passed.
```
:::

Finally, use Vue to render the HTML string as an interactive article.

This task involves one important additional task: globally registering Baleada Prose components with Vue so they can be used in any template. Baleada Prose provides a Vue plugin to make this easier. The code below shows basic plugin usage, and you can [visit the plugin guide](/docs/prose/createProse) to learn more about customization.

Again, this is normally done in the context of a larger toolchain, especially one that supports Vue's [Single File Components](https://v3.vuejs.org/guide/single-file-component.html#introduction), but here is the basic concept:

:::
```js
import { createApp } from 'vue'
import { createProse, components } from '@baleada/vue-prose'

const app = createApp({
  template: myRenderedHtmlString,
})

app.use(createProse({ components }))

app.mount('#app')
```
:::

And that's the bare minimum workflow to get Baleada Prose working! To see it in action, [here's an editable demo](https://stackblitz.com/edit/baleada-vue-prose).



:::
## Available components
:::

Here are the available components in the Baleada Prose library, each linked to their specific documentation:
- [`BaleadaProseAside`](/docs/prose/components/aside)
- [`BaleadaProseBlockquote`](/docs/prose/components/blockquote)
- [`BaleadaProseCodeblock`](/docs/prose/components/codeblock)
- [`BaleadaProseDetails`](/docs/prose/components/details)
- [`BaleadaProseHeading`](/docs/prose/components/heading)
- [`BaleadaProseList`](/docs/prose/components/list)
- [`BaleadaProseMedia`](/docs/prose/components/media)
- [`BaleadaProseSection`](/docs/prose/components/section)
- [`BaleadaProseTable`](/docs/prose/components/table)
