---
title: BaleadaProseTable
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

As an enhancement to the more traditional `table` element and its children, Baleada Prose offers `BaleadaProseTable`—a table as defined by the [WAI-ARIA](https://www.w3.org/TR/wai-aria/#table) spec.

To make the table easier to style than a standard HTML table, `BaleadaProseTable` renders `div`s for the table head, table body, and all table columns and rows. To be fully WAI-ARIA compliant, `BaleadaProseTable` renders those `div`s with all the necessary aria roles, and it requires the `ariaLabel` prop (i.e., it will show a warning in development if that prop is not supplied).

Just like `BaleadaProseList`, `BaleadaProseTable` also comes with an opt-in "type to filter" feature.


:::
## Example
:::

:::
### Markdown
:::

:::
```md
    ::: ariaLabel="Alphabet table" readerCanSearch readerCanChangeSearchCaseSensitivity
    | Letter | Word |
    | --- | --- |
    | A | Apple |
    | B | Banana |
    | C | Captain Jean Luc Picard of the USS Enterprise |
    | D | Dog |
    :::
```
:::


:::
### Rendered
:::

::: ariaLabel="Alphabet table" readerCanSearch readerCanChangeSearchCaseSensitivity
| Letter | Word |
| --- | --- |
| A | Apple |
| B | Banana |
| C | Captain Jean Luc Picard of the USS Enterprise |
| D | Dog |
:::


:::
## Props
:::

::: ariaLabel="ProseTable props" classes="wide-5"
| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `ariaLabel` | Boolean | no | `false` | An `aria-label` for the table's root element. |
| `readerCanSearch` | Boolean | no | `false` | Indicates whether or not the table can be filtered by a query string. |
| `searchIsCaseSensitive` | Boolean | no | `false` | <p>Indicates whether or not the table's query filtering is case sensitive by default.</p><p>When it's `true`, `BaleadaProseTable` renders a text input containing `context.messages.table.searchPlaceholder`.</p><p>For more info on `context.messages`, [see the guide on using `context`](/docs/prose/using-context).</p> |
| `minimumSearchScore` | Number | no | `1` | <p>Search results from your table are scored based on how closely they match the query. Any number between `0` and `1` is a valid `minimumSearchScore`, and a `minimumSearchScore` of `1` will filter out all table rows that don't contain a perfect match for the query.</p><p>Set a `minimumSearchScore` of less than `1` to enable fuzzy matching.</p><p>`BaleadaProseTable` uses [Baleada Logic's `Searchable` class](/docs/logic/classes/Searchable) under the hood to support this feature.</p> |
| `readerCanChangeSearchCaseSensitivity` | Boolean | no | `false` | <p>Indicates whether or not your end user can change the table's `searchIsCaseSensitive` setting.</p><p>When it's `true`, `BaleadaProseTable` renders a checkbox and `messages.table.changeSearchCaseSensitivityLabel`.</p><p>For more info on `context.messages`, [see the guide on using `context`](/docs/prose/using-context).</p> |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `BaleadaProseTable`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-table
  div // Only renders when readerCanSearch is true
    input type="text" placeholder="messages.table.searchPlaceholder" name="Search"
  div // Only renders when readerCanSearch and readerCanChangeSearchCaseSensitivity are true
    input type="checkbox" name="Change search case sensitivity"
    label // Contains messages.table.changeSearchCaseSensitivityLabel
  section.baleada-prose-contents
    slot // Your table slots in here. See below for more guidance.
```
:::

Here's the structure of the actual table's markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
div role="table" // Replaces <table>
  div role="rowgroup" // Replaces <thead>
    div role="row" // Replaces <tr>
      div role="columnheader" // Replaces <th>
  div role="rowgroup" // Replaces <tbody>
    div role="row" // Replaces <tr>. Repeats for each row in the table body.
      div role="cell" // Replaces <td>. Repeats for each cell in the row.
```
:::
