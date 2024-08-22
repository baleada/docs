---
title: Markdown completion
source: useMarkdownCompletion.ts
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::

`useMarkdownCompletion` is an extension that autocompletes markdown notation in a textbox created by [`useTextbox`](/docs/features/interfaces/textbox).


:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseMarkdownCompletion.vue)

<ExampleUseMarkdownCompletion class="with-mt" />


:::
## Create markdown completion
:::

To start autocompleting markdown, call the `useMarkdownCompletion` function, which requires one parameter:

::: ariaLabel="useMarkdownCompletion parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `textbox` | Textbox | yes | The return object from [`useTextbox`](/docs/features/interfaces/textbox). |
:::

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { useTextbox, useMarkdownCompletion } from '@baleada/vue-features'

const textbox = useTextbox(),
      markdownCompletion = useMarkdownCompletion(textbox)
</script>
```
:::


:::
## Use your markdown completion
:::

`useMarkdownCompletion` returns `markdownCompletion`—an object with tools you can use to perform and monitor autocompletion.

Here's a breakdown of that object:

::: ariaLabel="size breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `segmentedBySpace` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useMarkdownCompletion` to manage inline markdown autocompletion.</p><p>Inline markdown includes:</p><ul><li>bold</li><li>italic</li><li>superscript</li><li>subscript</li><li>strikethrough</li><li>code</li><li>link</li></ul> |
| `segmentedByNewline` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useMarkdownCompletion` to manage block-level markdown autocompletion.</p><p>Block-level markdown includes:</p><ul><li>codeblock</li><li>blockquote</li><li>ordered list</li><li>unordered list</li><li>checklist</li><li>heading</li><li>horizontal rule</li></ul> |
| `bold` | Function | <p>A function you can use to autocomplete bold text, i.e. wrap words in `**`.</p> |
| `italic` | Function | <p>A function you can use to autocomplete italic text, i.e. wrap words in `_`.</p> |
| `superscript` | Function | <p>A function you can use to autocomplete superscript text, i.e. wrap words in `^`.</p> |
| `subscript` | Function | <p>A function you can use to autocomplete subscript text, i.e. wrap words in `~`.</p> |
| `strikethrough` | Function | <p>A function you can use to autocomplete strikethrough text, i.e. wrap words in `~~`.</p> |
| `code` | Function | <p>A function you can use to autocomplete code text, i.e. wrap words in <code>`</code>.</p> |
| `link` | Function | <p>A function you can use to autocomplete a link.</p> |
| `codeblock` | Function | <p>A function you can use to autocomplete a codeblock, i.e. wrap a block of text in <code>```</code>.</p> |
| `blockquote` | Function | <p>A function you can use to programmatically convert one or more</p> |
| `orderedList` | Function | <p>A function you can use to autocomplete orderedList text</p> |
| `unorderedList` | Function | <p>A function you can use to autocomplete unorderedList text</p> |
| `checklist` | Function | <p>A function you can use to autocomplete checklist text</p> |
| `heading` | Function | <p>A function you can use to autocomplete heading text</p> |
| `horizontalRule` | Function | <p>A function you can use to autocomplete horizontalRule text</p> |
:::
