---
title: Element API
tags: Composables
publish: true
order: 1
---

In the return value for each of Baleada Features' interfaces and combos, as well as some extensions, you'll find at least one **element API** object.

Broadly speaking, the purpose of the element API is to capture DOM elements from your Vue template, so that a Baleada Features composable can use that DOM element internally.

The element API also gives you an easy way to access those DOM elements in case you need to do additional work with them in your Vue component's `setup` function.

There are three kinds of APIs:
1. **Element API**, designed for individual DOM elements.
2. **List API**, designed for a list of DOM elements rendered by a `v-for` statement in your template.
3. **Plane API**, designed for two-dimensional plane or grid of elements, rendered in your template by a top-level `v-for` statement with another `v-for` nested inside it (for example, to loop over rows and their nested columns).

Again, each of these APIs is an object, nested inside the object returned by a Baleada Features function. For example:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.root // -> Element API object
tablist.tabs // -> List API object
tablist.panels // -> another List API object
```
:::

::: type="warning"
Note: Baleada Features' affordances don't follow this pattern, and don't return anything at all.

This API is only used by Baleada Features interfaces and combos, and by some extensions.
:::


:::
## Using the Element API
:::

First, here's a breakdown of the Element API object designed for individual DOM elements:

::: ariaLabel="Element API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `ref` | Function | <p>A [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs).</p><p>`elementApi.ref` should be bound to the DOM element that you want to capture.</p><p>See the [Getting and using refs](#getting-and-using-function-refs) section for more guidance.</p> |
| `element` | Ref (HTMLElement) | <p>A reactive reference to the DOM element captured by `elementApi.ref`.</p><p>Useful when you need to access that DOM element inside your Vue component's `setup` function to apply a side effect.</p> |
| `id` | Ref (String) | <p>A reactive reference to a unique ID for the element.</p><p>`id` is not included in every Element API object. Documentation for interfaces and extensions will inform you when `id` is included.</p><p>When `id` is included, the unique ID will also be bound automatically to the `id` attribute of your `element`.</p> |
:::

And here's a breakdown of the List API object:

::: ariaLabel="List API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `getRef` | Function | <p>A function that returns a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs). The function ref returned by `listApi.getRef` should be bound to the `ref` attribute of an element in your Vue template that has a `v-for` statement.</p><p>Call `listApi.getRef` with one argument: the `index` (Number) of the current element, which you can get from the `v-for` statement.</p><p>See the [Getting and using refs](#getting-and-using-function-refs) section for more guidance.</p> |
| `elements` | Ref (Array) | <p>A reactive reference to an array of DOM elements captured by the function ref. Inside the array, DOM elements will be listed in the exact order they appear in the DOM.</p><p>Useful when you need to access these DOM elements from your Vue component's `setup` function to apply a side effect.</p> |
| `status` | Ref (Object) | <p>A reactive reference to an object describing the status of `elements`.</p><p>`status` has two properties: `order` and `length`.</p><p>After each Vue update, `status.order` is set to `changed` if the order of elements in your `elements` array has changed, or `none` if not.</p><p>Also after each Vue update, `status.length` is set to `shortened` if elements have been removed from your `elements` array, `lengthened` if elements have been added, or `none` if the number of elements has not changed.</p> |
| `ids` | Ref (Array) | <p>A reactive reference to an array of unique IDs (Strings) for each element in `elements`.</p><p>`ids` and `elements` are always kept in exactly the same order, and when `ids` is included, IDs will also be bound automatically to the `id` attribute of your `elements`. In other words, you can be confident that `ids.value[3]` will be the ID assigned to the `id` attribute of `elements.value[3]`. IDs will always stay attached to the same element, even after elements are reordered.</p><p>`ids` is not included in every List API object. Documentation for interfaces and extensions will inform you when `ids` is included.</p> |
:::

And finally, here's a breakdown of the Plane API object:

::: ariaLabel="Plane API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `getRef` | Function | <p>A function that returns a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs). The function ref returned by `planeApi.getRef` should be bound to the `ref` attribute of an element in your Vue template that is rendered by a nested `v-for` statement.</p><p>Call `planeApi.getRef` with two arguments: the current element's `row` (Number), which you can get from your top-level `v-for` statement, and the element's `column` (Number), which you can get from your nested `v-for` statement.</p><p>See the [Getting and using refs](#getting-and-using-function-refs) section for more guidance.</p> |
| `elements` | Ref (Array) | <p>A reactive `Plane` of DOM elements captured by the function ref.</p><p>In Baleada Features, `Plane` is an array of arrays of elements, and under the hood, `Plane` is just a subclass of `Array` with no added methods or properties.</p><p>Inside the array of arrays, DOM elements will be listed in the exact order they appear in the DOM. You can access them based on their row and column position (e.g. `planeApi.elements.value[2][4]`).</p><p>Useful when you need to access these DOM elements from your Vue component's `setup` function to apply a side effect.</p> |
| `status` | Ref (Object) | <p>A reactive reference to an object describing the status of `elements`.</p><p>`status` has three properties: `order`, `rowLength`, and `columnLength`.</p><p>After each Vue update, `status.value.order` is set to `changed` if the order of elements in your `elements` `Plane` has changed, or `none` if not.</p><p>Also after each Vue update, `status.value.rowLength` is set to `shortened` if rows have been removed from your `Plane`, `lengthened` if rows have been added, or `none` if the number of rows has not changed.</p><p>`status.value.columnLength` behaves the same way, but it describes the length of the first array in your `Plane`.</p> |
| `ids` | Ref (Array) | <p>A reactive reference to an array of arrays of unique IDs (Strings) for each element in `elements`.</p><p>`ids` and `elements` are always kept in exactly the same order, and when `ids` is included, IDs will also be bound automatically to the `id` attribute of your `elements`. In other words, you can be confident that `ids.value[2][4]` will be the ID assigned to the `id` attribute of `elements.value[2][4]`. IDs will always stay attached to the same element, even after elements are reordered.</p><p>`ids` is not included in every List API object. Documentation for interfaces and extensions will inform you when `ids` is included.</p> |
:::

::: type="warning"
Currently a "plane" is defined as a two-dimensional grid of elements. The underlying assumption is that each element fills only one cell, and that all rows have the same number of cells (i.e. the same number of columns).

In practice, this is implemented as an array of arrays, where each nested array has the same length.

In the real world, planes don't always behave this way—elements can span multiple columns or rows when you're building custom tables or spreadsheet interfaces. Supporting these use cases is definitely on the roadmap for Baleada Features, but right now, only simpler planes are supported.
:::


:::
### Getting and using function refs
:::

The overarching workflow of Baleada Features is:
1. Call a Baleada Features interface, combo, or extension function in the setup function of your Vue template, passing optional parameters as needed.
2. The Baleada Features function will return a object. Inside this object, you'll find at least one element API object.
3. Get a function ref from the element API object, and use it to capture a DOM element from your Vue component's template and expose it to the Baleada Features function.
4. Internally, the Baleada Features function will access that element. It will bind attributes, add and remove event listeners, conditionally display the element, etc.

The thing that ties this whole system together is the **function ref** feature of Vue 3, which powers the `ref` property on the Element API object, and the `getRef` property of the List API object.

::: type="info"
Looking for more info on what function refs are, how to use them, and why Baleada Features relies on them? Check out [this three-part screencast series](https://www.youtube.com/playlist?list=PLHP34VGeo17dkrxEksyo3-ySK7oay6huY) dedicated to function refs.
:::

As mentioned above, `elementApi.ref` is a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs): a JavaScript function that requires a DOM element as one of its parameters, and stores that DOM element inside one of Vue's reactive references. `listApi.getRef` and `planeApi.getRef` are functions that **return** a function ref.

In Baleada Features, that DOM element is always the **only** parameter of the function ref.

To see how this all works when capturing DOM elements, let's look at [`useGrid`](/docs/features/interfaces/grid) as an example.

Internally, `useGrid` needs to perform a few side effects on your grid's root element, including:
- Set the element's `role` attribute to `grid`
- Set up event listeners to capture keyboard and pointer interactions that transfer focus to different grid cells

To perform these side effects, `useGrid` needs you to somehow give it access to the correct DOM element. That's where the element API comes in!

`useGrid`'s return object includes a element API for a "root" element:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.root // -> Element API object
```
:::

And that element API includes a `ref` property, holding a function ref:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.root.ref // -> function ref
```
:::

So, to give `useGrid` access to your root element in the DOM, you need to bind `grid.root.ref`, to the `ref` attribute of your grid's root element:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { useGrid } from '@baleada/features'

const grid = useGrid(...)
</script>

<template>
  <section>
    <!--
      This div is the grid root in this example. We bind
      `grid.root.ref` to its ref attribute.
    
      Note that the grid root *does not* have to be
      the root element of your component, but for accessibility purposes, it should be a container element for your rows
      and cells.
    -->
    <div :ref="grid.root.ref">
      ...
    </div>
  </section>
</template>
```
:::

With that done, `useGrid` can now access the grid root internally and do what it needs to do.

Also, if you need to access the root element from JavaScript, you can use `grid.root.element`. Just be careful not to do anything with that element before the component is mounted, since it won't be available yet.

:::
```js
import { useGrid } from '@baleada/features'
import { onMounted } from 'vue'

const grid = useGrid(...)

onMounted(() => {
  // Note that `grid.root.element` is a reactive reference,
  // so you have to go through its .value property
  // to access the actual DOM element.
  grid.root.element.value.style.backgroundColor = 'rebeccapurple'
})
```
:::

For lists of elements, rendered by a `v-for` statement, we use the List API, which has a few subtle differences. `useGrid` again is a great example to explore this.

`useGrid` needs to access the row elements in your DOM so it can set their `role` attribute. To make this possible, `useGrid` returns a List API for rows:

:::
```js
import { useGrid } from '@baleada/features'

const grid useGrid(...)

grid.rows // -> List API object
```
:::

And that List API includes a `getRef` property, holding a **function ref getter**: a function that returns a function ref:

:::
```js
import { useGrid } from '@baleada/features'

const grid useGrid(...)

grid.rows.getRef // -> function that returns a function ref
```
:::

In most cases, you should use a `v-for` to programmatically render all your row elements. This is especially true for things like rows in a spreadsheet app, since the number of rows and the order of rows can change reactively as the user interacts with the app.

To give `useGrid` access to your row elements in the DOM, you need to call `grid.rows.getRef`, and bind its return value to the `ref` attribute of your `v-for` element.

The `grid.rows.getRef` function also requires an `index` as its only parameter. You can get that index from the `v-for` statement as shown below:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { ref } from 'vue'
import { useGrid } from '@baleada/features'

const grid useGrid(...)
const gridMetadata = ref([...]) // Array of metadata for your rows
</script>

<template>
  <section>
    <!-- Here's our grid root element again -->
    <div :ref="grid.root.ref">
      <!--
        And here are the rows!
        
        Note how we use the v-for statement to access the current
        element's index in the list.

        We pass that index to the `grid.rows.getRef` function.
        This allows the function to insert the current DOM element
        in the correct position in an array that useGrid
        tracks internally.

        If rows are reordered, deleted, or added, Vue will run
        `grid.rows.getRef` function again, always ensuring that
        the order of useGrid's internal array is always
        perfectly in sync with the actual number and order of
        elements in the DOM.
      -->
      <div
        v-for="(row, index) in gridMetadata"
        :key="row"
        :ref="grid.rows.getRef(index)"
      >
        <!-- We'll see shortly how cells get rendered here -->
      </div>
    </div>
  </section>
</template>
```
:::

With that done, `useGrid` can now access an array of row elements internally, and perform side effects.

If you need to access the array of row elements from JavaScript, you can use `grid.rows.elements`. Again, be careful not to do anything with those elements before the component is mounted, since they won't be available yet.

:::
```js
import { useGrid } from '@baleada/features'
import { onMounted } from 'vue'

const grid = useGrid(...)

onMounted(() => {
  // Note that `grid.rows.elements` is a reactive reference,
  // so you have to go through its .value property
  // to access the actual array of DOM elements.
  for (const el of grid.rows.elements.value) {
    el.style.backgroundColor = 'rebeccapurple'
  }
})
```
:::

For two-dimensional grids of elements, rendered by a `v-for` statement with another `v-for` nested inside it, we use the Plane API. `useGrid` again is a great example to explore this.

`useGrid` needs to access the grid cell elements in your DOM so it can set their `role` attribute and reactively manage their `aria-selected` attribute, among other things. To make this possible, `useGrid` returns a Plane API for cells:

:::
```js
import { useGrid } from '@baleada/features'

const grid useGrid(...)

grid.cells // -> Plane API object
```
:::

And that Plane API includes a `getRef` property, holding a **function ref getter**: a function that returns a function ref:

:::
```js
import { useGrid } from '@baleada/features'

const grid useGrid(...)

grid.cells.getRef // -> function that returns a function ref
```
:::

In most cases, you should use a `v-for` to programmatically render all your row elements, and a nested `v-for` to programmatically render all your cells in each row.

To give `useGrid` access to your cell elements in the DOM, you need to call `grid.cells.getRef`, and bind its return value to the `ref` attribute of your nested `v-for` element.

The `grid.cells.getRef` function requires a `row` index as its first parameter, and a `column` index as its second parameter. You can get those indices from your `v-for` statements as shown below:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { ref } from 'vue'
import { useGrid } from '@baleada/features'

const grid useGrid(...)
const gridMetadata = ref([...]) // Array of metadata for your rows
</script>

<template>
  <section>
    <!-- Here's our grid root element again -->
    <div :ref="grid.root.ref">

      <!-- And here are our grid row elements again -->
      <div
        v-for="(row, rowIndex) in gridMetadata"
        :key="row.id"
        :ref="grid.rows.getRef(index)"
      >
        <!--
          And here are the cells!

          In this example, grid metadata is an array of objects
          for each row. Each row object has an `id` and a `cells`
          property, and `row.cells` is an array of cell metadata.
        
          Note how we use the rows' v-for statement to access the
          row index, and the nested v-for statement to access the
          column index.

          We pass those indices to the `grid.cells.getRef` function.
          This allows the function to insert the current DOM element
          in the correct position in an array of arrays that useGrid
          tracks internally.

          If rows or columsn are reordered, deleted, or added, Vue will 
          run `grid.cells.getRef` function again, always ensuring that
          the order of useGrid's internal array is perfectly in sync with the actual number and order of elements in the DOM.
        -->
        <div
          v-for="(cell, columnIndex) in row.cells"
          :key="cell.id"
          :ref="grid.cells.getRef(rowIndex, columnIndex)"
        >...</div>
      </div>
    </div>
  </section>
</template>
```
:::

With that done, `useGrid` can now access a `Plane` (an array of arrays) of cell elements internally, and perform side effects.

If you need to access the `Plane` of cell elements from JavaScript, you can use `grid.cells.elements`. Again, be careful not to do anything with those elements before the component is mounted, since they won't be available yet.

:::
```js
import { useGrid } from '@baleada/features'
import { onMounted } from 'vue'

const grid = useGrid(...)

onMounted(() => {
  // Note that `grid.cells.elements` is a reactive reference,
  // so you have to go through its .value property to access
  // the actual `Plane` of DOM elements.
  //
  // Since that `Plane` an array of arrays of elements, we can
  // use a nested `for` loop to traverse them.
  for (
    let row = 0;
    row < grid.cells.elements.value.length;
    row++
  ) {
    for (
      let column = 0;
      // Note that we compute the total columns based on the
      // length of the first row. This is a simplified assumption,
      // and future versions of Baleada Features will allow this to
      // be more flexible for grids that have a different number of
      // columns in any given row.
      column < grid.cells.elements.value[0].length;
      column++
    ) {
      const el = grid.cells.elements.value[row][column]
      el.style.backgroundColor = 'rebeccapurple'
    }
  }
})
```
:::


::: type="info"
For more information on why and how this all works, and how you might use this pattern to build your own custom features, consider buying a copy of [Rethinking Reusability in Vue](https://rethinking-reusability-in-vue.alexvipond.dev)! Use the coupon code BALEADA at checkout for $10 off.
:::

