---
title: Controlling status
tags: Composables
publish: true
order: 0
---

Some interfaces and extensions in Baleada Features allow you to **control the status** of the elements that these composables keep track of internally.

You accomplish this by using **status options**: optional parameters that you can use to control status in a couple different ways.

The code you write to control status will be slightly different based on whether the composable is tracking a single element, or an array of multiple elements (usually rendered by `v-for`).

In this guide, we'll address each of those use cases separately.


:::
## Control the status of a single element
:::

Certain interfaces and extensions allow you to control the status of a single DOM element.

For example, the `useErrorMessage` extension, which is designed to show an accessible error message when a textbox contains invalid user input, allows you to control whether the textbox element (an HTML input or textarea) has a status of "valid" or "invalid".

You accomplish this by passing the `validity` status option.

Let's look at a commented code example, then go into more depth on the valid values that are supported for the `validity` status option.

:::
```html
<script setup>
import { useTextbox, useErrorMessage } from '@baleada/vue-features'

// First we'll create our textbox, which we'll pass into the
// `useErrorMessage` extension.
const textbox = useTextbox()

// We'll pass our textbox into the `useErrorMessage` extension,
// as the required first parameter. Then, we'll use the `validity`
// option to control the validity of our textbox.
const errorMessage = useErrorMessage(textbox, {
  validity: {
    // For this example, we'll define `validity` as an
    // object, with a `get` and a `watchSource` property.
    //
    // `get` will return 'invalid' if the value in the textbox
    // contains a string, and otherwise will return 'valid'.
    get: () => /\d/.test(textbox.text.value.string)
      ? 'invalid'
      : 'valid',
    // We'll  use the `watchSource` property to make sure
    // `validity` get re-computed each time the textbox's
    // value changes.
    watchSource: () => textbox.text.value.string,
  }
})

// Our error message is now tracking `validity` reactively. When
// `validity` is 'valid', `errorMessage` will hide the accessible
// error message. When `validity` is 'invalid', `errorMessage` will
// show the accessible error message, and set the `aria-invalid`
// attribute of our textbox to `true`.
<script>

<template>
  <!--
    In our template, we attached the function refs
    where they need to go, and we're all set.
  -->
  <input type="text" :ref="textbox.root.ref" />
  <p :ref="errorMessage.root.ref">No numbers allowed!</p>
</template>
```
:::

In that example, we formatted `validity` as a **reactive value getter**. If you've read the docs on [`bind`](/docs/features/affordances/bind#how-to-format-values), you'll recognize this data structure, but let's review it here again.

::: ariaLabel="reactive value getter breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `get` | Function | yes | none | <p>A "value getter": a callback function that should return the status of the single element whose status is being controlled.</p><p>`get` receives one argument: an object with an `element` property, where you can access the actual DOM element if needed.</p> |
| `watchSource` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass your reactive array of elements—that data is already watched automatically.</p><p>Each time an interface or extension detects a change in your watch source(s) (or the reactive reference to the single element), it will call `get` again to get the updated status.</p> |
:::

When you're controlling the status of a single element, it's also possible to just pass a **value getter** to the status option. In other words, you can just pass the reactive value getter's `get` callback, instead of passing an object. But the use cases for this are much rarer, so in most cases, you'll pass a reactive value getter.


:::
## Control the status of multiple elements
:::

Certain interfaces and extensions allow you to control the status of multiple DOM elements, rendered in a list, usually by `v-for`.

For example, the `useListbox` interface allows you to control whether each individual listbox option element has a status of "enabled" or "disabled".

You accomplish this by passing the `ability` status option.

Let's look at a commented code example, then go into more depth on the valid values that are supported for the `ability` status option.

:::
```html
<script setup>
import { options } from 'path/to/options'
import { useListbox } from '@baleada/vue-features'

// For this example, let's imagine that each `option` in
// our imported `options` array is an object, with a `value`
// and an `ability` property.
//
// `value` would be the actual value of the option, and
// `ability` would be 'enabled' or 'disabled'.
//
// Given this scenario, we can use the `ability` option to
// set up our listbox with certain options enabled or disabled.
const listbox = useListbox({
  // We'll use a value getter here. Our value getter will
  // get called for each element in the list of options, and
  // it will receive one argument containing the index of the
  // element being assessed.
  //
  // Given that index, our value getter can reach into the
  // `options` array and retrieve the enabled/disabled status.
  ability: ({ index }) => options[index].ability,
})

// Our listbox is now tracking `ability` for each element . When
// `ability` is 'enabled' for a given element, end users will be
// able to use their mouse or keyboard to select that option, and
// can use their keyboard to navigate to that element, transferring
// focus and making sure assistive tech reads the element's
// content.
<script>

<template>
  <!--
    In our template, we attach the function refs
    where they need to go, and we're all set.
  -->
  <ul :ref="listbox.root.ref">
    <li
      v-for="({ value }, index) in options"
      :key="value"
      :ref="listbox.options.getRef(index)"
    >
      {{ value }}
    </li>
  </ul>
</template>
```
:::

In that example, we formatted `ability` as a **value getter**. When you're controlling the status of a single element, this value getter is just a function that returns the element's status, but when you're controlling the status of multiple elements, your value getter receives one argument, which is an object.

Here's a breakdown of that object:

::: ariaLabel="get object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `element` | HTMLElement | The actual DOM element that the interface or extension is currently retrieving the status of. |
| `index` | Number | The index-based position (Number) of `element` in the rendered list of elements. |

The value getter works great for most use cases. In fact, if the rendered list of elements is shortened, lengthened, or reordered, the value getter will actually run again, computing an up-to-date status for each element in the list.

In some cases though, elements' status needs to change reactively based on other app state. In those cases, you can use a **reactive value getter**.

Here's some commented code to show how that works:

:::
```html
<script setup>
import { ref } from 'vue'
import { options } from 'path/to/options'
import { useListbox } from '@baleada/vue-features'

// For this example, let's imagine that `options` is an array of
// strings, and we're tracking the ability of each option in
// a reactive object.
//
// All options are enabled by default.
const ability = ref(
  options.reduce((ability, option) => {
    ability[option] = 'enabled'
    return ability
  }, {})
)

// Then, imagine we have some methods that can enable or
// disable individual options.
const enable = option => ability.value[option] = 'enabled'
const disable = option => ability.value[option] = 'disabled'

// Given this scenario, we can use the `ability` option to
// set up our listbox with certain options enabled or disabled.
const listbox = useListbox({
  // We'll use a reactive value getter here.
  ability: {
    // Our `get` function will look up the ability of each
    // option in the `ability` reactive object.
    get: ({ index }) => ability.value[options[index]],
    // Our `watchSource` tells `useListbox` that it should
    // re-compute enabled/disabled state each time the
    // `ability` reference changes reactively.
    watchSource: ability,
  }
})

// Our listbox is now tracking enabled/disabled status for each
// element, and will react to changes in the `ability` object.
<script>

<template>
  <!--
    In our template, we attach the function refs
    where they need to go.
  -->
  <ul :ref="listbox.root.ref">
    <li
      v-for="(option, index) in options"
      :key="option"
      :ref="listbox.options.getRef(index)"
    >
      {{ option }}
    </li>
  </ul>

  <!--
    And for this somewhat contrived use case, we'll 
    include buttons that can enable or disable any option
    reactively
  -->
  <div v-for="option in options" :key="option">
    <button @click="() => enable(option)">
      Enable {{ option }}
    </button>
    <button @click="() => disable(option)">
      Disable {{ option }}
    </button>
  </div>
</template>
```
:::


As you can see in the code example, a reactive value getter is an object. Here's a breakdown of that object when you're controlling status for multiple elements:

::: ariaLabel="reactive value getter breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `get` | Function | yes | none | A value getter, which receives an `element` and its `index` in its first argument object, and should return the status of that element. |
| `watchSource` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass your reactive array of elements—that data is already watched automatically.</p><p>Each time the interface or extension detects a change in your watch source(s) (or the reactive array of elements), it will iterate through your array of elements, calling `get` for each one to re-compute status.</p> |
:::
