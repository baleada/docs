---
title: useTablist
tags: Composition functions
publish: true
order: 0
---

`useTablist` is a composition function that implements the UI logic needed for a reactive tablist widget.

It follows [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) and allows you to easily customize certain aspects of keyboard navigation. For example, you can choose whether tab panels are shown as soon as their tab is focused, or not shown until the end user presses `Space` or `Enter` on the focused tab.

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseTablist.vue)

<ExampleUseTablist class="with-mt" />


:::
## Creating a tablist
:::

To create a tablist, call the `useTablist` function, which accepts two parameters: `required` and `options`. Both parameters are Objects.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script>
import { useTablist } from '@baleada/vue-features'

export default {
  setup () {
    const tablist = useTablist(required[, options])
  }
}
</script>
```
:::

Here's a breakdown of the `required` object:

::: ariaLabel="useTablist required" classes="wide-4"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- |
| `totalTabs` | Number, Ref (Number) | yes | none | <p>The total number of tabs in your tablist.</p><p>Note that when `totalTabs` is a reactive reference, computing the length of a reactive array, `useTablist` allows the number and order of tabs to change reactively. This is useful for example in spreadsheet apps, where the end user will be adding and deleting tabs, or dragging and dropping to reorder them.</p>
| `orientation` | String | yes | none | The visual direction of tabs. Should be `horizontal` or `vertical`. |
:::

And here's a breakdown of the `options` object:

::: ariaLabel="useTablist required" classes="wide-4"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- |
| `selectsPanelOnTabFocus` | Boolean | no | `true` | Indicates whether or not tab panels are shown as soon as their tab is focused, or not shown until the end user presses `Space` or `Enter` on the focused tab. |
| `openMenu` | Function | no | <p>Opens a context menu for a tab after the `openMenuKeycombo` is pressed.</p><p>As its only argument, your `openMenu` function will receive the index (Number) of the currently selected tab.</p> |
| `deleteTab` | Function | no | <p>Deletes one of the tabs when the `deleteTabKeycombo` is pressed.</p><p>As its only argument, your `deleteTab` function will receive the index (Number) of the currently selected tab.</p> |
| `label` | String | no | <p>A label for the tablist, to be read by screen readers.</p><p>While `label` is optional, having an accessible label is not optional. If you don't provide a value for the `label` option, you'll need to add a label in the DOM. For those cases, there's more info below on how to tell `useTablist` which DOM element is your accessible label.</p> |
| `openMenuKeycombo` | Keycombo | no | `'shift+f10'` |
| `deleteTabKeycombo` | Keycombo | no | `'delete'` |


:::
## Using the tablist
:::

`useTablist` returns an object with tools you can use to connect `useTablist`'s UI logic to your markup.

