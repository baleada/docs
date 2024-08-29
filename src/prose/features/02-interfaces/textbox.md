---
title: Textbox
source: useTextbox.ts
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::

`useTextbox` is a composable that controls native HTML inputs and textareas with reactive two-way binding for both the input's value and its selection metadata (start position, end position, and direction). `useTextbox` also provides an API for autocomplete operations and undo/redo history.

`useTextbox` uses [the `Completeable` class](/docs/logic/classes/Completeable) from Baleada Logic to control your input's value and selection, and to support autocomplete features.


:::
## Example
:::

<LayoutExample component="ExampleUseTextbox" />


:::
## Create a textbox
:::

To start using a controlled textbox, call the `useTextbox` function, which accepts one optional `options` object as its only parameter.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { useTextbox } from '@baleada/vue-features'

const textbox = useTextbox([options])
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useTextbox options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `initialValue` | String | no | `''` | The initial value that should be bound to your HTML input |
| `text` | Object | no | none | [Constructor options](/docs/logic/classes/Completeable#Completeable-constructor-options) for the `Completeable` instance created by `useTextbox` |
| `history` | Object | no | none | Options for the undo/redo history tracked by `useTextbox`. See the next table for more info. |
:::

As mentioned in the table above, `useTextbox` tracks an undo/redo history, whose behavior can be configured via the `options.history` object. See the [How your textbox manages undo/redo history](#how-your-textbox-manages-undo-redo-history) section for more general info, and see the table below for the optional properties of the `options.history` object:

::: ariaLabel="history options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `maxLength` | Number, `true` | no | `true` | <p>Limits the number of events that `useTextbox` can record in its undo/redo history.</p><p>Set `maxLength` to `true` to allow an infinite number of events.</p> |
:::


:::
## Use your textbox
:::

`useTextbox` returns `textbox`—an object with tools you can use to control your HTML input or textarea.

Here's a breakdown of that object:

::: ariaLabel="input breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `root` | Object | <p>A [single element API object](/docs/features/shared/element-api).</p><p>`root.ref` should be bound to the HTML input or textarea you want to control.</p> |
| `text` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useTextbox`.</p><p>See the [How to control value and selection](#how-to-control-value-and-selection) section for more guidance on `text` usage, and see the [Access state and methods](/docs/logic/classes/Completeable#access-state-and-methods) section of the `Completeable` docs for more guidance on how to use `text` to autocomplete text.</p> |
| `type(string)` | Function | <p>A function you can use to programmatically type in the textbox.</p><p>`type` requires one parameter: the new `string` to type into the textbox.</p><p>You can assign a new string to `text.value.string` to achieve the same effect, but `type` is a convenient shortcut.</p> |
| `select(selection)` | Function | <p>A function you can use to programmatically select text in the textbox.</p><p>`select` requires one parameter: the new `selection` object.</p><p>[See the `Completeable` docs](/docs/logic/classes/Completeable#access-state-and-methods) to learn what the shape of that `selection` object should be.</p><p>You can assign a new selection object to `text.value.selection` to achieve the same effect, but `select` is a convenient shortcut.</p> |
| `history` | Ref (Array) | <p>A reactive [`Navigateable`](/docs/logic/classes/Navigateable) instance that stores and navigates your undo/redo history.</p><p>See the [How your textbox manages undo/redo history](#how-your-textbox-manages-undo-redo-history) section for more info.</p> |
| `record(entry)` | Ref (Object) | <p>A function you can use to programmatically record new entries in your textbox's `history`.</p><p>`record` requires one parameter: a new history entry, which is an object with a `string` and `selection` property.</p><p>`string` is a plain string, and `selection` is a selection object as defined by [`Completeable`](/docs/logic/classes/Completeable).</p> |
| `undo(options)` | Function | <p>A function you can use to undo events and revert to a recorded state.</p><p>To undo more than one entry at a time, pass the optional `options` object, with the `options.distance` property indicating how many entries should be undone.</p><p>Note that `undo` is not exactly the same as calling `history`'s `previous` method—it's slightly more sophisticated and tailored to `useTextbox`'s specific use case.</p> |
| `redo(options)` | Function | <p>A function you can use to redo events and move forward to a recorded state.</p><p>To redo more than one entry at a time, pass the optional `options` object, with the `options.distance` property indicating how many entries should be redone.</p><p>Note that `redo` is not exactly the same as calling `history`'s `next` method—it's slightly more sophisticated and tailored to `useTextbox`'s specific use case.</p> |
| `rewrite(entries)` | Function | <p>A function you can use to rewrite `history`, replacing all of its current entries with an array of new entries.</p> |
:::

Here's a more complete example of how to use your `textbox` and bind the function ref:

:::
```html
<template>
  <input type="text" :ref="textbox.root.ref()" />
</template>

<script setup>
import { useTextbox } from '@baleada/vue-features'

const textbox = useTextbox([options])
</script>
```
:::

:::
### How to control value and selection
:::

As mentioned, `useTextbox` implements reactive two-way binding for both your input's value and its selected text. It stores the value and the selection metadata in `textbox.text`, a fully reactive `Completeable` instance.

With this tooling in place, here are the useful side effects that certain actions will have:

::: ariaLabel="actions and effects in useTextbox" class="wide-1 wide-2"
| Action | Side effect |
| --- | --- |
| The end user enters text into your HTML input | You can read that value in `textbox.text.value.string` |
| The end user selects text in your HTML input | You can read selection metadata in `textbox.text.value.selection` |
| You assign a new value to `textbox.text.value.string`, or you call the `type(...)` function | The HTML input's value will automatically update |
| You assign new selection metadata to `textbox.text.value.selection`, or you call the `select` method | Text will automatically be selected in the the HTML input (assuming the input is currently focused) |
| You use the `textbox.text.value.complete(...)` method to perform an autocomplete operation | <p>The HTML input's value will automatically update.</p><p>Also, the completed portion of text will be automatically selected, or you can [pass options to `complete`](/docs/logic/classes/Completeable#how-the-completeable-instance-completes-strings-and-computes-new-selections) if you'd rather automatically position the cursor right after the completed text.</p> |
:::


:::
### How your textbox manages undo/redo history
:::

`useTextbox` supports undo/redo functionality inspired by VS Code's undo/redo. This feature is much more thorough and flexible than browsers' default undo/redo for HTML inputs and textareas.

Users of your textbox can press `Command+Z` or `Control+Z` to undo, and `Command+Y` or `Control+Y` to redo. You can also call the `textbox.undo` and `textbox.redo` functions at any time to programmatically navigate history.

::: type="info"
If you extend your `textbox` with the `useTextboxStorage` extension, your textbox will update `localStorage` with its value and selection metadata each time a `history` entry is recorded.
:::

In most cases, you don't need to be concerned with how this undo/redo history is tracked, but just in case you need to watch changes or record new history events, your `textbox` object has a `history` property, which holds the reactive [`Navigateable`](/docs/logic/classes/Navigateable) instance that stores and navigates your history entries.

:::
```js
import { watchEffect } from 'vue'

const textbox = useTextbox()

watchEffect(() => console.log(textbox.history.value.location))
```
:::


:::
## Extend the textbox
:::

The following extensions are compatible with your textbox:
- [`useClosingCompletion`](/docs/features/extensions/closing-completion)
- [`useMarkdownCompletion`](/docs/features/extensions/markdown-completion)
- [`useTextboxStorage`](/docs/features/extensions/textbox-storage)
- [`useSize`](/docs/features/extensions/size)
- [`useVisibility`](/docs/features/extensions/visibility)
- [`useLabel`](/docs/features/extensions/label)
- [`useDescription`](/docs/features/extensions/description)
- [`useDetails`](/docs/features/extensions/details)
- [`useErrorMessage`](/docs/features/extensions/error-message)
