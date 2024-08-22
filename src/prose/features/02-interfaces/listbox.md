---
title: Listbox
source: useTablist.ts
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::

`useListbox` is a composable that implements the UI logic needed for a reactive, accessible listbox interface.

It follows [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox) and allows you to easily customize accessibility features.

::: type="info"
`useListbox` uses [Baleada Logic's `Navigateable` class](/docs/logic/classes/Navigateable) internally to manage option navigation, and [Baleada Logic's `Pickable` class](/docs/logic/classes/Pickable) to manage the selected option(s).
:::

::: type="success"
For a ✨111-page✨ deep dive in to the patterns, concepts, and Vue 3 best practices behind Baleada Features, with `useListbox` as an in-depth, real world use case, [check out "Rethinking Reusability in Vue"](https://rethinking-reusability-in-vue.alexvipond.dev).

Use code **BALEADA** for $15 off!
:::

:::
## Features
:::

Here's a breakdown of all the features offered by `useListbox`:

::: ariaLabel="useListbox features by category"
| Feature | Details |
| --- | --- |
| Listbox basics | <ul><li>Supports single, multiple, and no selection</li><li>Compatible with assistive technology</li><li>Typeahead—with optional fuzzy matching—to quickly transfer focus</li><li>Supports enabled/disabled option state, even if that state changes reactively with user interaction</li><li>Support for complex options, with help from the [`useLabels`](/docs/features/extensions/labels) extension</li></ul> |
| Reactivity | <ul><li>Focused option and selected option(s) are tracked and controlled reactively</li><li>Via the return object, you can read and watch reactive references to the focused option and selected option(s)</li><li>Via the return object, you can access methods that intelligently mutate the focused option and selected option(s)</li><li>Keyboard interactions adjust their behavior based on reactive changes to options' enabled/disabled state</li><li>Reactively disabled options are automatically deselected</li><li>Focused option and selected option(s) automatically update if option elements are reactively reordered</li></ul> |
| ARIA attribute management | <ul><li>`role`</li><li>`aria-orientation`</li><li>`aria-multiselectable`</li><li>`aria-selected`</li><li>`aria-disabled`</li><li>`aria-owns`</li></ul> |
| Keyboard interaction | <ul><li>Arrow keys transfer focus to the next or previous [eligible](/docs/features/shared/eligible-focus) option (up and down for vertical listboxes, left and right for horizontal listboxes)</li><li>Keyboard interaction is compatible with listboxes whose options are divided into multiple groups.</li><li>`Home`, `End`, and `Command/Control + arrow` transfers focus to the first or last eligible option</li><li>`mousedown`, `touchstart`, `Space` and `Enter` select the focused option, if it's eligible and not selected</li><li>`mousedown`, `touchstart`, `Space` and `Enter` deselect the focused option, if it's selected</li><li>`esc` deselects all options</li></ul> |
| Keyboard interaction for multiselectable listboxes | <ul><li>`Shift + arrow` adds the next or previous eligible option to the selection</li><li>`Shift + Command/Control + arrow` adds all preceding or all following eligible options to the selection</li><li>`Command/Control + A` selects all eligible options</li></ul> |
:::


:::
## Example
:::

:::
### Single select
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseListboxSingle.vue)

<ExampleUseListboxSingle class="with-mt" />


:::
### Multiselect
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseListboxMulti.vue)

<ExampleUseListboxMulti class="with-mt" />





:::
## Create a listbox
:::

To create a listbox, call the `useListbox` function, which accepts one optional `options` object as its only parameter.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { useListbox } from '@baleada/vue-features'

const listbox = useListbox([options])
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useListbox options" classes="wide-4 wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `multiselectable` | Boolean | no | `false` | Indicates whether or not the listbox supports multiple selections. |
| `initialSelected` | Number, Array | no | `0` | <p>The index-based position of the option that should be initially selected.</p><p>For multiselectable listboxes, `initialSelected` can also be an array of index-based positions for multiple selected options.</p> |
| `ability` | StatusOption | no | `() => 'enabled'` | <p>A [status option](/docs/features/shared/controlling-status) that should resolve to `enabled` for each enabled option, and `disabled` for each disabled option.</p><p>`useListbox` uses this information to decide which options are eligible to receive focus and/or be selected.</p> |
| `orientation` | String | no | `horizontal` | Indicates the orientation of the listbox. For horizontal listboxes, left and right arrow keys will transfer focus, and for vertical listboxes, up and down arrow keys will transfer focus. |
| `selectsOnFocus` | Boolean | no | `true` | Indicates whether or not options should be selected as soon as they are focused |
| `loops` | Boolean | no | `true` | Indicates whether or not your listbox should "loop around" to the beginning of the list after reaching the end, and vice versa. |
| `disabledOptionsReceiveFocus` | Boolean | no | `true` | <p>Indicates whether or not your listbox can transfer focus to disabled options.</p><p>If you set `disabledOptionsReceiveFocus` to `false`, you should be confident that assistive tech users don't need or want to read the labels of disabled options, or that they have another way to access that content.</p><p>Note that even when `disabledOptionsReceiveFocus` is `true`, it's never possible to select disabled options.</p> |
| `toCandidate(param)` | Function | no | `({ element }) => element.textContent` | <p>A callback function that helps your listbox's typeahead feature retrieve searchable text from each option.</p><p>When the end user starts typing a query, your listbox will iterate through the listbox options, calling `toCandidate` for each one to retrieve the "search candidate" text.</p><p>`toCandidate` receives one argument: an object with an `element` property and an `index` property. `element` holds the listbox option's actual DOM element, and `index` holds the option's index-based position in your array of options.</p> |
| `queryMatchThreshold` | Number | no | `1` | <p>Configures fuzzy matching for the typeahead feature.</p><p>`queryMatchThreshold` should be a number from `0` to `1`. When `queryMatchThreshold` is `1`, your listbox's typeahead will only transfer focus to an option that is an exact match for the typeahead's query. A numbers less than `1` will be increasingly less strict, ignoring slight typos and query mistakes when it transfers focus.</p> |
| `needsAriaOwns` | Boolean | no | `false` | <p>Indicates whether or not your listbox needs to manage the [`aria-owns`](https://www.w3.org/TR/wai-aria/#aria-owns) attribute automatically.</p><p>`needsAriaOwns` should only be `true` if the structure of your HTML markup does **not** define a clear relationship between the listbox root element and the listbox options.</p> |
:::


:::
## Use your listbox
:::

`useListbox` returns a `listbox`—an object with tools you can use to connect `useListbox`'s UI logic to your markup.

Here's a breakdown of that object:

::: ariaLabel="listbox breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `root` | Function | <p>A [single element API object](/docs/features/shared/element-api).</p><p>`root.ref` should be bound to the DOM element that serves as your listbox's root.</p> |
| `options` | Function | <p>A [multiple element API object](/docs/features/shared/element-api).</p><p>Pass the index-based position (Number) of the current option as the only argument for `options.ref`, and its returned function ref should be bound to the DOM element that serves as that option.</p><p>It's recommended that you render the options with `v-for`, get the index from your `v-for` statement, and bind the function ref to the `v-for` element.</p> |
| `focused` | Ref (Number) | A reactive reference to the index-based position of the currently focused option |
| `selected` | Ref (Number), Ref (Array) | <p>A reactive reference to the index-based position of the currently selected option</p><p>For multiselectable listboxes, `selected` will be an array of numbers, indicating the index-based positions of all selected options, in the order they were selected.</p> |
| `is` | Object | <p>An object with two properties: `focused` and `selected`.</p><p>Each property holds a method that requires an index (Number) as its only parameter.</p><p>Given the index, `is.focused` returns a boolean indicating whether or not that option is focused, and `is.selected` returns a boolean indicating whether or not that option is selected.</p><p>`is.focused` and `is.selected` read from reactive references, so their boolean return values are fully reactive when used in Vue templates, watchers, and computed references.</p> |
| `getStatuses(index)` | Function | <p>A function that requires an index (Number) as its only parameter, and returns a three-item array indicating the statuses (Strings) of the option at that index.</p><p>The first item will be `focused` or `blurred`, the second item will be `selected` or `deselected` and the third item will be `enabled` or `disabled`.</p> |
| `focus` | Object | <p>An object containing all the methods described in the [eligible focus guide](/docs/features/shared/eligible-focus).</p><p>You can use these methods to programmatically transfer focus in a smarter way, taking enabled/disabled state and other customizable conditions into account.</p> |
| `select` | Functions | <p>An object containing all the methods described in the [eligible picking guide](/docs/features/shared/eligible-picking).</p><p>You can use these methods to programmatically select options in a smarter way, taking enabled/disabled state and other customizable conditions into account.</p><p>Note that if you have a multiselectable listbox you can optionally pass an array of index-based positions to the `select.exact` method to programmatically select multiple eligible options.</p> |
| `deselect(indexOrIndices)` | Function | <p>A function that deselects an option.</p><p>For single select listboxes, `deselect` does not accept any parameters.</p><p>For multiselect listboxes, you can either pass a single index-based position (Number) to deselect one option, or pass an array of indices to deselect multiple options, or pass no arguments to deselect all currently selected options.</p> |
:::

Here's a more complete example of how to use your `listbox` and bind the various function refs:

:::
```html
<!-- MyComponent.vue -->
<template>
  <div :ref="listbox.root.ref()">
    <div
      v-for="(option, index) in options"
      :key="option"
      :ref="listbox.options.ref(index)"
    >
      {{ option }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useListbox } from '@baleada/vue-features'

const options = ref([
  'Educate Girls',
  'Kheyti',
  'One Heart Worldwide',
])

const listbox = useListbox()
</script>
```
:::


:::
## Extend the listbox
:::

The following extensions are compatible with your textbox:
- [`useListboxStorage`](/docs/features/extensions/listbox-storage)
- [`useSize`](/docs/features/extensions/size)
- [`useVisibility`](/docs/features/extensions/visibility)
- [`useLabel`](/docs/features/extensions/label)
- [`useDescription`](/docs/features/extensions/description)
- [`useDetails`](/docs/features/extensions/details)
