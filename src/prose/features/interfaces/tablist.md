---
title: Tablist
tags: Composition functions
publish: true
order: 0
---

`useTablist` is a composition function that implements the UI logic needed for a reactive tablist widget.

It follows [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) and allows you to easily customize certain aspects of keyboard navigation. For example, you can configure the tablist as **horizontal**, so that it uses left and right arrow keys to navigate tabs, or **vertical**, so that it uses up and down arrow keys instead.

::: type="info"
`useTablist` uses [Baleada Logic's `Navigateable` class](/docs/logic/classes/Navigateable) to manage tab navigation.
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

<script>
import { useTablist } from '@baleada/vue-features'

export default {
  setup () {
    const tablist = useTablist([options])
  }
}
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useTablist options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | String | no | none | <p>A label for the tablist, to be read by screen readers.</p><p>Note that `label` is optional, but having an accessible label is not optional. If you don't provide a value for the `label` option, you'll need to add a label in the DOM. For those cases, there's more info below on how to tell `useTablist` which DOM element is your accessible label.</p> |
| `orientation` | String | yes | `horizontal` | The visual direction of tabs. Must be `horizontal` or `vertical`. |
| `initialSelected` | Number | yes | `0` | The index of the tab and tab panel that should be selected by default. |
| `selectsPanelOnTabFocus` | Boolean | no | `true` | <p>Indicates whether or not tab panels are shown as soon as their tab is focused.</p><p>When `selectsPanelOnTabFocus` is `false`, panels are not shown until the end user clicks on a tab, or presses `Space` or `Enter` while focused on a tab.</p> |
| `openMenu` | Function | no | none | <p>Opens a context menu for a tab after the `openMenuKeycombo` is pressed.</p><p>As its only argument, your `openMenu` function will receive an object, whose only property is `index`. The value of `index` is the index (Number) of the currently selected tab.</p> |
| `deleteTab` | Function | no | none | <p>Deletes one of the tabs when the `deleteTabKeycombo` is pressed.</p><p>As its only argument, your `deleteTab` function will receive an object with two properties: `index` and `done`.</p><p>The `index` property holds the index (Number) of the currently selected tab.</p><p>The `done` property holds the `done` callback: a function that you should call with no arguments after the tab has been deleted.</p> |
| `openMenuKeycombo` | Keycombo | no | `shift+f10` | Sets the keycombo that will cause `useTablist` to call your `openMenu` function. |
| `deleteTabKeycombo` | Keycombo | no | `delete` | Sets the keycombo that will cause `useTablist` to call your `deleteTab` function. |
| `transition` | Object | no | none | <p>An object with one property: `panel`.</p><p>Pass an object to `transition.panel`, specifying a transition or animation that `useTablist` should apply to each tab panel as they enter and leave visibility.</p><p>See the [How to format enter/leave transitions](/docs/features/affordances/useConditionalDisplay#how-to-format-enter-leave-transitions) section of the `useConditionalDisplay` docs for more guidance.</p> |
:::


:::
## Use your tablist
:::

`useTablist` returns a `tablist`—an object with tools you can use to connect `useTablist`s UI logic to your markup.

Here's a breakdown of that object:

::: ariaLabel="tablist breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `root` | Function | <p>A [single element API object](/docs/features/element-api).</p><p>`root.ref` should be bound to the DOM element that serves as your tablist's root.</p> |
| `tabs` | Function | <p>A [multiple element API object](/docs/features/element-api).</p><p>Pass the index-based position (Number) of the current tab as the only argument for `tabs.getRef`, and its returned function ref should be bound to the DOM element that serves as that tab.</p><p>It's recommended that you render the tabs with `v-for`, get the index from your `v-for` statement, and bind the function ref to the `v-for` element.</p> |
| `panels` | Function | <p>A [multiple element API object](/docs/features/element-api).</p><p>Pass the index-based position (Number) of the current panel as the only argument for `panels.getRef`, and its returned function ref should be bound to the DOM element that serves as that panel.</p><p>It's recommended that you render the panels with `v-for`, get the index from your `v-for` statement, and bind the function ref to the `v-for` element.</p> |
| `selected` | Object | This object has two properties: `tab` and `panel`. Each property stores a reactive reference to the index (Number) of the currently selected tab and panel, respectively. |
| `is` | Object | <p>This object has one property: `selected`, and `is.selected` is a nested object with two properties: `tab` and `panel`.</p><p>`is.selected.tab` and `is.selected.panel` are both functions that accept an index (Number) and return a boolean indicating whether or not the tab or panel at that index is currently selected.</p> |
| `select` | Object | <p>The `select` object has two properties: `tab` and `panel`.</p><p>`select.tab` and `select.panel` are both functions that accept an index (Number) and programmatically select the tab or panel at that index.</p><p>If `options.selectsPanelOnTabFocus` is `true`, `select.tab` will also update the selected panel, and `select.panel` will also update the selected tab.</p> |
| `navigateable` | Ref (Navigateable) | <p>The reactive [Navigateable](/docs/logic/classes/Navigateable) instance that powers `useTablist`s tab navigation.</p><p>All of `useTablist`s internal state will update reactively each time `navigateable.location` changes. This is useful when you need to control navigate with custom buttons or keyboard shortcuts.</p> |
:::

Note that some of these values store reactive references. Calling Vue's `readonly` function on `useTablist`s entire return value is recommended, so that all references are unwrapped, and all reactive values can be accessed directly, without using the `.value` property like you normally would on a reactive reference.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script>
import { readonly } from 'vue'
import { useTablist } from '@baleada/vue-features'

export default {
  setup () {
    const tablist = readonly(
      useTablist([options])
    )

    return { tablist }
  }
}
</script>
```
:::

Here's a more complete example of how to use your `tablist` and bind the various function refs:

:::
```html
<!-- MyComponent.vue -->
<template>
  <div :ref="tablist.label.ref">My Tablist</div>
  <div :ref="tablist.root.ref">
    <div
      v-for="({ tab }, index) in metadata"
      :key="tab"
      :ref="tablist.tabs.getRef(index)"
    >
      {{ tab }}
    </div>
    <div
      v-for="({ tab, panel }, index) in metadata"
      :key="tab"
      :ref="tablist.panels.getRef(index)"
    >
      {{ panel }}
    </div>
  </div>
</template>

<script>
import { ref, computed, readonly } from 'vue'
import { useTablist } from '@baleada/vue-features'

export default {
  setup () {
    const metadata = ref([
            { tab: 'Baleada', panel: '🌮' },
            { tab: 'Toolkit', panel: '🛠' },
            { tab: 'Poop', panel: '💩' },
          ]),
          tablist = readonly(
            useTablist()
          )
          
    return {
      metadata,
      tablist,
    }
  }
}
</script>
```
:::


:::
## Extend the tablist
:::

The following extensions are compatible with your textbox:
- [`useTablistStorage`](/docs/features/extensions/useTablistStorage)
- [`useSize`](/docs/features/extensions/useSize)
- [`useVisibility`](/docs/features/extensions/useVisibility)
- [`useLabel`](/docs/features/extensions/useLabel)
- [`useDescription`](/docs/features/extensions/useDescription)
- [`useDetails`](/docs/features/extensions/useDetails)
