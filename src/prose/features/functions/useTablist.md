---
title: useTablist
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

::: ariaLabel="useTablist required" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `totalTabs` | Number, Ref (Number) | yes | none | <p>The total number of tabs in your tablist.</p><p>Note that when `totalTabs` is a reactive reference, computing the length of a reactive array, `useTablist` allows the number and order of tabs to change reactively. This is useful for example in spreadsheet apps, where the end user will be adding and deleting tabs, or dragging and dropping to reorder them.</p>
| `orientation` | String | yes | none | The visual direction of tabs. Must be `horizontal` or `vertical`. |
:::

And here's a breakdown of the `options` object:

::: ariaLabel="useTablist required" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `selectsPanelOnTabFocus` | Boolean | no | `true` | <p>Indicates whether or not tab panels are shown as soon as their tab is focused.</p><p>When `selectsPanelOnTabFocus` is `false`, panels are not shown until the end user clicks on a tab, or presses `Space` or `Enter` while focused on a tab.</p> |
| `openMenu` | Function | no | none | <p>Opens a context menu for a tab after the `openMenuKeycombo` is pressed.</p><p>As its only argument, your `openMenu` function will receive the index (Number) of the currently selected tab.</p> |
| `deleteTab` | Function | no | none | <p>Deletes one of the tabs when the `deleteTabKeycombo` is pressed.</p><p>As its only argument, your `deleteTab` function will receive the index (Number) of the currently selected tab.</p> |
| `label` | String | no | none | <p>A label for the tablist, to be read by screen readers.</p><p>Note that `label` is optional, but having an accessible label is not optional. If you don't provide a value for the `label` option, you'll need to add a label in the DOM. For those cases, there's more info below on how to tell `useTablist` which DOM element is your accessible label.</p> |
| `openMenuKeycombo` | Keycombo | no | `'shift+f10'` | Sets the keycombo that will cause `useTablist` to call your `openMenu` function. |
| `deleteTabKeycombo` | Keycombo | no | `'delete'` | Sets the keycombo that will cause `useTablist` to call your `deleteTab` function. |
| `transition` | Object | no | none | <p>An object with one property: `panel`.</p><p>Pass an object to `transition.panel`, specifying a transition or animation that `useTablist` should apply to each tab panel as they enter and leave visibility.</p><p>See the [How to format enter/leave transitions](/docs/features/affordances/useConditionalDisplay#how-to-format-enter-leave-transitions) section of the `useConditionalDisplay` docs for more guidance.</p> |
:::

:::
## Using the tablist
:::

`useTablist` returns a `tablist`—an object with tools you can use to connect `useTablist`'s UI logic to your markup.

Here's a breakdown of that object:

::: ariaLabel="tablist breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `tabs` | Function | <p>A function that returns a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for). Requires one argument: the `index` (Number) of the tab (e.g. the index provided by `v-for`).</p><p>Bind the returned function to the `ref` attribute of each DOM element that serves as a tab, or more commonly, bind to the single DOM element that has a `v-for` attribute and represents all of your tabs.</p> |
| `panels` | Function | <p>A function that returns a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for). Requires one argument: the `index` (Number) of the panel (e.g. the index provided by `v-for`).</p><p>Bind the returned function to the `ref` attribute of each DOM element that serves as a panel, or more commonly, bind to the single DOM element that has a `v-for` attribute and represents all of your panels.</p> |
| `root` | Function | <p>A function that returns a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for). Accepts no arguments.</p><p>Bind the returned function to the `ref` attribute of the DOM element that serves as your tablist's root.</p> |
| `navigateable` | Ref (Navigateable) | <p>The reactive [Navigateable](/docs/logic/classes/Navigateable) instance that powers `useTablist`'s tab navigation.</p><p>All of `useTablist`'s internal state will update reactively each time `navigateable.location` changes. This is useful when you need to control navigate with custom buttons or keyboard shortcuts.</p> |
| `selected` | Object | This object has two properties: `tab` and `panel`. Each property stores a reactive reference to the index (Number) of the currently selected tab and panel, respectively. |
| `label` | Function | <p>A function that returns a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for). Accepts no arguments.</p><p>Bind the returned function to the `ref` attribute of the DOM element that serves as your tablist's label.</p><p>The `label` property is **only** included in `useTablist`'s return object when the `label` option was not initially passed.</p> |
:::

Note that some of these values store reactive `ref`s. Calling Vue's `readonly` function on `useTablist`'s entire return value is recommended, so that all `ref`s are unwrapped, and all reactive values can be accessed directly, without using the `.value` property like you normally would on a `ref`.

Calling `readonly` instead of Vue's `reactive` function retains reactivity while emphasizing that you should not be mutating the `tablist` object through assignment. For any custom navigation, use the methods on the `navigateable` instance.

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
      useTablist(required[, options])
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
  <div :ref="tablist.label()">My Tablist</div>
  <div :ref="tablist.root()">
    <div
      v-for="({ tab }, index) in metadata"
      :key="tab"
      :ref="tablist.tabs(index)"
    >
      {{ tab }}
    </div>
    <div
      v-for="({ tab, panel }, index) in metadata"
      :key="tab"
      :ref="tablist.panels(index)"
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
            { tab: 'Yay', panel: '🎉' },
          ]),
          tablist = readonly(
            useTablist({
              totalTabs: computed(() => metadata.value.length),
              orientation: 'horizontal',
            })
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
