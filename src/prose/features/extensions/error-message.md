---
title: Error message
tags: Composables
publish: true
order: 0
---

`useErrorMessage` is an extension that connects a textbox to the element that serves as its accessible error message.

In other words, `useErrorMessage` does the following:
- Generates a unique ID for the element that serves as your accessible error message, or retrieves a unique ID that you've already assigned to that element
- Assigns the unique ID to the [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage) property on your textbox element (e.g. an HTML text input)
- Conditionally displays the error message element, hiding it until invalid data is entered into the textbox
- Manages the `aria-invalid` attribute of your textbox, setting it to `true` when invalid data is detected


:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseErrorMessage.vue)

<ExampleUseErrorMessage class="with-mt" />


:::
## Create an error message
:::

To wire up an accessible error message, call the `useErrorMessage` function, which accepts two parameters:

::: ariaErrorMessage="useErrorMessage parameters" classes="wide-4"
| Parameter | Type | Required | ErrorMessage |
| --- | --- | --- | --- |
| `textbox` | Textbox | yes | <p>The return object from [`useTextbox`](/docs/features/interfaces/textbox), or a reactive reference to an HTML input or textarea</p> |
| `options` | Object | no | Passes customization options. See the next table for more guidance. |
:::

Here's a breakdown of the `useErrorMessage` options:

::: ariaLabel="useErrorMessage options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `validity` | StatusOption | no | `() => 'valid'` | <p>A [status option](/docs/features/shared/controlling-status) that should resolve to `valid` when the textbox root element's value is valid, and `invalid` when it is not valid.</p> |
| `transition` | Object | no | none | <p>An object with one property: `errorMessage`.</p><p>Pass an object to `transition.errorMessage`, specifying a transition or animation that `useErrorMessage` should apply the error message element as it enters and leaves visibility.</p><p>See the [How to format enter/leave transitions](/docs/features/affordances/show#how-to-format-enter-leave-transitions) section of the `show` docs for more guidance.</p> |
:::


:::
## Use your error message
:::

`useErrorMessage` returns `errorMessage`—an object with tools you can use to wire up an accessible error message.

Here's a breakdown of that object:

::: ariaErrorMessage="size breakdown" classes="wide-3"
| Property | Type | ErrorMessage |
| --- | --- | --- |
| `root` | Object | <p>A [single element API object](/docs/features/shared/element-api).</p><p>`root.ref` should be bound to the element that serves as your accessible error message.</p><p>`root` includes an `id` property.</p> |
:::


Here's an more complete example of how to use `useErrorMessage` with a [Baleada Features textbox](/docs/features/interfaces/textbox):

:::
```html
<template>
  <input type="text" :ref="textbox.root.ref" />
  <!--
    This error message needs to be properly connected to the input
    so that assistive technology understands their relationship.

    To make that work, we'll bind `errorMessage.root.ref` to the element's
    `ref` attribute.
  -->
  <p :ref="errorMessage.root.ref">Data is not valid because...</p>
</template>

<script setup>
import { useTextbox, useErrorMessage } from '@baleada/vue-features'

// Here, we'll set up a Baleada Features textbox.
const textbox = useTextbox()

// Then, we'll pass the textbox to `useErrorMessage`.
// We'll also use the `validity` option to watch the
// textbox's string, marking it as 'invalid' if it contains
// a number.
//
// With this done, assistive tech will understand
// that it should read our error message when the
// textbox's value is marked as invalid.
const errorMessage = useErrorMessage(
  textbox,
  {
    validity: {
      get: () => /\d/.test(textbox.text.value.string)
        ? 'invalid'
        : 'valid',
      watchSource: () => textbox.text.value.string,
    }
  }
)
</script>
```
:::
