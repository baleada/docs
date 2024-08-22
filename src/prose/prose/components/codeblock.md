---
title: Codeblock
publish: true
order: 0
---

`BaleadaProseCodeblock` is the Baleada Prose version of the classic Markdown fenced codeblock that starts with three backticks. It comes with easy-to-style line numbers and a copy-to-clipboard button (powered by [Baleada Logic's `Copyable` class](/docs/logic/classes/copyable)).

:::
## Example
:::

:::
### Markdown
:::


:::

      ::: canCopy
      ```js
      const thing = new Stuff()
      ```
      :::

:::

:::
### Rendered
:::

::: canCopy
```js
const example = new Thing()
```
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `canCopy` | Boolean | no | `false` | Indicates whether or not `BaleadaProseCodeblock` should render the copy-to-clipboard button and icon. |
| `hasLineNumbers` | Boolean | no | `false` | Indicates whether or not `BaleadaProseCodeblock` should render line numbers. |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `BaleadaProseCodeblock`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-codeblock
  section.baleada-prose-contents
    pre
      code // This pre > code contains the code language
    pre
      code // This pre > code contains line numbers
    slot <- Your pre > code slots in here
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
