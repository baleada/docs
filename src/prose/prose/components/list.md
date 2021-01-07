---
title: ProseList
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`ProseList` is the Baleada version of ordered and unordered lists. Just like `ProseGrid`, `ProseList` also comes with an opt-in "type to filter" feature.


:::
## Example
:::

:::
### Markdown
:::

:::
    ::: canFilterByQuery canChangeFilterCaseSensitivity
    - row: even 0
    - row: odd 1
    - ROW: EVEN 2
    - ROW: ODD 3
    :::

    ::: canFilterByQuery canChangeFilterCaseSensitivity
    1. row: even 0
    1. row: odd 1
    1. ROW: EVEN 2
    1. ROW: ODD 3
    :::
:::


:::
### Rendered
:::

::: canFilterByQuery canChangeFilterCaseSensitivity
- row: even 0
- row: odd 1
- ROW: EVEN 2
- ROW: ODD 3
:::

::: canFilterByQuery canChangeFilterCaseSensitivity
1. row: even 0
2. row: odd 1
3. ROW: EVEN 2
4. ROW: ODD 3
:::

::: type="warning"
Remember: nesting Baleada Prose components isn't supported, so you can't use `ProseList` for nested lists.
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `canFilterByQuery` | Boolean | no | `false` | Indicates whether or not the list can be filtered by a query string. |
| `filterIsCaseSensitive` | Boolean | no | `false` | <p>Indicates whether or not the list's query filtering is case sensitive by default.</p><p>When it's `true`, `ProseList` renders a text input containing `messages.list.filterByQueryPlaceholder`.</p> |
| `canChangeFilterCaseSensitivity` | Boolean | no | `false` | <p>Indicates whether or not your end user can change the list's `filterIsCaseSensitive` setting.</p><p>When it's `true`, `ProseList` renders a checkbox and `messages.list.changeFilterCaseSensitivityLabel`.</p> |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `ProseList`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-list
  div // Only renders when canFilterByQuery is true
    input type="text" placeholder="messages.list.filterByQueryPlaceholder" name="Filter by query"
  div // Only renders when canFilterByQuery and canChangeFilterCaseSensitivity are true
    input type="checkbox" name="Change filter case sensitivity"
    label // Contains messages.list.changeFilterCaseSensitivityLabel
  section.baleada-prose-contents tabindex="0"
    slot // Your content slots in here. See below for more guidance.
```
:::

`ProseList`'s slot replaces your `ol`, `ul`, and `li` elements with purpose-built components, but that's purely an implementation detail (to make the type-to-filter feature work).

Your markup remains unchanged, except for the addition of a couple classes to make CSS selection easier:

:::
```pug
ol.baleada-prose-list-contents
  li.baleada-prose-list-item

ul.baleada-prose-list-contents
  li.baleada-prose-list-item
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
