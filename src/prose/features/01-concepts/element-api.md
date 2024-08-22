---
title: Element API
publish: true
order: 0
---

In the return value for each of Baleada Features' interfaces and combos, as well as some extensions, you'll find at least one **element API** object.

Broadly speaking, the purpose of the element API is to capture DOM elements from your Vue template, so that a Baleada Features composable can use that DOM element internally.

The element API also gives you an easy way to access those DOM elements in case you need to do additional work with them in your Vue component's `setup` function.

There are three kinds of APIs:
1. **Element API**, designed for individual DOM elements.
2. **List API**, designed for a list of DOM elements rendered by a `v-for` statement in your template.
3. **Plane API**, designed for a [plane](/docs/features/plane) of elements, typically rendered in your template by a top-level `v-for` statement with another `v-for` nested inside it (for example, to loop over rows and their nested columns).

Again, each of these APIs is an object, nested inside the object returned by a Baleada Features interface. For example:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.root // -> Element API object
tablist.tabs // -> List API object
tablist.panels // -> another List API object
```
:::


:::
## Using the Element API
:::

First, here's a breakdown of the Element API object designed for individual DOM elements:

::: ariaLabel="Element API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `ref` | Function | <p>A function that returns a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs).</p><p>`elementApi.ref()` should be bound to the DOM element that you want to capture.</p><p>See the [Getting and using refs](#getting-and-using-function-refs) section for more guidance.</p><p>Optionally, you can pass element metadata to `elementApi.ref` as the first argument. See the [element metadata doc](/docs/features/element-metadata) for more guidance on why and how to do this.</p> |
| `element` | Ref (HTMLElement) | <p>A reactive reference to the DOM element captured by `elementApi.ref`.</p><p>Useful when you need to access that DOM element inside your Vue component's `setup` function to apply a side effect.</p> |
| `meta` | Ref (Object) | <p>A reactive reference to an object containing [element metadata](/docs/features/element-metadata).</p> |
| `id` | Ref (String) | <p>A reactive reference to a unique ID for the element.</p><p>`id` is not included in every Element API object. Documentation for interfaces and extensions will inform you when `id` is included.</p><p>When `id` is included, the unique ID will also be bound automatically to the `id` attribute of your `element`.</p> |
:::

And here's a breakdown of the List API object:

::: ariaLabel="List API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `ref` | Function | <p>A function that returns a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs). The function ref returned by `listApi.ref` should be bound to the `ref` attribute of an element in your Vue template that has a `v-for` statement.</p><p>Call `listApi.ref` with the `index` (Number) of the current element, which you can get from the `v-for` statement.</p><p>See the [Getting and using refs](#getting-and-using-function-refs) section for more guidance.</p><p>Optionally, you can pass element metadata to `listApi.ref` as the second argument. See the [element metadata doc](/docs/features/element-metadata) for more guidance on why and how to do this.</p> |
| `list` | Ref (Array) | <p>A reactive reference to an array of DOM elements captured by the function ref. Inside the array, DOM elements will be listed in the exact order they appear in the DOM.</p><p>Useful when you need to access these DOM elements from your Vue component's `setup` function to apply a side effect.</p> |
| `meta` | Ref (Array) | A reactive reference to an array of objects containing [element metadata](/docs/features/element-metadata) for each element in `list`. The order of `meta` exactly matches the order of `list`. |
| `status` | Ref (Object) | <p>A reactive reference to an object describing the status of `list`.</p><p>`status` has two properties: `order` and `length`.</p><p>After each Vue update, `status.order` is set to `changed` if the order of elements in your `list` array has changed, or `none` if not.</p><p>Also after each Vue update, `status.length` is set to `shortened` if elements have been removed from your `list` array, `lengthened` if elements have been added, or `none` if the number of elements has not changed.</p> |
| `ids` | Ref (Array) | <p>A reactive reference to an array of unique IDs (Strings) for each element in `list`.</p><p>`ids` and `list` are always kept in exactly the same order, and when `ids` is included, IDs will also be bound automatically to the `id` attribute of your `list`. In other words, you can be confident that `ids.value[3]` will be the ID assigned to the `id` attribute of `list.value[3]`. IDs will always stay attached to the same element, even after elements are reordered.</p><p>`ids` is not included in every List API object. Documentation for interfaces and extensions will inform you when `ids` is included.</p> |
:::

And finally, here's a breakdown of the Plane API object:

::: ariaLabel="Plane API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `ref` | Function | <p>A function that returns a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs). The function ref returned by `planeApi.ref` should be bound to the `ref` attribute of an element in your Vue template that is rendered by a nested `v-for` statement.</p><p>Call `planeApi.ref` with two arguments: the current element's `row` (Number), which you can get from your top-level `v-for` statement, and the element's `column` (Number), which you can get from your nested `v-for` statement.</p><p>See the [Getting and using refs](#getting-and-using-function-refs) section for more guidance.</p><p>Optionally, you can pass element metadata to `planeApi.ref` as the second argument. See the [element metadata doc](/docs/features/element-metadata) for more guidance on why and how to do this.</p> |
| `plane` | Ref (Plane) | <p>A reactive [plane](/docs/features/plane) of DOM elements captured by the function ref.</p><p>Inside the plane, DOM elements will be listed in the exact order they appear in the DOM.</p><p>Useful when you need to access these DOM elements from your Vue component's `setup` function to apply a side effect.</p> |
| `meta` | Ref (Plane) | A reactive reference to a plane of objects containing [element metadata](/docs/features/element-metadata) for each element in `plane`. The order of `meta` exactly matches the order of `plane`. |
| `status` | Ref (Object) | <p>A reactive reference to an object describing the status of `plane`.</p><p>`status` has three properties: `order`, `rowWidth`, and `columnHeight`.</p><p>After each Vue update, `status.value.order` is set to `changed` if the order of elements in your `plane` has changed, or `none` if not.</p><p>Also after each Vue update, `status.value.rowWidth` is set to `shortened` if columns have been removed from your `Plane`, `lengthened` if columns have been added, or `none` if the number of columns has not changed.</p><p>`status.value.columnHeight` behaves the same way, but it describes changes in the number of rows.</p> |
| `ids` | Ref (Plane) | <p>A reactive reference to a plane of unique IDs (Strings) for each element in `plane`.</p><p>`ids` and `plane` are always kept in exactly the same order, and when `ids` is included, IDs will also be bound automatically to the `id` attribute of your `plane`. In other words, you can be confident that `ids.value[2][4]` will be the ID assigned to the `id` attribute of `plane.value[2][4]`. IDs will always stay attached to the same element, even after elements are reordered.</p><p>`ids` is not included in every List API object. Documentation for interfaces and extensions will inform you when `ids` is included.</p> |
:::


:::
### Getting and using function refs
:::

The overarching workflow of Baleada Features is:
1. Call a Baleada Features interface, combo, or extension function in the setup function of your Vue template, passing optional parameters as needed.
2. The Baleada Features function will return a object. Inside this object, you'll find at least one element API object.
3. Get a function ref from the element API object, and use it to capture a DOM element from your Vue component's template and expose it to the Baleada Features function.
4. Internally, the Baleada Features function will access that element. It will bind attributes, add and remove event listeners, conditionally display the element, etc.

The thing that ties this whole system together is the **function ref** feature of Vue 3, which powers the `ref` property on the Element API object, and the `ref` property of the List API object.

::: type="info"
Looking for more info on what function refs are, how to use them, and why Baleada Features relies on them? Check out [this three-part screencast series](https://www.youtube.com/playlist?list=PLHP34VGeo17dkrxEksyo3-ySK7oay6huY) dedicated to function refs.
:::

As mentioned above, `elementApi.ref`, `listApi.ref`, and `planeApi.ref` are functions that each return a [function ref](https://vuejs.org/guide/essentials/template-refs.html#function-refs): a JavaScript function that accepts a DOM element and stores that DOM element in a Vue reactive references.

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

And that element API includes a `ref` property, which is a **function ref getter**, i.e. a function that returns a function ref:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.root.ref // -> function that returns a function ref
```
:::

So, to give `useGrid` access to your root element in the DOM, you need to call `grid.root.ref()`, binding the return value to the `ref` attribute of your grid's root element:

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
      `grid.root.ref()` to its ref attribute.
    
      Note that the grid root *does not* have to be
      the root element of your component, but for accessibility purposes, it should be a container element for your rows
      and cells.
    -->
    <div :ref="grid.root.ref()">
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
  // `grid.root.element` is a reactive reference,
  // with the DOM element as its `value`:
  grid.root.element.value.style.backgroundColor = 'rebeccapurple'
})
```
:::

For lists of elements, rendered by a `v-for` statement, we use the List API, which has a few subtle differences. `useGrid` again is a great example to explore this.

`useGrid` needs to access the row elements in your DOM so it can set their `role` attribute. To make this possible, `useGrid` returns a List API for rows:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.rows // -> List API object
```
:::

And that List API includes a `ref` property, which is a function ref getter:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.rows.ref // -> function that returns a function ref
```
:::

In most cases, you should use a `v-for` to programmatically render all your row elements. This is especially true for things like rows in a spreadsheet app, since the number of rows and the order of rows can change reactively as the user interacts with the app.

To give `useGrid` access to your row elements in the DOM, you need to call `grid.rows.ref`, and bind its return value to the `ref` attribute of your `v-for` element.

The `grid.rows.ref` function requires an `index` parameter. You can get that index from the `v-for` statement as shown below:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { ref } from 'vue'
import { useGrid } from '@baleada/features'

const grid = useGrid(...)
const gridData = ref([...]) // Array of data for your grid
</script>

<template>
  <section>
    <!-- Here's our grid root element again -->
    <div :ref="grid.root.ref()">
      <!--
        And here are the rows. Note how we use the v-for statement
        to access the current element's index in the list.

        We pass that index to the `grid.rows.ref` function.
        This allows the function to insert the current DOM element
        in the correct position in an array that useGrid
        tracks internally.

        If rows are reordered, deleted, or added, Vue will call
        `grid.rows.ref` again for each row, and all of useGrid's
        internal systems will sync up with the new rows.
      -->
      <div
        v-for="(row, index) in gridData"
        :key="row"
        :ref="grid.rows.ref(index)"
      >
        <!-- We'll see shortly how cells get rendered here -->
      </div>
    </div>
  </section>
</template>
```
:::

With that done, `useGrid` can now access an array of row elements internally, and perform side effects.

If you need to access the array of row elements from JavaScript, you can use `grid.rows.list`. Again, be careful not to do anything with those elements before the component is mounted, since they won't be available yet.

:::
```js
import { useGrid } from '@baleada/features'
import { onMounted } from 'vue'

const grid = useGrid(...)

onMounted(() => {
  // `grid.rows.list` is a reactive reference,
  // with the array of DOM elements as its `value`:
  for (const el of grid.rows.list.value) {
    el.style.backgroundColor = 'rebeccapurple'
  }
})
```
:::

For [planes](/docs/features/plane) of elements, rendered by a `v-for` statement with another `v-for` nested inside it, we use the Plane API. `useGrid` again is the perfect example to explore this.

`useGrid` needs to access the grid cell elements in your DOM so it can set their `role` attribute, reactively manage their `aria-selected` attribute, and support all kinds of other features. To make this possible, `useGrid` returns a Plane API for cells:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.cells // -> Plane API object
```
:::

And that Plane API includes a `ref` property, which is a function ref getter:

:::
```js
import { useGrid } from '@baleada/features'

const grid = useGrid(...)

grid.cells.ref // -> function that returns a function ref
```
:::

In most cases, you should use a `v-for` to programmatically render all your row elements, and a nested `v-for` to programmatically render all your cells in each row.

To give `useGrid` access to your cell elements in the DOM, you need to call `grid.cells.ref`, and bind its return value to the `ref` attribute of your nested `v-for` element.

The `grid.cells.ref` function requires a `coordinates` parameter, which is a set of [coordinates](/docs/features/coordinates) for the cell's position in the plane. Take those coordinates from the indices in your `v-for` statements, as shown below:

:::
```html
<!-- MyComponent.vue -->
<script setup>
import { ref } from 'vue'
import { useGrid } from '@baleada/features'

const grid = useGrid(...)
const gridData = ref([...]) // Array of data for your grid
</script>

<template>
  <section>
    <!-- Here's our grid root element again -->
    <div :ref="grid.root.ref()">

      <!-- And here are our grid row elements again -->
      <div
        v-for="(row, rowIndex) in gridData"
        :key="row.id"
        :ref="grid.rows.ref(index)"
      >
        <!--
          And here are the cells.
          
          In this example, grid data is an array of objects for
          each row. Each row object has an `id` and a `cells`
          property, and `row.cells` is an array of cell data.
        
          Note how we use the rows' v-for statement to access the
          row index, and the nested v-for statement to access the
          column index.

          We assemble those indices into a coordinates object,
          which we can pass to the `grid.cells.ref` function.
          This tells the useGrid internals exactly where each
          cell is located.

          If rows or columns are reordered, deleted, or added, Vue
          will call `grid.cells.ref` again for each cell, and all
          of useGrid's internal systems will sync up with the new
          grid.
        -->
        <div
          v-for="(cell, columnIndex) in row.cells"
          :key="cell.id"
          :ref="grid.cells.ref({
            row: rowIndex,
            column: columnIndex,
          })"
        >...</div>
      </div>
    </div>
  </section>
</template>
```
:::

With that done, `useGrid` can now access a plane of cell elements internally, and perform side effects.

If you need to access the plane of cell elements from JavaScript, you can use `grid.cells.plane`. Again, be careful not to do anything with those elements before the component is mounted, since they won't be available yet.

:::
```js
import { useGrid } from '@baleada/features'
import { onMounted } from 'vue'

const grid = useGrid(...)

onMounted(() => {
  // Note that `grid.cells.plane` is a reactive reference,
  // so you have to go through its .value property to access
  // the actual `Plane` of DOM elements.
  //
  // We can loop over `plane.value.points()` to access
  // each cell element in the plane.
  for (
    const { point: el }
    of grid.cells.plane.value.points()
  ) {
    el.style.backgroundColor = 'rebeccapurple'
  }
})
```
:::


::: type="info"
For more information on why and how this all works, and how you might use this pattern to build your own custom features, consider buying a copy of [Rethinking Reusability in Vue](https://rethinking-reusability-in-vue.alexvipond.dev)! Use the coupon code BALEADA at checkout for $15 off.
:::

