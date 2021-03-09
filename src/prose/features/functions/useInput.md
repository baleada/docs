---
title: useInput
tags: Composition functions
publish: true
order: 0
---

`useInput` is a composition function that controls native HTML inputs with reactive two-way binding for both the input's value and its selection metadata (start position, end position, and direction). `useInput` also provides an API for autocomplete operations.

::: type="info"
`useInput` uses [the `Completeable` class](/docs/logic/classes/Completeable) from Baleada Logic to control your input's value and selection, and to support autocomplete features.
:::


:::
## Creating an input
:::

To start using a controlled input, call the `useInput` function, which accepts one optional `options` object as its only parameter.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script>
import { useInput } from '@baleada/vue-features'

export default {
  setup () {
    const input = useInput([options])
  }
}
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useInput options" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `initialValue` | String | no | `''` | The initial value that should be bound to your HTML input |
| `completeable` | Object | no | none | [Constructor options](/docs/logic/classes/Completeable#Completeable-constructor-options) for the `Completeable` instance created by `useInput` |
:::


:::
## Using the input
:::

`useInput` returns `input`—an object with tools you can use to control your HTML input.

Here's a breakdown of that object:

::: ariaLabel="input breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `element` | Object | <p>A [single target API object](/docs/features/target-api).</p><p>`element.ref` should be called with no arguments, and its returned function ref should be bound to the HTML input you want to control.</p> |
| `completeable` | Ref (Object) | <p>The reactive `Completeable` instance created by `useInput`.</p><p>See the [How to control value and selection](#how-to-control-value-and-selection) section for more guidance on `completeable` usage, and see the [Access state and methods](/docs/logic/classes/Completeable#access-state-and-methods) section of the `Completeable` docs for more guidance on how to use `completeable` to autocomplete text.</p> |
:::

Here's a more complete example of how to use your `input` and bind the function ref:

:::
```html
<template>
  <input type="text" :ref="input.element.ref()" />
</template>

<script>
import { useInput } from '@baleada/vue-features'

export default {
  setup () {
    const input = useInput()

    return { input }
  }
}
</script>
```
:::

:::
### How to control value and selection
:::

As mentioned, `useInput` implements reactive two-way binding for both your input's value and its selected text. It stores the value and the selection metadata in `input.completeable`, a fully reactive `Completeable` instance.

With this tooling in place, here are the useful side effects that certain actions will have:

::: ariaLabel="actions and effects in useInput" class="wide-1 wide-2"
| Action | Side effect |
| --- | --- |
| The end user enters text into your HTML input | You can read that value in `input.completeable.value.string` |
| The end user selects text in your HTML input | You can read selection metadata in `input.completeable.value.selection` |
| You assign a new value to `input.completeable.value.string` | The HTML input's value will automatically update |
| You assign new selection metadata to `input.completeable.value.selection` | Text will automatically be selected in the the HTML input (assuming the input is currently focused) |
| You use the `input.completeable.value.complete(...)` method to perform an autocomplete operation | <p>The HTML input's value will automatically update.</p><p>Also, the completed portion of text will be automatically selected, or you can [pass options to `complete`](/docs/logic/classes/Completeable#how-the-completeable-instance-completes-strings-and-computes-new-selections) if you'd rather automatically position the cursor right after the completed text.</p> |
:::
