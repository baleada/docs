---
title: useBindings
tags: Composition functions
publish: true
order: 0
---

`useBindings` is a composition function that can assign values to attributes on DOM elements. It works with static values—assigning to the attribute once—and reactive values—assigning to the attribute each time the value changes.

::: type="info"
`useBindings` reimplements the `v-bind` feature affordance in Vue templates.
:::

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseBindings.vue)

<ExampleUseBindings class="with-mt" />

:::
## Using bindings
:::

To bind static or reactive data to a DOM element, call the `useBindings` function, which requires one parameter: the `required` Object.

:::
```js
import { useBindings } from '@baleada/vue-features/affordances'

export default function myCompositionFunction (...) {
  useBindings(required)
}
```
:::

::: type="info"
Usually, you'll call `useBindings` from inside another composition function, but it also works in the `setup` function of any Vue component.
:::

Here's a breakdown of the `required` object:

::: ariaLabel="useBindings required object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `target` | Ref (HTMLElement), Array | yes | none | <p>A reactive reference to the DOM element you're binding data to.</p><p>`target` Can also be a reactive reference to an array of DOM elements. See the [How to format bindings](#how-to-format-bindings) section for more guidance on binding values to specific elements in a reactive array.</p> |
| `bindings` | Object | yes | none | <p>The properties and values you want to bind to your element or elements.</p><p>See the [How to format bindings](#how-to-format-bindings) section for more guidance.</p> |
:::


:::
### How to format bindings
:::

The `bindings` property of the `required` parameter stores an object. The properties of that object must be DOM element attributes that you'll be binding data to:

:::
```js
import { useBindings } from '@baleada/vue-features/affordances'

export default function myCompositionFunction (...) {
  useBindings({
    target: myElement,
    bindings: {
      ariaLabel: ...,
      class: ...,
      style_backgroundColor: ...,
    }
  })
}
```
:::


:::
#### How to format properties
:::

Here are the rules `useBindings` follows when reading those properties:



If the property  starts with `aria` or `data`, followed by a capital letter, `useBindings` binds to the correct `aria-` or `data-` attribute

:::
```js
useBindings({
  ...
  bindings: {
    // Binds to aria-label
    ariaLabel: ...,
    // Binds to data-name
    dataName: ...,
  }
})
```
:::

If the property is `for`, `useBindings` binds to `htmlFor`:

:::
```js
useBindings({
  ...
  bindings: {
    // useBindings sets the htmlFor attribute
    for: ...,
  }
})
```
:::

If the property is `class` or `rel`, `useBindings` binds to `classList` or `relList`. Existing values in those lists are preserved, while your reactive values are added and removed as needed:

:::
```js
useBindings({
  ...
  bindings: {
    // useBindings adds to and removes from classList,
    // respecting existing values
    class: ...,
    // useBindings adds to and removes from relList,
    // respecting existing values
    rel: ...,
  }
})
```
:::

If the property starts with `style_`, `useBindings` binds to `style.` + whatever follows the underscore:

:::
```js
useBindings({
  ...
  bindings: {
    // Binds to style.backgroundColor
    style_backgroundColor: ...,
  }
})
```
:::

For all other properties, `useBindings` binds to the property exactly as it's written:

:::
```js
useBindings({
  ...
  bindings: {
    // Binds to id
    id: ...,
    // Binds to aria-label
    'aria-label': ...,
  }
})
```
:::


:::
#### How to format values
:::

There are several different ways to format the values that `useBindings` binds to the properties you specified.

The simplest type of value is a plain String, Number, or Boolean:

:::
```js
useBindings({
  ...
  bindings: {
    id: 'my-number-input',
    ariaHidden: false,
    value: 0,
  }
})
```
:::

When you pass plain data like this, `useBindings` sets the DOM element's attribute once, then leaves it alone.

In most cases though, some of those values will be reactive references to Strings, Numbers, or Booleans:

:::
```js
import { ref } from 'vue'

const numberInputValue = ref(0)

useBindings({
  ...
  bindings: {
    ...
    value: numberInputValue,
  }
})
```
:::

When the value is reactive (i.e. a `ref` or `computed` value), `useBindings` watches it for changes, and sets the DOM element's attribute each time a change is detected.

But what about when the `target` is a reactive array of elements, rather than a single reactive element reference? How do we make sure the correct data is bound to each element?

When you're binding static data, you can pass the **target closure** instead of a standard value. The target closure is a callback function that receives an object as its only argument. Here's a breakdown of that object:

::: ariaLabel="targetClosure object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `target` | HTMLElement | The actual DOM element that `useBindings` is currently binding data to. |
| `index` | Number | The index (Number) of `target` in your reactive array of elements. |
:::

Your target closure should return the value that `useBindings` should bind to the specific `target`.

Here's an example of how `useTablist` uses this feature to set the `aria-labelledby` attribute for each tab panel to the ID of the corresponding tab panel. Theses IDs never change, so `aria-labelledby` does not need to be reactive:

:::
```js
export default function useTablist (...) {
  ...

  useBindings({
    // Reactive array of tab panel elements
    target: panels.els,
    bindings: {
      // Each element's aria-labelledby holds the ID of its associated tab element.
      //
      // The tabIds array and panels.els array are kept in the same order, so it's
      // safe to simply pick the tabId whose index matches the index passed to the
      // target closure.
      ariaLabelledby: ({ index }) => tabIds[index],
      ...
    },
  })


  ...
}

```
:::


But what about when the data _is_ reactive, but still needs to be bound to an array of elements? For those cases, you can pass an Object as the `bindings` property's value:

:::
```js
useBindings({
  target: myReactiveArrayOfElements,
  bindings: {
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
| `watchSources` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass the reactive array of elements—that data is already watched automatically.</p><p>Each time `useBindings` detects a change in your watch sources (or the reactive array of elements), it will iterate through your array of elements, calling the `targetClosure` for each one.</p> |
:::

Here's an example of how `useTablist` uses this feature to manage the `aria-hidden` attribute on its array of tab panels, setting `false` for the hidden tabs and `true` for the currently selected tab:

:::
```js
export default function useTablist (...) {
  ...

  useBindings({
    // Reactive array of tab panel elements
    target: panels.els,
    bindings: {
      // selectedPanel is a reactive reference to the index of the currently
      // selected tab panel.
      //
      // aria-hidden should be true for all panels whose index doesn't match
      // selectedPanel, and should be false for the one panel whose index
      // is a match.
      //
      // This targetClosure should run again each time selectedPanel changes.
      ariaHidden: {
        targetClosure: ({ index }) => index !== selectedPanel.value,
        watchSources: selectedPanel,
      },
      ...
    },
  })

  ...
}

```
:::

