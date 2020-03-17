---
title: ProseCodeblock
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`ProseCodeblock` is the Baleada Prose version of the classic Markdown fenced codeblock that starts with three backticks. It comes with easy-to-style line numbers and a copy-to-clipboard button (powered by [Baleada Logic's `Copyable` class](/docs/logic/classes/copyable)).

:::
## Example
:::

:::
### Markdown
:::


:::

    ::: canCopy hasLineNumbers
    ```js
    const thing = new Stuff()
    ```
    :::

:::

:::
### Rendered
:::

::: canCopy hasLineNumbers
```js
const thing = new Stuff()
```
:::


::: type="info"
The codeblocks in the Baleada docs are highlighted using [refractor](https://github.com/wooorm/refractor), [rehype](https://github.com/rehypejs/rehype), and a [Tailwind-powered custom syntax theme](https://gitlab.com/baleada/docs/-/blob/master/assets/css/prose/syntax.css).
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `canCopy` | Boolean | no | `false` | Indicates whether or not `ProseCodeblock` should render the copy-to-clipboard button and icon. |
| `hasLineNumbers` | Boolean | no | `false` | Indicates whether or not `ProseCodeblock` should render line numbers. |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `ProseCodeblock`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-codeblock
  section.contents
    pre
      code // This pre>code contains line numbers
    slot <- Your pre>code slots in here
  button // Copy-to-clipboard button
    svg // Copy-to-clipboard icon
```
:::



:::
## API design compliance
:::

[WIP]

<!-- ::: ariaLabel="A table showing ProseAside's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
::: -->