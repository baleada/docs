---
title: ProseDetails
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`ProseDetails` is just a good old [`details`/`summary`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details), but it also renders a custom chevron icon.

:::
## Example
:::

:::
### Markdown
:::

:::
    ::: summary="There's some really interesting stuff in here..."
    Syke!
    :::
:::

:::
### Rendered
:::

::: summary="There's some really interesting stuff in here..."
Syke!
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `summary` | String | no | none | The text that will go inside the `summary` element. |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `ProseDetails`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
details.baleada-prose-details open // <- open is the boolean attribute that determines whether or not the details are open
  summary
    svg // <- Chevron icon
    span // <- Contains the text from the summary prop
  section.contents
    slot // <- Your content slots in here
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