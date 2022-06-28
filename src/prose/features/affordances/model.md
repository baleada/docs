---
title: model
tags: Composables
publish: true
order: 0
---

`model` is a function that creates two-way data binding between a DOM element and your reactive reference.

::: type="info"
`model` reimplements the `v-model` affordance from Vue templates. Under the hood, it uses the [`bind`](/docs/features/affordances/bind) and [`on`](/docs/features/affordances/on) affordances.
:::


:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleModel.vue)

<ExampleModel class="with-mt" />

:::
## Usage
:::

To create two-way binding, call the `model` function, which requires two parameters: the element you're binding data to, and the model value—a reactive reference where `model` can read and write the stored value.

`model` also accepts an optional `options` object as its final parameter.

:::
```js
import { model } from '@baleada/vue-features'

export default function myCompositionFunction (...) {
  model(element, modelValue[, options])
}
```
:::

::: type="info"
Usually, you'll call `model` from inside another composable, but it also works in the `setup` function of any Vue component.
:::

Here's a breakdown of the required parameters:

::: ariaLabel="model required object breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `element` | Ref (HTMLElement) | yes | none | <p>A reactive reference to the DOM element you're modeling data to.</p><p>Unlike other Baleada Features affordances, which let you pass an array of DOM elements as the first parameter, `model` only accepts a reactive reference to a single DOM element.</p> |
| `modelValue` | Ref | yes | none | The reactive reference where `model` will read and write the two-way bound data. |
:::

And here's a breakdown of the `options` object:

::: ariaLabel="model required object breakdown" classes="wide-4 wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `key` | String | no | `value` | The DOM element's attribute or property where data should be bound. |
| `event` | String | no | `input` | The event that `model` should listen for on the DOM element to detect when new data has been entered by the end user |
| `toValue` | Function | no | `({ target: { value } }) => value` | A function that accepts your DOM event as its first and only parameter, and should return the value that `model` should store in the `required.modelValue` reactive reference |
:::

Here's an example of how you could create two-way data binding on an HTML text input:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { ref } from 'vue'
import { model } from '@baleada/vue-features'

// Set up the DOM element ref and the value ref
const input = ref(null),
      modelValue = ref('')

// Pass those reactive references to model
model(input, modelValue)
</script>

<template>
  <!--
    Attach the template ref to an element, and wait for 
    user input!

    In this example, as soon as the 'input' event fires,
    event.target.value will be stored in your `modelValue` reactive
    reference, then `model` will set that value as the HTML
    input's new value.

    You can also programmatically assign a new value to your
    `modelValue` reactive reference, and `model` will update the
    HTML input's value automatically.
  -->
  <input ref="input" />
</template>
```
:::

Here's an example of how you would use `option` to customize `model`'s behavior to work with a `checkbox` input:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { ref } from 'vue'
import { model } from '@baleada/vue-features'

// Set up the DOM element ref and the value ref
const input = ref(null),
      modelValue = ref(false)

// Pass those reactive references to model
model(
  input,
  modelValue,
  // Use options to make sure `model` is modelling the boolean `checked`
  // property of the input, instead of grabbing the `value` property
  // by default.
  { toValue: event => event.target.checked }
)
</script>

<template>
  <!--
    Attach the template ref to an element, and wait for 
    user input!
  -->
  <input type="checked" ref="input" />
</template>
```
:::
