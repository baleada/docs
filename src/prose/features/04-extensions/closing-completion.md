---
title: Closing completion
source: useClosingCompletion.ts
publish: true
order: 0
---

`useClosingCompletion` is an [extension](/docs/features/extensions-overview) that autocompletes closing punctuation (e.g. brackets and quotes) in a textbox created by [`useTextbox`](/docs/features/interfaces/textbox).

For example, when the end user types `[`, the `]` will be autocompleted. Or, if they highlight text and type `(`, the highlighted text will be wrapped in opening and closing parentheses.


:::
## Example
:::

<LayoutExample component="ExampleUseClosingCompletion" />


:::
## Create closing completion
:::

To start autocompleting punctuation, call the `useClosingCompletion` function, which accepts two parameters:

::: ariaLabel="useClosingCompletion parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `textbox` | Textbox | yes | The return object from [`useTextbox`](/docs/features/interfaces/textbox). |
| `options` | Object | no | Passes customization options. See the next table for more guidance. |
:::

Here's a breakdown of the `useClosingCompletion` options:

::: ariaLabel="useClosingCompletion options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `only` | Array | no | See description | <p>An array of punctuation that should be autocompleted. Valid opening punctuation includes:</p><ul><li>`[`</li><li>`(`</li><li>`{`</li><li>`<`</li><li>`"`</li><li>`'`</li><li><code>\`</code></li></ul><p>The default `only` array includes all of those characters.</p> |
:::

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { useTextbox, useClosingCompletion } from '@baleada/vue-features'

const textbox = useTextbox(),
      closingCompletion = useClosingCompletion(textbox[, options])
</script>
```
:::


:::
## Use your closing completion
:::

`useClosingCompletion` returns `closingCompletion`—an object with tools you can use to perform and monitor autocompletion.

Here's a breakdown of that object:

::: ariaLabel="size breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `close(opening)` | Function | <p>A function you can use to programmatically autocomplete punctuation based on the current selection.</p><p>`close` requires one parameter: `opening`, the opening punctuation that should be autocompleted.</p><p>Given the `opening` punctuation, `close` will record a new entry with the autocompleted text into your [`textbox`'s undo/redo history](/docs/features/interfaces/textbox#how-your-textbox-manages-undo-redo-history), which in turn will update the value of your HTML text input or textarea.</p><p>`close` returns the closing punctuation character (String).</p> |
| `segmentedBySelection` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useClosingCompletion` to manage punctuation autocompletion.</p><p>See the [How autocompletion works](#how-autocompletion-works) section for more guidance on `segmentedBySelection` usage.</p> |
:::


:::
### How autocompletion works
:::

As mentioned above, the returned `closingCompletion` object has a `segmentedBySelection` property that holds the [`Completeable`](/docs/logic/classes/Completeable) instance that handles all of `closingCompletion`'s autocompletion logic.

Like all `Completeable` instances, this instance extracts a segment of your text, which it eventually replaces with autocompleted text.

This segment starts exactly where the end user's selection starts, and ends exactly where the end user's selection ends. If the end user types `Baleada` into your textbox, then highlights `Bal`, then `closingCompletion.segmentedBySelection.value.segment` will be `Bal`.

More importantly, if the end user highlights `Bal` and then types `[`, two things would happen:
- The textbox would autocomplete to `[Bal]eada` (wrapping the highlighted text in autocompleted punctuation)
- The selection range would update, so that only `Bal` is still highlighted

Play with the example near the top of this article to get a better sense of how that logic works.
