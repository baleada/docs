---
title: ProseGrid
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

As an enhancement to the more traditional `table` element and its children, Baleada Prose offers `ProseGrid`—a grid widget, as defined by the [WAI-ARIA](https://www.w3.org/TR/wai-aria/#grid) spec.

To be fully WAI-ARIA compliant, `ProseGrid` renders `div`s with all the necessary aria roles, and supports all the keyboard accessibility features outlined in the spec (powered by [Baleada Logic's `Listenable` class](/docs/logic/classes/Listenable)). The other benefit of using `div`s instead of `table` & friends is that `div`s are way easier to style!

Just like `ProseList`, `ProseGrid` also comes with an opt-in "type to filter" feature.


:::
## Example
:::

:::
### Markdown
:::

:::
    ::: ariaLabel="ProseGrid example" canFilterByQuery canChangeFilterCaseSensitivity
    | Baleada | Prose | Grid |
    | --- | --- | --- |
    | row: even 0 | row: even 0 | row: even 0 |
    | row: odd 1 | row: odd 1 | row: odd 1 |
    | ROW: EVEN 2 | ROW: EVEN 2 | ROW: EVEN 2 |
    | ROW: ODD 3 | ROW: ODD 3 | ROW: ODD 3 |
    :::
:::


:::
### Rendered
:::

::: ariaLabel="ProseGrid example" canFilterByQuery canChangeFilterCaseSensitivity
| Baleada | Prose | Grid |
| --- | --- | --- |
| row: even 0 | row: even 0 | row: even 0 |
| row: odd 1 | row: odd 1 | row: odd 1 |
| ROW: EVEN 2 | ROW: EVEN 2 | ROW: EVEN 2 |
| ROW: ODD 3 | ROW: ODD 3 | ROW: ODD 3 |
:::

::: type="warning"
Remember: nesting Baleada Prose components isn't supported, so you can't use other Prose components inside `ProseGrid`.
:::

:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `ariaLabel` | Boolean | no | `false` | An `aria-label` for the grid's root element (not `ProseGrid`'s root element). |
| `canFilterByQuery` | Boolean | no | `false` | Indicates whether or not the grid can be filtered by a query string. |
| `filterIsCaseSensitive` | Boolean | no | `false` | <p>Indicates whether or not the grid's query filtering is case sensitive by default.</p><p>When it's `true`, `ProseGrid` renders a text input containing `messages.grid.filterByQueryPlaceholder`.</p> |
| `canChangeFilterCaseSensitivity` | Boolean | no | `false` | <p>Indicates whether or not your end user can change the grid's `filterIsCaseSensitive` setting.</p><p>When it's `true`, `ProseGrid` renders a checkbox and `messages.grid.changeFilterCaseSensitivityLabel`.</p> |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `ProseGrid`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-grid
  div // Only renders when canFilterByQuery is true
    input type="text" placeholder="messages.grid.filterByQueryPlaceholder" name="Filter by query"
  div // Only renders when canFilterByQuery and canChangeFilterCaseSensitivity are true
    input type="checkbox" name="Change filter case sensitivity"
    label // Contains messages.grid.changeFilterCaseSensitivityLabel
  section.contents tabindex="0"
    slot // Your content slots in here. See below for more guidance.
```
:::

`ProseGrid`'s slot actually gets transformed considerably, since the `table` element and each of its children are replaced at build time with purpose-built Baleada Prose components.

That's purely an implementation detail, though (to make the type-to-filter feature and keyboard accessibility work). What you really need to know (assuming you want to style this beast!) is the complete markup structure that slots into `ProseGrid`, replacing your `table` in the process:

:::
```pug
div.baleada-prose-grid-contents" role="grid" // Replaces table
  div.baleada-prose-rowgroup role="rowgroup" // Replaces thead
    div.baleada-prose-row role="row" // Replaces tr
      div.baleada-prose-columnheader" role="columnheader" tabindex="-1" // Replaces th
  div.baleada-prose-rowgroup role="rowgroup" // Replaces tbody
    div.baleada-prose-row role="row" // Replaces tr. Repeats for each row in the table body.
      div.baleada-prose-gridcell role="gridcell" tabindex="-1" // Replaces td. Repeates for each cell in the row.
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