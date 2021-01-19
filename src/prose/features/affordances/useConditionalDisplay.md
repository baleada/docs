---
title: useConditionalDisplay
tags: Composition functions
publish: true
order: 0
---

`useConditionalDisplay` is a composition function that can conditionally show or hide elements in the DOM, using the CSS `display` property under the hood. It works with static values—conditionally displaying once—and reactive values—showing and hiding elements each time the value changes.

::: type="info"
`useConditionalDisplay` reimplements the `v-show` affordance in Vue templates.
:::

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseConditionalDisplay.vue)

<ExampleUseConditionalDisplay class="with-mt" />

:::
## Using bindings
:::

To bind static or reactive data to a DOM element, call the `useConditionalDisplay` function, which requires one parameter: the `required` Object.

:::
```js
import { useConditionalDisplay } from '@baleada/vue-features/affordances'

export default function myCompositionFunction (...) {
  useConditionalDisplay(required)
}
```
:::

::: type="info"
Usually, you'll call `useConditionalDisplay` from inside another composition function, but it also works in the `setup` function of any Vue component.
:::

Here's a breakdown of the `required` object:

::: ariaLabel="useConditionalDisplay required object breakdown" classes="wide-5"
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
import { useConditionalDisplay } from '@baleada/vue-features/affordances'

export default function myCompositionFunction (...) {
  useConditionalDisplay({
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

Here are the rules `useConditionalDisplay` follows when reading those properties:



If the property  starts with `aria` or `data`, followed by a capital letter, `useConditionalDisplay` binds to the correct `aria-` or `data-` attribute

:::
```js
useConditionalDisplay({
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

If the property is `for`, `useConditionalDisplay` binds to `htmlFor`:

:::
```js
useConditionalDisplay({
  ...
  bindings: {
    // useConditionalDisplay sets the htmlFor attribute
    for: ...,
  }
})
```
:::

If the property is `class` or `rel`, `useConditionalDisplay` binds to `classList` or `relList`. Existing values in those lists are preserved, while your reactive values are added and removed as needed:

:::
```js
useConditionalDisplay({
  ...
  bindings: {
    // useConditionalDisplay adds to and removes from classList,
    // respecting existing values
    class: ...,
    // useConditionalDisplay adds to and removes from relList,
    // respecting existing values
    rel: ...,
  }
})
```
:::

If the property starts with `style_`, `useConditionalDisplay` binds to `style.` + whatever follows the underscore:

:::
```js
useConditionalDisplay({
  ...
  bindings: {
    // Binds to style.backgroundColor
    style_backgroundColor: ...,
  }
})
```
:::

For all other properties, `useConditionalDisplay` binds to the property exactly as it's written:

:::
```js
useConditionalDisplay({
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

There are several different ways to format the values that `useConditionalDisplay` binds to the properties you specified.

The simplest type of value is a plain String, Number, or Boolean:

:::
```js
useConditionalDisplay({
  ...
  bindings: {
    id: 'my-number-input',
    ariaHidden: false,
    value: 0,
  }
})
```
:::

When you pass plain data like this, `useConditionalDisplay` sets the DOM element's attribute once, then leaves it alone.

In most cases though, some of those values will be reactive references to Strings, Numbers, or Booleans:

:::
```js
import { ref } from 'vue'

const numberInputValue = ref(0)

useConditionalDisplay({
  ...
  bindings: {
    ...
    value: numberInputValue,
  }
})
```
:::

When the value is reactive (i.e. a `ref` or `computed` value), `useConditionalDisplay` watches it for changes, and sets the DOM element's attribute each time a change is detected.

But what about when the `target` is a reactive array of elements, rather than a single reactive element reference? How do we make sure the correct data is bound to each element?

When you're binding static data, you can pass the **target closure** instead of a standard value. The target closure is a callback function that receives an object as its only argument. Here's a breakdown of that object:

::: ariaLabel="targetClosure object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `target` | HTMLElement | The actual DOM element that `useConditionalDisplay` is currently binding data to. |
| `index` | Number | The index (Number) of `target` in your reactive array of elements. |
:::

Your target closure should return the value that `useConditionalDisplay` should bind to the specific `target`.

Here's an example of how `useTablist` uses this feature to set the `aria-labelledby` attribute for each tab panel to the ID of the corresponding tab panel. Theses IDs never change, so `aria-labelledby` does not need to be reactive:

:::
```js
export default function useTablist (...) {
  ...

  useConditionalDisplay({
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
useConditionalDisplay({
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
| `watchSources` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass the reactive array of elements—that data is already watched automatically.</p><p>Each time `useConditionalDisplay` detects a change in your watch sources (or the reactive array of elements), it will iterate through your array of elements, calling the `targetClosure` for each one.</p> |
:::

Here's an example of how `useTablist` uses this feature to manage the `aria-hidden` attribute on its array of tab panels, setting `false` for the hidden tabs and `true` for the currently selected tab:

:::
```js
export default function useTablist (...) {
  ...

  useConditionalDisplay({
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

