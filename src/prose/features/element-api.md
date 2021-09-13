---
title: Element API
tags: Composition functions
publish: true
order: 1
---

In the return value for each of Baleada Features' functions, you'll find at least one **element API** object.

Broadly, the purpose of the element API is to capture DOM elements from your Vue template, so that a Baleada Features composition function can use that DOM element internally.

The element API also gives you an easy way to access those DOM elements in case you need to do additional work with them in your Vue component's `setup` function.

There are two types of element APIs:
1. **Single element API**, designed for individual DOM elements.
2. **Multiple elements API**, designed for a list of DOM elements rendered by a `v-for` statement in your template.

Again, each of these APIs is an object, nested inside the object returned by a Baleada Features function. For example:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.root // -> single element API object
tablist.tabs // -> multiple elements API object
```
:::

::: type="warning"
Note: Baleada Features' affordances don't follow this pattern, and don't return anything at all.

This API applies only to the functions listed under the **Functions** heading in the **Features** section of the sidebar on the left.
:::


:::
## Using the element API
:::

First, here's a breakdown of the single element API object:

::: ariaLabel="single element API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `ref` | Function | <p>A [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for).</p><p>`singleElementApi.ref` should be bound to the DOM element that you want to capture.</p><p>See the [Getting and using refs](#getting-and-using-refs) section for more guidance.</p> |
| `element` | Ref (HTMLElement) | <p>A reactive reference to the DOM element captured by `singleElementApi.ref`.</p><p>Useful when you need to access that DOM element from your Vue component's `setup` function to apply a side effect.</p> |
:::

And here's a breakdown of the multiple elements API object:

::: ariaLabel="multiple elements API breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `getRef` | Function | <p>A function that returns a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for). The function ref returned by `multipleElementsApi.getRef` should be bound to the `ref` attribute of an element in your Vue template that has a `v-for` statement.</p><p>Call `multipleElementsApi.getRef` with one argument: the `index` (Number) of the current element, which you can get from the `v-for` statement.</p><p>See the [Getting and using refs](#getting-and-using-refs) section for more guidance.</p> |
| `elements` | Ref (Array) | <p>A reactive reference to an array of DOM elements captured by the function ref. Inside the array, DOM elements will be listed in the exact order they appear in the DOM.</p><p>Useful when you need to access these DOM elements from your Vue component's `setup` function to apply a side effect.</p> |
:::


:::
### Getting and using refs
:::

The overarching workflow of Baleada Features is:
1. Call a Baleada Features function in the setup function of your Vue template, passing optional parameters as needed.
2. The Baleada Features function will return a object. Inside this object, you'll find at least one element API object.
3. Get a function ref from the element API object, and use it to capture a DOM element from your Vue component's template and expose it to the Baleada Features function.
4. Internally, the Baleada Features function will access that element. It will bind attributes, add and remove event listeners, conditionally display, etc.

The thing that ties this whole system together is the `ref` property on the single element API object, and the `getRef` property of the multiple elements API object.

As mentioned above, `singleElementAPI.ref` is a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for): a JavaScript function that accepts a DOM element as one of parameters, and stores that DOM element inside one of Vue's reactive references.

`multipleElementsAPI.getRef` is a function that **returns** a function ref.

In Baleada Features, that DOM element is always the **only** parameter of the function ref.

To see how that works when capturing a single DOM element, let's look at [`useTablist`](/docs/features/functions/useTablist) as an example.

Internally, `useTablist` needs to perform a few side effects on your tablist's root element:
- Set the element's `role` attribute to `tablist`
- Set the element's `aria-orientation` attribute to `horizontal` or `vertical`, depending on the options you originally pass to the `useTablist` function
- Set the `aria-label` attribute to a String that you provide, or alternatively, set the `aria-labelledby` attribute to the ID of the DOM element that contains your screen-reader-accessible label for the tablist. Again, this is configurable using options that you pass when you call the `useTablist` function.

To perform these side effects, `useTablist` needs you to somehow give it access to the correct DOM element. That's where the element API comes in!

`useTablist`'s return object includes a element API for a "root" element:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.root // -> "single target" API object
```
:::

And that element API includes a `ref` property, holding a function ref:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.root.ref // -> function ref
```
:::

So, to give `useTablist` access to your root element in the DOM, you need to bind `tablist.root.ref`, to the `ref` attribute of your tablist's root element:

:::
```html
<!-- MyComponent.vue -->
<script>
import { useTablist } from '@baleada/features'

export default {
  setup () {
    const tablist useTablist(...)
    return { tablist }
  }
}
</script>

<template>
  <section>
    <!--
      This div is the tablist root in this example. We bind
      `tablist.root.ref` to its ref attribute.
    
      Note that the tablist root *does not* have to be
      the root element of your component, but for accessibility purposes, it should be a container element for your tabs
      and panels.
    -->
    <div :ref="tablist.root.ref">
      ...
    </div>
  </section>
</template>
```
:::

With that done, `useTablist` can now access the tablist root internally and do what it needs to do.

Also, if you need to access the root element from JavaScript, you can use `tablist.root.element`. Just be careful not to do anything with that element before the component is mounted, since it won't be available yet.

:::
```js
import { useTablist } from '@baleada/features'
import { onMounted } from 'vue'

export default {
  setup () {
    const tablist = useTablist(...)

    onMounted(() => {
      // Note that `tablist.root.element` is a reactive reference,
      // so you have to go through its .value property
      // to access the actual DOM element.
      tablist.root.element.value.style.backgroundColor = 'rebeccapurple'
    })

    return { tablist }
  }
}
```
:::

For lists of elements, generated by a `v-for` statement, the element API has a few subtle differences. `useTablist` again is a great example to explore this.

`useTablist` needs to access the tab elements in your DOM so it can set their HTML attributes, add keyboard event listeners, handle focus and navigation, etc.

To make this possible, `useTablist` includes another element API for tabs:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.tabs // -> "multiple targets" API object
```
:::

And that element API includes a `getRef` property, holding a function that returns a function ref:

:::
```js
import { useTablist } from '@baleada/features'

const tablist useTablist(...)

tablist.tabs.getRef // -> function that returns a function ref
```
:::

In most cases, you should use a `v-for` to programmatically create all your tab elements. This is especially true for things like tabs in a spreadsheet app, since the number of tabs and the order of tabs can change reactively as the user interacts with the app.

To give `useTablist` access to your tabs elements in the DOM, you need to call `tablist.tabs.getRef`, and bind its return value to the `ref` attribute of your `v-for` element.

The `tablist.tabs.getRef` function also requires an `index` as its only parameter. You can get that index from the `v-for` statement as shown below:

:::
```html
<!-- MyComponent.vue -->
<script>
import { ref } from 'vue'
import { useTablist } from '@baleada/features'

export default {
  setup () {
    const tablist useTablist(...),
          tabs = ref([...]) // Array of metadata for your tabs

    return { tablist, tabs }
  }
}
</script>

<template>
  <section>
    <!-- Here's our tablist root element again -->
    <div :ref="tablist.root.ref">
      <!--
        And here are the tabs!
        
        Note how we use the v-for statement to access the current
        element's index in the list.

        We pass that index to the `tablist.tabs.getRef` function.
        This allows the function to insert the current DOM element
        in the correct position in an array that useTablist
        tracks internally.

        If tabs are reordered, deleted, or added, Vue will run
        `tablist.tabs.getRef` function again, always ensuring that
        the order of useTablist's internal array is always
        perfectly in sync with the actual number and order of
        elements in the DOM.
      -->
      <div
        v-for="(tab, index) in tabs"
        :key="tab"
        :ref="tablist.tabs.getRef(index)"
      >
        {{ tab }}
      </div>
    </div>
  </section>
</template>
```
:::

With that done, `useTablist` can now access an array of tab elements internally, and perform side effects.

If you need to access the array of tab elements from JavaScript, you can use `tablist.tabs.elements`. Again, be careful not to do anything with those elements before the component is mounted, since they won't be available yet.

:::
```js
import { useTablist } from '@baleada/features'
import { onMounted } from 'vue'

export default {
  setup () {
    const tablist = useTablist(...)

    onMounted(() => {
      // Note that `tablist.tabs.elements` is a reactive reference,
      // so you have to go through its .value property
      // to access the actual array of DOM elements.
      tablist.tabs.elements.value.forEach(el => {
        el.style.backgroundColor = 'rebeccapurple'
      })
    })

    return { tablist }
  }
}
```
:::


::: type="info"
For more information on why and how this all works, and how you might use this pattern to build your own custom features consider picking up a copy of [Rethinking Reusability in Vue](https://rethinking-reusability-in-vue.alexvipond.dev)!
:::

