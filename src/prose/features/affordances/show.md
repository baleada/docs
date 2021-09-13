---
title: show
tags: Composition functions
publish: true
order: 0
---

`show` is a function that can conditionally show or hide elements in the DOM, using the CSS `display` property under the hood. It works with static values—conditionally displaying once—and reactive values—showing and hiding elements each time the value changes.

::: type="info"
`show` reimplements the `v-show` affordance from Vue templates.
:::

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleShow.vue)

<ExampleShow class="with-mt" />

The [`useTablist` example](/docs/features/functions/useTablist#example) is another good demo—it uses `show` under the hood to toggle an array of tab panel elements.

:::
## Usage
:::

To conditionally display a DOM element, call the `show` function, which requires one parameter: the `required` Object, and accepts an optional `options` object as its second parameter.

:::
```js
import { show } from '@baleada/vue-features'

export default function myCompositionFunction (...) {
  show(required, options)
}
```
:::

::: type="info"
Usually, you'll call `show` from inside another composition function, but it also works in the `setup` function of any Vue component.
:::

Here's a breakdown of the `required` object:

::: ariaLabel="show required object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `element` | Ref (HTMLElement), Array | yes | none | <p>A reactive reference to the DOM element you're conditionally displaying.</p><p>`element` Can also be a reactive reference to an array of DOM elements. See the [How to format your condition](#how-to-format-your-condition) section for more guidance on conditionally displaying specific elements in a reactive array.</p> |
| `condition` | Ref (Boolean), Function, Object | yes | none | <p>Indicates whether or no a specific `element` should be displayed.</p><p>See the [How to format your condition](#how-to-format-your-condition) section for more guidance on formatting your condition.</p> |
:::


Here's a breakdown of the `options` object:

::: ariaLabel="show options object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `transition` | Object | no | none | <p>An object that contains methods and/or CSS classes for enter/leave transitions.</p><p>See the [How to format enter/leave transitions](#how-to-format-enter-leave-transitions) section for more guidance.</p> |
:::


:::
#### How to format your condition
:::

There are several different ways to format the condition that `show` uses to determine whether or not an element should be displayed.

The simplest type of condition is a reactive reference to a Boolean:

:::
```js
import { ref } from 'vue'

const isShown = ref(true),
      myElement = ref(null) 
      // ☝️ A Vue component would populate this ref 
      // with a DOM element after the component is
      // mounted.

show({
  element: myElement,
  condition: isShown,
})
```
:::

`show` watches your reactive value for changes. When the value is `true`, your element is displayed, and when it's `false`, the element is hidden.

But what about when the `element` is a reactive array of elements, rather than a single reactive element reference? How do we make each element is correctly shown or hidden?

If you only need to conditionally display your elements once, you can pass the **value getter** instead of a reactive Boolean. The value getter is a callback function that receives an object as its only argument. Here's a breakdown of that object:

::: ariaLabel="getValue object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `element` | HTMLElement | The actual DOM element that `show` is currently conditionally displaying. |
| `index` | Number | The index (Number) of `element` in your reactive array of elements. |
:::

Your value getter should return `true` for elements that should be shown, and `false` for elements that should be hidden.

But more commonly, you'll need to conditionally display an array of elements based on some other piece of reactive data. For those cases, you can pass an Object as the `condition`:

:::
```js
show({
  element: myReactiveArrayOfElements,
  condition: { ... },
})
```
:::

Here's a breakdown of that object:

::: ariaLabel="getValue object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `getValue` | Function | yes | none | A value getter, as described above. |
| `watchSources` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass the reactive array of elements—that data is already watched automatically.</p><p>Each time `show` detects a change in your watch sources (or the reactive array of elements), it will iterate through your array of elements, calling `getValue` to conditionally display each element.</p> |
:::

Here's an example of how [`useTablist` ](/docs/features/functions/useTablist) uses this feature to conditionally display tab panels, displaying only the currently selected panel:

:::
```js
export default function useTablist (...) {
  ...

  show({
    // Reactive array of tab panel elements
    element: panels.targets,
    condition: {
      // selectedPanel is a reactive reference to the index
      // of the currently selected tab panel.
      //
      // Every panel should be hidden, except for the panel
      // whose index is a match.
      //
      // This getValue should run again each time
      // selectedPanel changes.
      getValue: ({ index }) => index === selectedPanel.value,
      watchSources: selectedPanel,
    }
  }, options)

  ...
}

```
:::


:::
### How to format enter/leave transitions
:::

As outlined above, `show` accepts an optional `options` object as its second parameter, and that object's only property is `transition`.

You can use this `transition` property to configure an enter/leave transition that will more smoothly show and hide your elements.

The API for `show`'s `transition` property is inspired by the API of [Vue's `Transition` component](https://v3.vuejs.org/guide/transitions-enterleave.html):


:::
```js
show(
  required,
  {
    transition: {
      enter: {
        before: ...,
        active: ...,
        after: ...,
        cancel: ...,
      },
      leave: {
        before: ...,
        active: ...,
        after: ...,
        cancel: ...,
      },
      appear: {
        before: ...,
        active: ...,
        after: ...,
        cancel: ...,
      },
    }
  }
)
```
:::

All hooks receive an object as their first and only argument. Here's a breakdown of that object:

::: ariaLabel="hook API object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `element` | HTMLElement | The actual DOM element that is transitioning. |
| `index` | Number | The index (Number) of `element` in your reactive array of elements. |
| `done` | Function | <p>A function that you should call with no arguments when an `active` hook has finished transitioning the `element`.</p><p>`done` is only available for `active` hooks. The object passed to `before`, `after`, and `cancel` hooks does not have a `done` property.</p> |
:::

None of the transition hooks should have a return value, and all of them are optional.

:::
```js
show(
  required,
  {
    transition: {
      enter: {
        before: ({ target, index }) => { /* do the thing */ },
        active: ({ target, index, done }) => {
          // Do the thing
          // Call `done` when the thing is finished.
          done()
        },
        after: ({ target, index }) => { /* do the thing */ },
        cancel: ({ target, index }) => { /* do the thing */ },
      },
      ...
    }
  }
)
```
:::

If you'd like to use your `enter` functions for `appear` transitions, you can either pass those same functions in the `appear` object, or you can simply replace the `appear` object with `true`:

:::
```js
show(
  required,
  {
    transition: {
      appear: true,
      // Enter functions will be called when the element
      // is displayed for the first time.
      enter: { ... },
      ...
    }
  }
)
```
:::

::: type="info"
[Check out this REPL]() for an example of how to use Baleada Logic's [Animateable](/docs/logic/classes/Animateable) and [Delayable](/docs/logic/classes/Delayable) classes to write JavaScript animations inside your `transition` hooks.
:::

::: type="warning"
`show`'s `transition` feature only supports JavaScript animations right now.

Support for CSS transitions and animations, like you see in the Vue's `Transition` component, will be explored in the future.
:::


:::
### Transition hook timing
:::

Here's a breakdown of exactly when each transition hooks gets called:

::: ariaLabel="transition hook timing"
| Hook | When it's called |
| --- | --- |
| `appear.before` | Right before the element's `display` property is changed to show the element for the first time. |
| `appear.active` | Right after the element's `display` property is changed to show the element for the first time. |
| `appear.after` | Right after `appear.active`, assuming the transition was not canceled. |
| `appear.cancel` | When reactive data changes cause `show` to hide the element after `appear.active` starts AND before the `done` function has been called inside `appear.active`. |
| `enter.before` | Right before the element's `display` property is changed to show the element. Does not run when this happens for the first time. |
| `enter.active` | Right after the element's `display` property is changed to show the element. Does not run when this happens for the first time. |
| `enter.after` | Right after `enter.active`, assuming the transition was not canceled. |
| `enter.cancel` | When reactive data changes cause `show` to hide the element after `enter.active` starts AND before the `done` function has been called inside `enter.active`. |
| `leave.before` | Right after reactive data changes cause `show` to hide the element. |
| `leave.active` | Right after `leave.before`. |
| `leave.after` | Right after the element's `display` property is changed to hide the element, which in turn happens right after the `done` function is called inside `leave.active`. |
| `leave.cancel` | When reactive data changes cause `show` to show the element after `leave.active` starts AND before the `done` function has been called inside `leave.active`. |
:::

