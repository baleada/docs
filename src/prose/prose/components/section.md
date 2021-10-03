---
title: Section
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`BaleadaProseSection`'s root element is just a generic `section`. It comes in handy when you need to contain a few things in a block-level element, maybe with a few CSS classes tacked on so you can add specific styling.

:::
## Example
:::

:::
### Markdown:
:::

:::
    :::
    Inspect me! I'm contained in a `section`.
    :::
:::

:::
### Rendered: 
:::

:::
Inspect me! I'm contained in a `section`.
:::


:::
## Props
:::

::: ariaLabel="ProseSection props"
| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `BaleadaProseSection`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-section
  section.baleada-prose-contents
    slot // Your blockquote slots in here
```
:::



:::
## API design compliance
:::

[WIP]

::: ariaLabel="A table showing ProseSection's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
:::
