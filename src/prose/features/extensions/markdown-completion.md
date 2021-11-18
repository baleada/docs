---
title: Markdown completion
tags: Composition functions
publish: true
order: 0
---

`useMarkdownCompletion` is an extension that autocompletes markdown notation in a textbox created by [`useTextbox`](/docs/features/interfaces/useTextbox).


:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseMarkdownCompletion.vue)

<ExampleUseMarkdownCompletion class="with-mt" />


:::
## Create markdown completion
:::

To start autocompleting markdown, call the `useMarkdownCompletion` function, which accepts one parameter:

::: ariaLabel="useMarkdownCompletion parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `textbox` | Textbox | yes | The return object from [`useTextbox`](/docs/features/interfaces/useTextbox). |
:::

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script>
import { useTextbox, useMarkdownCompletion } from '@baleada/vue-features'

export default {
  setup () {
    const textbox = useTextbox(),
          markdownCompletion = useMarkdownCompletion(textbox)

    return { ... }
  }
}
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
| `inline` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useMarkdownCompletion` to manage inline markdown autocompletion.</p><p>Inline markdown includes:</p><ul><li>bold</li><li>italic</li><li>superscript</li><li>subscript</li><li>strikethrough</li><li>code</li><li>link</li></ul> |
| `block` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useMarkdownCompletion` to manage block-level markdown autocompletion.</p><p>See the [How autocompletion works](#how-autocompletion-works) section for more guidance on `completeable` usage.</p> |
| `bold` | Function | <p>A function you can use to autocomplete bold text, i.e. wrap words in `**`.</p> |
| `italic` | Function | <p>A function you can use to autocomplete italic text, i.e. wrap words in `_`.</p> |
| `superscript` | Function | <p>A function you can use to autocomplete superscript text, i.e. wrap words in `^`.</p> |
| `subscript` | Function | <p>A function you can use to autocomplete subscript text, i.e. wrap words in `~`.</p> |
| `strikethrough` | Function | <p>A function you can use to autocomplete strikethrough text, i.e. wrap words in `~~`.</p> |
| `code` | Function | <p>A function you can use to autocomplete code text, i.e. wrap words in <code>`</code>.</p> |
| `link` | Function | <p>A function you can use to autocomplete a link.</p> |
| `codeblock` | Function | <p>A function you can use to autocomplete a codeblock, i.e. wrap a block of text in <code>```</code>.</p> |
| `blockquote` | Function | <p>A function you can use to programmatically convert one or more |
| `orderedList` | Function | <p>A function you can use to autocomplete orderedList text |
| `unorderedList` | Function | <p>A function you can use to autocomplete unorderedList text |
| `checklist` | Function | <p>A function you can use to autocomplete checklist text |
| `heading` | Function | <p>A function you can use to autocomplete heading text |
| `horizontalRule` | Function | <p>A function you can use to autocomplete horizontalRule text |

| `close` | Function | <p>A function you can use to programmatically autocomplete punctuation based on the current selection.</p><p>`close` accepts one argument: `opening`, the opening punctuation that should be autocompleted.</p><p>Given the `opening` punctuation, `close` will record a new entry with the autocompleted text into your [`textbox`'s undo/redo history](/docs/features/interfaces/useTextbox#how-your-textbox-manages-undo-redo-history), which in turn will update the value of your HTML text input or textarea.</p><p>`close` returns the closing punctuation character (String).</p> |
| `completeable` | Ref ([`Completeable`](/docs/logic/classes/Completeable)) | <p>The reactive `Completeable` instance created by `useMarkdownCompletion` to manage punctuation autocompletion.</p><p>See the [How autocompletion works](#how-autocompletion-works) section for more guidance on `completeable` usage.</p> |
:::


:::
### How autocompletion works
:::

As mentioned above, the returned `markdownCompletion` object has a `completeable` property that holds the [`Completeable`](/docs/logic/classes/Completeable) instance that handles all of `markdownCompletion`'s autocompletion logic.

Like all `Completeable` instances, this instance extracts a segment of your text, which it eventually replaces with autocompleted text.

By default, this segment starts exactly where the end user's selection starts, and ends exactly where the end user's selection ends. If the end user types `Baleada` into your textbox, then highlights `Bal`, then `markdownCompletion.completeable.value.segment` will be `Bal`.

More importantly, if the end user highlights `Bal` and then types `[`, two things would happen:
- The textbox would autocomplete to `[Bal]eada` (wrapping the highlighted text in autocompleted punctuation)
- The selection range would update, so that only `Bal` is still highlighted

Feel free to play with the example near the top of this article to get a better sense of how that example works.

In some cases, you might want your textbox to wrap the entirety of the closest word in punctuation, rather than wrapping exactly the selected text and nothing more.

To achieve that effect, you can configure the underlying `Completeable` instance to look for the nearest whitespace when it extracts the segment:

:::
```js
import { useTextbox, useMarkdownCompletion } from '@baleada/vue-composition'

const textbox = useTextbox(),
      markdownCompletion = useMarkdownCompletion(textbox, {
        completeable: {
          segment: {
            from: 'divider',
            to: 'divider',
          },
          divider: /\s/,
        }
      })
```
:::

With that configuration, the end user can type `Baleada`, then highlight `Bal`, and finally type `[` to get the following effect:
- The textbox would autocomplete to `[Baleada]`, wrapping the entire word in punctuation
- The selection range would update, so that `Baleada` (the full text inside the punctuation) is highlighted
