---
title: Aside
tags: Components
publish: true
order: 0
---

`BaleadaProseAside` is perfect when you want to insert additional information into an article outside the normal flow of writing. It renders a satisfyingly semantic `aside` element and can render an icon as well.

:::
## Example
:::

:::
### Markdown
:::

:::
      ::: type="info"
      Note: by the _way_, in case you were **wondering**,
      this is some `info`, for your information.
      :::

      ::: type="warning"
      If you don't read this, you'll probably mess something up,
      but it's not the end of the world.
      :::

      ::: type="danger"
      Inconceivable!
      :::

      ::: type="success"
      You go, Glen Coco!
      :::

      ::: type="simple"
      Behold, your blank canvas.
      :::
:::

:::
### Rendered
:::


::: type="info"
Note: by the _way_, in case you were **wondering**, this is some `info`, for your information.
:::

::: type="warning"
If you don't read this, you'll probably mess something up, but it's not the end of the world.
:::

::: type="danger"
Inconceivable!
:::

::: type="success"
You go, Glen Coco!
:::

::: type="simple"
Behold, your blank canvas.
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | String | no | `info` | <p>Determines which icon gets rendered.</p><p>Pass `info`, `warning`, `success`, or `danger` to render one of the icons seen above, or pass `simple` to render an `aside` element without an icon.</p> |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::

::: type="warning"
When you're writing in Markdown, the `type` prop is required—that's the only way [Baleada Prose Container](/docs/prose-container) will know that it's a `BaleadaProseAside` and not a [`BaleadaProseSection`](/docs/prose/components/section).
:::


:::
## Structure
:::

Here's the structure of `BaleadaProseAside`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
aside.baleada-prose-aside.baleada-prose-aside-info // Replace info with warning, danger, success, or simple
  svg // Icon
  section.baleada-prose-contents
    slot // Your content slots in here
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
