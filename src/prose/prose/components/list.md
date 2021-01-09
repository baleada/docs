---
title: ProseList
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`ProseList` is the Baleada version of ordered and unordered lists. Just like `ProseTable`, `ProseList` also comes with an opt-in "type to filter" feature.


:::
## Example
:::

:::
### Markdown
:::

:::
    ::: readerCanSearch readerCanChangeSearchCaseSensitivity
    - row: even 0
    - row: odd 1
    - ROW: EVEN 2
    - ROW: ODD 3
    :::

    ::: readerCanSearch readerCanChangeSearchCaseSensitivity
    1. row: even 0
    2. row: odd 1
    3. ROW: EVEN 2
    4. ROW: ODD 3
    :::
:::


:::
### Rendered
:::

::: readerCanSearch readerCanChangeSearchCaseSensitivity
- row: even 0
- row: odd 1
- ROW: EVEN 2
- ROW: ODD 3
:::

::: readerCanSearch readerCanChangeSearchCaseSensitivity
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

::: ariaLabel="ProseList props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `readerCanSearch` | Boolean | no | `false` | Indicates whether or not the list can be filtered by a query string. |
| `searchIsCaseSensitive` | Boolean | no | `false` | <p>Indicates whether or not the list's query filtering is case sensitive by default.</p><p>When it's `true`, `ProseTable` renders a text input containing `context.messages.list.searchPlaceholder`.</p><p>For more info on `context.messages`, [see the guide on using `context`](/docs/prose/using-context).</p> |
| `minimumSearchScore` | Number | no | `1` | <p>Search results from your list are scored based on how closely they match the query. Any number between `0` and `1` is a valid `minimumSearchScore`, and a `minimumSearchScore` of `1` will filter out all list rows that don't contain a perfect match for the query.</p><p>Set a `minimumSearchScore` of less than `1` to enable fuzzy matching.</p><p>`ProseTable` uses [Baleada Logic's `Searchable` class](/docs/logic/classes/Searchable) under the hood to support this feature.</p> |
| `readerCanChangeSearchCaseSensitivity` | Boolean | no | `false` | <p>Indicates whether or not your end user can change the list's `searchIsCaseSensitive` setting.</p><p>When it's `true`, `ProseTable` renders a checkbox and `messages.list.changeSearchCaseSensitivityLabel`.</p><p>For more info on `context.messages`, [see the guide on using `context`](/docs/prose/using-context).</p> |
| `classes` | String | no | none | Adds additional classes to the component's root element. |


:::
## Structure
:::

Here's the structure of `ProseList`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-list
  div // Only renders when readerCanSearch is true
    input type="text" placeholder="messages.list.searchPlaceholder" name="Search"
  div // Only renders when readerCanSearch and readerCanChangeSearchCaseSensitivity are true
    input type="checkbox" name="Change search case sensitivity"
    label // Contains messages.list.changeSearchCaseSensitivityLabel
  section.baleada-prose-contents
    slot // Your list slots in here, with its expected <ol> (or <ul>) and <li> markup.
```
:::
