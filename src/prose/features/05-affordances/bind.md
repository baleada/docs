---
title: bind
publish: true
order: 0
---

`bind` is a function that assigns values to properties or attributes on DOM elements.

:::
```ts
import { ref } from 'vue'
import { bind } from '@baleada/vue-features'

export function useButton (...) {
  const element = ref<HTMLElement>()
  
  bind(
    element,
    {
      role: 'button',
      tabindex: 0,
      ...
    }
  )

  return element
}
```
:::

`bind` works with static values (assigning them once) and reactive values (updating the DOM element each time the value changes).

::: type="info"
`bind` reimplements the `v-bind` affordance from Vue templates.

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

To bind static or reactive data to a DOM element, call the `bind` function, which requires two parameters: the element, list of elements, or `Plane` of elements you're binding to, and the values you want to bind.

:::
```js
import { bind } from '@baleada/vue-features'

export function useFoo (...) {
  bind(elementOrListOrPlane, values)
}
```
:::

::: type="info"
Usually, you'll call `bind` from inside another composable, but it also works in `script setup`.
:::

Here's a breakdown of the parameters:

::: ariaLabel="bind parameters breakdown" classes="wide-5"
| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `elementOrListOrPlane` | See description | yes | none | <p>A reactive reference to the DOM element or elements you're binding data to.</p><p>`elementOrListOrPlane` can be one of the following types: </p><ul><li>HTMLElement</li><li>Array of HTMLElements</li><li>`Plane` of HTMLElements</li><li>Reactive reference to any of the above types</li></ul><p>See the [How to format values](#how-to-format-values) section for more guidance on binding values to specific elements in a reactive array or reactive `Plane`.</p> |
| `values` | Object | yes | none | <p>The attributes or properties and values you want to bind to your element or elements.</p><p>See the [How to format the `values` object](#how-to-format-the-values-object) section for more guidance.</p> |
:::


:::
### How to format the `values` object
:::

The required `values` parameter is an object. The keys of that object must be DOM element attributes (e.g. `aria-label`) or DOM element properties (e.g. `value`) that you'll be binding data to:

:::
```js
import { bind } from '@baleada/vue-features'

export function myCompositionFunction (...) {
  bind(
    myElement,
    {
      ariaLabel: ...,
      class: ...,
      style_backgroundColor: ...,
    }
  )
}
```
:::


:::
#### How to format keys
:::

Here are the rules `bind` follows when reading the keys on the `values` object:

If the key starts with `aria` or `data`, followed by a capital letter, `bind` binds to the correct `aria-` or `data-` attribute.

:::
```js
bind(
  ...
  {
    // Binds to aria-label
    ariaLabel: ...,
    // Binds to data-name
    dataName: ...,
  }
)
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
bind(
  ...
  {
    // bind sets the htmlFor property
    for: ...,
  }
)
```
:::

If the key is `class` or `rel` `bind` binds to `classList` or `relList`. Existing values in those lists are preserved, while your reactive values are added and removed as needed:

:::
```js
bind(
  ...
  {
    // bind adds to and removes from classList,
    // respecting existing values
    class: ...,
    // bind adds to and removes from relList,
    // respecting existing values
    rel: ...,
  }
)
```
:::

If the key is `ariaDescribedbys` or `ariaLabelledbys` (note the `s` at the end), `bind` adds your value to any space-separated list of element IDs that might already be present in the `aria-describedby` or `aria-labelledby` attributes:

:::
```js
bind(
  ...
  {
    // bind adds your value to the aria-describedby attribute,
    // instead of overwriting it.
    ariaDescribedbys: ...,
    // bind adds to the aria-labelledby attribute
    ariaLabelledbys: ...,
  }
)
```
:::

If the key starts with `style_`, `bind` binds to `style.` + whatever follows the underscore:

:::
```js
bind(
  ...
  {
    // Binds to style.backgroundColor
    style_backgroundColor: ...,
  }
)
```
:::

For all other keys, `bind` binds to the property or attribute exactly as it's written:

:::
```js
bind(
  ...
  {
    // Binds to the id property
    id: ...,
    // Binds to the aria-label attribute
    'aria-label': ...,
    // Overwrites the aria-labelledby attribute, instead of
    // adding to it, because the key is not pluralized
    ariaLabelledby: ...,
  }
)
```
:::

::: type="warning"
Setting `innerHTML` is out of Baleada Features' scope. Using `bind` with `innerHTML` is possible in some cases, but not recommended, since Baleada Features doesn't include security measures or edge case handling for this kind of work.

If you're going to bind to `innerHTML`, be sure to use something like [`createSanitize`](/docs/logic/pipes/sanitize) to sanitize your content.
:::


:::
#### How to format values
:::

There are several different ways to format the values that `bind` binds to the properties or attributes you specified.

The simplest type of value is a plain String, Number, or Boolean.

:::
```js
bind(
  ...
  {
    id: 'my-number-input',
    ariaHidden: true,
    value: 0,
  }
)
```
:::

When you pass plain data like this, `bind` sets the DOM element's attribute or property once, then leaves it alone.

In most cases though, some of those values will be reactive references to Strings, Numbers, or Booleans:

:::
```js
import { ref } from 'vue'

const numberInputValue = ref(0)

bind(
  ...
  {
    ...
    value: numberInputValue,
  }
)
```
:::

When the value is a reactive ref (i.e. a `ref`, `shallowRef`, or `computed` value), `bind` automatically watches it for changes, and sets the DOM element's attribute or property each time a change is detected.

But what about when the `element` is a reactive array of elements, rather than a single reactive element reference? How do we make sure the correct data is bound to each element?

When you're binding static data, you can pass the **value getter** instead of a standard value. The value getter is a callback function that receives only one argument: the `index` (Number) of a given element in your reactive array of elements. It should return the value that `bind` should bind to that specific element.

:::
```js
import { ref } from 'vue'

const list = ref<HTMLElement[]>([])

bind(
  list,
  {
    dataIndex: index => `${index}`,
  }
)
```
:::

But what about when the data _is_ reactive, but still needs to be bound to an array of elements? For those cases, you can pass a **reactive value getter** as the key's value.

A reactive value getter is an **object**. Here's a breakdown of that object:

::: ariaLabel="reactive value getter breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `get` | Function | yes | none | A value getter, as described above. |
| `watchSource` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass your reactive array of elements—that data is already watched automatically.</p><p>Each time `bind` detects a change in your watch sources or the reactive array of elements, it will iterate through your array of elements, calling `get` for each one.</p> |
:::

Here's an example of how [`useTablist` ](/docs/features/interfaces/tablist) uses a reactive value getter to manage the `aria-hidden` attribute on its array of tab panels, setting `false` for the hidden tabs and `true` for the currently selected tab:

:::
```js
export function useTablist (...) {
  bind(
    // Reactive array of tab panel elements
    panels.list,
    {
      // `selected` is a reactive reference to the index 
      // of the currently `selected` tab panel.
      //
      // aria-hidden should be true for all panels whose
      // index doesn't match `selected`, and should be
      // `undefined` for the one panel whose index.
      // (`undefined` will instruct `bind` to remove
      // the `aria-hidden` attribute from the visible
      // tab panel.)
      //
      // This get should run again each time
      // `selected` changes.
      ariaHidden: {
        get: index => index === selected.value
          ? undefined
          : 'true',
        watchSource: selected,
      },
    },
  )
}
```
:::

Finally, let's look at how this all works with a [plane](/docs/features/plane).

The value format for a plane is almost identical to the format for arrays of elements. When you're binding static data, you can pass the **value getter** instead of a standard value. The value getter for a plane is a callback function that receives one argument: the [coordinates](/docs/features/coordinates) of a given element in your plane of elements. It should return the value that `bind` should bind to that specific element.

Here's an example of how [`useGrid` ](/docs/features/interfaces/grid) uses this feature to set the `role` attribute for each cell in the grid. These values never change, so `roles` does not need to be reactive:

:::
```js
export function useGrid (...) {
  bind(
    // Reactive plane (array of arrays) of grid cell elements
    cells.plane,
    {
      // The `hasRowHeaders` and `hasColumnHeaders` options
      // control whether or not `useGrid` applies the `rowheader`
      // and `columnheader` roles to the first row and column.
      //
      // This value getter is able to use the `row` and `column`
      // arguments to determine whether or not the cell is in the
      // first row or column.
      //
      // Any cell that is neither in the first row nor the first
      // column should get the `gridcell` role.
      role: (row, column) => 
        (hasRowheaders && row === 0 && 'rowheader')
        || (hasColumnheaders && column === 0 && 'columnheader')
        || 'gridcell',
    }
  )

  ...
}
```
:::

And just like with arrays of elements, when the data _is_ reactive, but still needs to be bound to the plane of elements, you can pass a **reactive value getter** as the key's value.

A reactive value getter for a plane is identical to the reactive value getter for arrays. It's still an object, with a `get` property for the value getter, and a `watchSource` property for a single watch source or array of watch sources.

The only difference is that this value getter receives coordinates as its argument, instead of an index.

Here's an example of how [`useGrid` ](/docs/features/interfaces/grid) uses a reactive value getter to manage the `aria-selected` attribute on its plane of grid cells, setting `true` for selected cells and removing the attribute for unselected cells:

:::
```js
export function useGrid (...) {
  bind(
    cells.plane,
    {
      ariaSelected: {
        // An internal `isSelected` function does the heavy lifting
        // here and returns a boolean.
        get: (row, column) => isSelected(row, column)
          ? 'true'
          // Returning `undefined` from a value getter causes
          // the attribute to get removed. More on that in the
          // next section of this guide.
          : undefined,
        // Internally, info about selected cells is stored in 
        // two reactive objects, named `selectedRows` and
        // `selectedColumns`.
        //
        // We can set up those two objects as watch sources, and
        // `bind` will recompute `aria-selected` for each gridcell
        // whenever reactive changes are detected.
        watchSource: [
          () => selectedRows.value.picks,
          () => selectedColumns.value.picks
        ],
      },
    }
  )

  ...
}
```
:::


:::
#### How to remove attributes
:::

In a few code samples above, you can see great examples of cases where we'd actually like to **remove an attribute** from an element in certain cases.
- Hidden tab panels should have their `aria-hidden` attribute set to `true`, but the visible tab panel should not have an `aria-hidden` attribute.
- Selected grid cells should have `aria-selected` set to `true`, but unselected grid cells should not have an `aria-selected` attribute.

In cases like theses, the attribute needs to either be set to `true` or be removed reactively, based on user interaction.

With `bind`, you can remove any attribute from an element at any time by making sure the value of that attribute is `undefined`. In other words, if a reactive reference, value getter, or reactive value getter resolves to `undefined` for an element, `bind` will completely remove the attribute from that element.
