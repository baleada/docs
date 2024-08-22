---
title: Tablist
source: useTablist.ts
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::

`useTablist` is a composable that implements the UI logic needed for a reactive, accessible tablist interface.

It follows [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) and allows you to easily customize accessibility features.

::: type="info"
`useListbox` uses [Baleada Logic's `Navigateable` class](/docs/logic/classes/Navigateable) internally to manage tab navigation, and [Baleada Logic's `Pickable` class](/docs/logic/classes/Pickable) to manage the selected tab.
:::

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseTablist.vue)

<ExampleUseTablist class="with-mt" />


:::
## Create a tablist
:::

To create a tablist, call the `useTablist` function, which accepts one optional `options` object as its only parameter.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { useTablist } from '@baleada/vue-features'

const tablist = useTablist([options])
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useTablist options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `transition` | Object | no | none | <p>An object with one property: `panel`.</p><p>Pass an object to `transition.panel`, specifying a transition or animation that `useTablist` should apply to each tab panel as they enter and leave visibility.</p><p>See the [How to format enter/leave transitions](/docs/features/affordances/show#how-to-format-enter-leave-transitions) section of the `show` docs for more guidance.</p> |
| `initialSelected` | Number | no | `0` | The index-based position of the tab that should be initially selected. |
| `ability` | StatusOption | no | `() => 'enabled'` | <p>A [status option](/docs/features/shared/controlling-status) that should resolve to `enabled` for each enabled tab, and `disabled` for each disabled tab.</p><p>`useTablist` uses this information to decide which tabs are eligible to receive focus and/or be selected.</p> |
| `orientation` | String | no | `horizontal` | Indicates the orientation of the tablist. For horizontal tablists, left and right arrow keys will transfer focus, and for vertical tablists, up and down arrow keys will transfer focus. |
| `selectsOnFocus` | Boolean | no | `true` | Indicates whether or not tabs should be selected as soon as they are focused |
| `loops` | Boolean | no | `true` | Indicates whether or not your tablist should "loop around" to the beginning of the list after reaching the end, and vice versa. |
| `disabledTabsReceiveFocus` | Boolean | no | `true` | <p>Indicates whether or not your `tablist` can transfer focus to disabled tabs.</p><p>If you set `disabledTabsReceiveFocus` to `false`, you should be confident that assistive tech users don't need or want to read the labels of disabled tabs, or that they have another way to access that content.</p><p>Note that even when `disabledTabsReceiveFocus` is `true`, it's never possible to select disabled tabs.</p> |
| `panelContentsFocusability` | StatusOption | | <p>A [status option](/docs/features/shared/controlling-status) that should resolve to `focusable` when tab panel contents can receive focus, and `not focusable` when tab panel contents cannot receive focus.</p><p>`useTablist` uses this information to implement an accessibility feature for you: the tab panel should only be included in the page's tab order when tab panel contents are **not** focusable.</p> |
:::


:::
## Use your tablist
:::

`useTablist` returns a `tablist`—an object with tools you can use to connect `useTablist`'s UI logic to your markup.

Here's a breakdown of that object:

::: ariaLabel="tablist breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `root` | Function | <p>A [single element API object](/docs/features/shared/element-api).</p><p>`root.ref` should be bound to the DOM element that serves as your tablist's root.</p> |
| `tabs` | Function | <p>A [multiple element API object](/docs/features/shared/element-api).</p><p>Pass the index-based position (Number) of the current tab as the only argument for `tabs.ref`, and its returned function ref should be bound to the DOM element that serves as that tab.</p><p>It's recommended that you render the tabs with `v-for`, get the index from your `v-for` statement, and bind the function ref to the `v-for` element.</p> |
| `panels` | Function | <p>A [multiple element API object](/docs/features/shared/element-api).</p><p>Pass the index-based position (Number) of the current panel as the only argument for `panels.ref`, and its returned function ref should be bound to the DOM element that serves as that panel.</p><p>It's recommended that you render the panels with `v-for`, get the index from your `v-for` statement, and bind the function ref to the `v-for` element.</p> |
| `focused` | Ref (Number) | A reactive reference to the index-based position of the currently focused tab |
| `selected` | Ref (Number) | A reactive reference to the index-based position of the currently selected tab |
| `is` | Object | <p>An object with two properties: `focused` and `selected`.</p><p>Each property holds a method that requires an index (Number) as its only parameter.</p><p>Given the index, `is.focused` returns a boolean indicating whether or not that tab is focused, and `is.selected` returns a boolean indicating whether or not that tab is selected.</p><p>`is.focused` and `is.selected` read from reactive references, so their boolean return values are fully reactive when used in Vue templates, watchers, and computed references.</p> |
| `getStatuses(index)` | Function | <p>A function that requires an index (Number) as its only parameter, and returns a three-item array indicating the statuses (Strings) of the tab at that index.</p><p>The first item will be `focused` or `blurred`, the second item will be `selected` or `deselected` and the third item will be `enabled` or `disabled`.</p> |
| `focus` | Object | <p>An object containing all the methods described in the [eligible focus guide](/docs/features/shared/eligible-focus).</p><p>You can use these methods to programmatically transfer focus in a smarter way, taking enabled/disabled state and other customizable conditions into account.</p> |
| `select` | Functions | <p>An object containing all the methods described in the [eligible picking guide](/docs/features/shared/eligible-picking).</p><p>You can use these methods to programmatically select tabs in a smarter way, taking enabled/disabled state and other customizable conditions into account.</p><p>Note that tablists can never be multiselectable, so you can only pass a single index to the `select.exact` method—an array of selected indices is not possible.</p> |
:::

Here's a more complete example of how to use your `tablist` and bind the various function refs:

:::
```html
<!-- MyComponent.vue -->
<template>
  <div :ref="tablist.root.ref()">
    <div
      v-for="({ tab }, index) in metadata"
      :key="tab"
      :ref="tablist.tabs.ref(index)"
    >
      {{ tab }}
    </div>
    <div
      v-for="({ tab, panel }, index) in metadata"
      :key="tab"
      :ref="tablist.panels.ref(index)"
    >
      {{ panel }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTablist } from '@baleada/vue-features'

const metadata = ref([
  { tab: 'Educate Girls', panel: 'https://www.educategirls.ngo/' },
  { tab: 'Kheyti', panel: 'https://www.kheyti.com/' },
  { tab: 'One Heart Worldwide', panel: 'https://oneheartworldwide.org/' },
])

const tablist = useTablist()
</script>
```
:::


:::
## Extend the tablist
:::

The following extensions are compatible with your textbox:
- [`useTablistStorage`](/docs/features/extensions/tablist-storage)
- [`useSize`](/docs/features/extensions/size)
- [`useVisibility`](/docs/features/extensions/visibility)
- [`useLabel`](/docs/features/extensions/label)
- [`useDescription`](/docs/features/extensions/description)
- [`useDetails`](/docs/features/extensions/details)
