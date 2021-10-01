---
title: BaleadaProseHeading
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`BaleadaProseHeading` is Baleada Prose's version of Markdown headings. It does three things that you typically want from a heading:
1. It communicates with the top-level layout ([`BaleadaProseLayout`](/docs/prose/components/layout), to be specific) to add itself to a table of contents.
2. It renders its text inside an `a`, so that the entire heading becomes a clickable link.
3. It renders a copy-to-clipboard button so the end user can easily copy the link directly to that heading.

:::
## Example
:::

:::
### Markdown
:::

:::
    :::
    ### Find me in the table of contents!
    :::
:::

:::
### Rendered
:::

:::
#### Find me in the table of contents!
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `canCopy` | Boolean | no | `false` | Indicates whether or not `BaleadaProseHeading` should render the copy-to-clipboard button and icon. |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `BaleadaProseHeading`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
h1.baleada-prose-heading // h1 gets replaced with whatever heading level you actually use
  a.contents.descendant1Classes href="..." // The anchor's href is a slug of the heading's text
    slot // Your content slots in here
  InterfaceButton.descendant2Classes name="Copy link to heading" // Only gets rendered when canCopy is true
    svg.descendant3Classes // Link icon
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
