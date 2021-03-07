---
title: bind
tags: Composition functions
publish: true
order: 0
---

`bind` is a function that can assign values to properties or attributes on DOM elements. It works with static values—assigning once—and reactive values—assigning each time the value changes.

::: type="info"
`bind` reimplements the `v-bind` affordance in Vue templates.

And yes, there's a difference between DOM element attributes and properties! The DOM APIs for reading and writing their values are different.

Just like Vue's `v-bind`, the `bind` affordance handles all that complexity internally, offering you a unified, consistent API instead.
:::

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleBind.vue)

<ExampleBind class="with-mt" />

:::
## Usage
:::

To bind static or reactive data to a DOM element, call the `bind` function, which requires one parameter: the `required` Object.

:::
```js
import { bind } from '@baleada/vue-features'

export default function myCompositionFunction (...) {
  bind(required)
}
```
:::

::: type="info"
Usually, you'll call `bind` from inside another composition function, but it also works in the `setup` function of any Vue component.
:::

Here's a breakdown of the `required` object:

::: ariaLabel="bind required object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `target` | Ref (HTMLElement), Array | yes | none | <p>A reactive reference to the DOM element you're binding data to.</p><p>`target` Can also be a reactive reference to an array of DOM elements. See the [How to format values](#how-to-format-values) section for more guidance on binding values to specific elements in a reactive array.</p> |
| `keys` | Object | yes | none | <p>The attributes or properties and values you want to bind to your element or elements.</p><p>See the [How to format the keys object](#how-to-format-the-keys-object) section for more guidance.</p> |
:::


:::
### How to format the keys object
:::

The value of the `keys` property of the `required` parameter is an object. The keys of that object must be DOM element attributes (e.g. `aria-label`) or DOM element properties (e.g. `value`) that you'll be binding data to:

:::
```js
import { bind } from '@baleada/vue-features'

export default function myCompositionFunction (...) {
  bind({
    target: myElement,
    keys: {
      ariaLabel: ...,
      class: ...,
      style_backgroundColor: ...,
    }
  })
}
```
:::


:::
#### How to format individual keys
:::

Here are the rules `bind` follows when reading the keys on the `keys` object:

If the key starts with `aria` or `data`, followed by a capital letter, `bind` binds to the correct `aria-` or `data-` attribute.

:::
```js
bind({
  ...
  keys: {
    // Binds to aria-label
    ariaLabel: ...,
    // Binds to data-name
    dataName: ...,
  }
})
```
:::

If the key is one of the values from the list below, `bind` binds to the correct DOM property:

::: ariaLabel="map of attribute and property names"
| Key | DOM element property |
| --- | --- |
| `for` | `htmlFor` |
| `allowfullscreen` | `allowFullscreen` |
| `formnovalidate` | `formNoValidate` |
| `ismap` | `isMap` |
| `nomodule` | `noModule` |
| `novalidate` | `noValidate` |
| `readonly` | `readOnly` |
:::

:::
```js
bind({
  ...
  keys: {
    // bind sets the htmlFor property
    for: ...,
  }
})
```
:::

If the key is `class` or `rel`, `bind` binds to `classList` or `relList`. Existing values in those lists are preserved, while your reactive values are added and removed as needed:

:::
```js
bind({
  ...
  keys: {
    // bind adds to and removes from classList,
    // respecting existing values
    class: ...,
    // bind adds to and removes from relList,
    // respecting existing values
    rel: ...,
  }
})
```
:::

If the key starts with `style_`, `bind` binds to `style.` + whatever follows the underscore:

:::
```js
bind({
  ...
  keys: {
    // Binds to style.backgroundColor
    style_backgroundColor: ...,
  }
})
```
:::

For all other keys, `bind` binds to the property or attribute exactly as it's written:

:::
```js
bind({
  ...
  keys: {
    // Binds to the id property
    id: ...,
    // Binds to the aria-label attribute
    'aria-label': ...,
  }
})
```
:::

::: type="warning"
Setting `innerHTML` is out of Baleada Features' scope. Using `bind` with `innerHTML` is possible in some cases, but not recommended, since Baleada Features doesn't include security measures or edge case handling for this kind of work.

Also, it's technically possible to bind to event properties like `onclick`. However, `bind` intentionally doesn't do any cleanup for these event handlers, and will cause memory leaks. To add event listeners that will be automatically cleaned up and more efficiently implemented, use the [`on`](/docs/features/affordances/on.md) or [`naiveOn`](/docs/features/affordances/naiveOn.md) affordance instead.
:::


:::
#### How to format values
:::

There are several different ways to format the values that `bind` binds to the keys you specified.

The simplest type of value is a plain String, Number, or Boolean:

:::
```js
bind({
  ...
  keys: {
    id: 'my-number-input',
    ariaHidden: false,
    value: 0,
  }
})
```
:::

When you pass plain data like this, `bind` sets the DOM element's attribute or property once, then leaves it alone.

In most cases though, some of those values will be reactive references to Strings, Numbers, or Booleans:

:::
```js
import { ref } from 'vue'

const numberInputValue = ref(0)

bind({
  ...
  keys: {
    ...
    value: numberInputValue,
  }
})
```
:::

When the value is reactive (i.e. a `ref` or `computed` value), `bind` automatically watches it for changes, and sets the DOM element's attribute or property each time a change is detected.

But what about when the `target` is a reactive array of elements, rather than a single reactive element reference? How do we make sure the correct data is bound to each element?

When you're binding static data, you can pass the **target closure** instead of a standard value. The target closure is a callback function that receives an object as its only argument. Here's a breakdown of that object:

::: ariaLabel="targetClosure object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `target` | HTMLElement | The actual DOM element that `bind` is currently binding data to. |
| `index` | Number | The index (Number) of `target` in your reactive array of elements. |
:::

Your target closure should return the value that `bind` should bind to the specific `target`.

Here's an example of how [`useTablist` ](/docs/features/functions/useTablist) uses this feature to set the `aria-labelledby` attribute for each tab panel to the ID of the corresponding tab panel. Theses IDs never change, so `aria-labelledby` does not need to be reactive:

:::
```js
export default function useTablist (...) {
  bind({
    // Reactive array of tab panel elements
    target: panels.targets,
    keys: {
      // Each element's aria-labelledby holds the ID of
      // its associated tab element.
      //
      // The tabIds array and panels.targets array are
      // guaranteed to always be in matching order,
      // so it's safe to simply pick the tabId whose index
      // matches the index passed to the target closure.
      ariaLabelledby: ({ index }) => tabIds.value[index],
    },
  })


  ...
}

```
:::

But what about when the data _is_ reactive, but still needs to be bound to an array of elements? For those cases, you can pass an Object as the key's value:

:::
```js
bind({
  target: myReactiveArrayOfElements,
  keys: {
    ariaHidden: { ... },
  }
})
```
:::

Here's a breakdown of that object:

::: ariaLabel="targetClosure object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `targetClosure` | Function | yes | none | A target closure, as described above. |
| `watchSources` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass the reactive array of elements—that data is already watched automatically.</p><p>Each time `bind` detects a change in your watch sources (or the reactive array of elements), it will iterate through your array of elements, calling the `targetClosure` for each one.</p> |
:::

Here's an example of how [`useTablist` ](/docs/features/functions/useTablist) uses this feature to manage the `aria-hidden` attribute on its array of tab panels, setting `false` for the hidden tabs and `true` for the currently selected tab:

:::
```js
export default function useTablist (...) {
  bind({
    // Reactive array of tab panel elements
    target: panels.targets,
    keys: {
      // selectedPanel is a reactive reference to the index 
      // of the currently selected tab panel.
      //
      // aria-hidden should be true for all panels whose
      // index doesn't match selectedPanel, and should be
      // false for the one panel whose index is a match.
      //
      // This targetClosure should run again each time
      // selectedPanel changes.
      ariaHidden: {
        targetClosure: ({ index }) => index !== selectedPanel.value,
        watchSources: selectedPanel,
      },
    },
  })
}
```
:::

