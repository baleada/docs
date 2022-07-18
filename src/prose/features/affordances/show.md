---
title: show
tags: UI Logic
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

The [`useTablist` example](/docs/features/interfaces/tablist#example) is another good demo—it uses `show` under the hood to toggle an array of tab panel elements.

:::
## Usage
:::

To conditionally display a DOM element, call the `show` function, which requires two parameters: the element or elements you're conditionally showing, and the condition the element or elements need to meet. `show` also accepts an optional `options` object as its final parameter.

:::
```js
import { show } from '@baleada/vue-features'

export function myCompositionFunction (...) {
  show(elementOrListOrPlane, condition[, options])
}
```
:::

::: type="info"
Usually, you'll call `show` from inside another composable, but it also works in `script setup`.
:::

Here's a breakdown of the required parameters:

::: ariaLabel="show parameter breakdown" classes="wide-5"
| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `elementOrListOrPlane` | See description | yes | none | <p>A reactive reference to the DOM element or elements you're binding data to.</p><p>`elementOrListOrPlane` can be one of the following types: </p><ul><li>HTMLElement</li><li>Array of HTMLElements</li><li>`Plane` of HTMLElements</li><li>Reactive reference to any of the above types</li></ul><p>See the [How to format your condition](#how-to-format-your-condition) section for more guidance on conditionally displaying specific elements in a reactive array.</p> |
| `condition` | Ref (Boolean), Function, Object | yes | none | <p>Indicates whether or not `elementOrListOrPlane` should be displayed.</p><p>See the [How to format your condition](#how-to-format-your-condition) section for more guidance on formatting your condition.</p> |
:::


And here's a breakdown of the `options` object:

::: ariaLabel="show options object breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `transition` | Object | no | none | <p>An object that contains methods and/or CSS classes for enter/leave transitions.</p><p>See the [How to format enter/leave transitions](#how-to-format-enter-leave-transitions) section for more guidance, including tips for type-safe transition definitions using TypeScript.</p> |
:::


:::
### How to format your condition
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

show(
  myElement,
  isShown,
)
```
:::

`show` watches your reactive value for changes. When the value is `true`, your element is displayed, and when it's `false`, the element is hidden.

But what about when the `element` is a reactive array of elements, rather than a single reactive element reference? How do we make each element is correctly shown or hidden?

If you only need to conditionally display your elements once, you can pass the **value getter** instead of a reactive Boolean. The value getter is a callback function that receives only one argument: the `index` (Number) of a given element in your reactive array of elements. It should return `true` for elements that should be shown, and `false` for elements that should be hidden.

But more commonly, you'll need to conditionally display an array of elements based on some other piece of reactive data. For those cases, you can pass a **reactive value getter** as the key's value.

A reactive value getter is an **object**, as described in the [`bind`](/docs/features/affordances/bind#how-to-format-values) guide. Here's a breakdown of that object:

::: ariaLabel="reactive value getter breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `get` | Function | yes | none | A value getter, as described above. |
| `watchSource` | Ref, Array | yes | none | <p>A single [watch source](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-a-single-source), or an array of watch sources. No need to pass your reactive array of elements—that data is already watched automatically.</p><p>Each time `show` detects a change in your watch sources (or the reactive array of elements), it will iterate through your array of elements, calling `get` for each one.</p> |
:::

Here's an example of how [`useTablist` ](/docs/features/interfaces/tablist) uses this feature to conditionally display tab panels, displaying only the currently selected panel:

:::
```js
export function useTablist (...) {
  ...

  show(
    // Reactive array of tab panel elements
    panels.elements,
    {
      // `selected.value.newest` is a reactive reference to the
      // index of the currently selected tab panel.
      //
      // Every panel should be hidden, except for the panel
      // whose index is a match.
      //
      // This `get` callback should run again each time
      // `selected.value.newest` changes.
      get: index => index === selected.value.newest,
      watchSource: () => selected.value.newest,
    },
    options
  )

  ...
}
```
:::

Finally, let's look at how this all works with a `Plane`, the Baleada Features data structure for an array of arrays of elements.

The value format for a `Plane` is almost identical to the format for arrays of elements. When you only need to conditionally display the elements in the `Plane` once, you can pass the **value getter**. The value getter for a `Plane` is a callback function that receives two arguments: the `row` index (Number) and `column` index (Number) of a given element in your `Plane` of elements. It should return `true` for elements that should be shown, and `false` for elements that should be hidden.

Here's an example of how that would look:

:::
```js
import { show } from '@baleada/vue-features'

export function myComposable (...) {
  ...

  show(
    // Reactive `Plane` of elements
    myPlane,
    {
      get: (row, column) => {
        // Based on `row` and `column`, return `true` for
        // elements that should be shown, and `false` for
        // elements that should be hidden.
      },
      watchSource: [
        // Any watch sources that should cause the `get` callback
        // to re-run and conditionally display each element again.
      ],
    },
    options
  )

  ...
}
```
:::


:::
### How to format enter/leave transitions
:::

As outlined above, `show` accepts an optional `options` object as its final parameter, and that object's only property is `transition`.

You can use this `transition` property to configure an enter/leave transition that will more smoothly show and hide your element or elements.

The API for `show`'s `transition` option is inspired by the API of [Vue's `Transition` component](https://vuejs.org/guide/built-ins/transition.html). Both CSS and JS transitions are supported.

The value of the `transition` property should be an object configuring your transition. That object can have these properties:
- `appear`
- `enter`
- `leave`

Each property of your transition config can either be a CSS transition or a JS transition, whose formats are explained in more detail in the next section.

Before diving in to transition formats, note a few points:
- It's possible to mix and match transitions, i.e. you can have a CSS `enter` transition and a JS `leave` transition.
- It's not required to define a transition for every state, i.e. you can define an `enter` transition with no `leave` transition.
- Just like with Vue's `Transition` component, you can set `appear` to `true`, and your element will use the `enter` transition when it first appears.

Now, let's go through the CSS and JS transition formats individually, and finish up by looking at type-safe transitions for TypeScript users.


:::
#### CSS transitions
:::

CSS transitions are configured by objects. Here's a breakdown of the CSS transition object:

::: ariaLabel="CSS transition object breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `from` | String | yes | none | One or more space-separated CSS classes that should be added to the target element to apply initial styles. |
| `active` | String | yes | none | One or more space-separated CSS classes that should be added to the target element one frame after the `from` classes get added, and kept on the element until it finishes transitioning. |
| `to` | String | yes | none | One or more space-separated CSS classes that should be added to the target element to define where it transitions to. |
| `start` | Function | no | none | A callback that `show` will call with no arguments, right before adding `from` classes. Useful for performing pre-transition side effects. |
| `end` | Function | no | none | A callback that `show` will call with no arguments, one animation frame after the transition ends, in the same animation frame that `active` and `to` classes are removed. Useful for performing post-transition side effects, like focusing a form control. |
| `cancel` | Function | no | none | A callback that `show` will call with no arguments, one animation frame after the transition cancels. Useful for performing post-cancel side effects, like focusing a form control. |
:::

Here's a more detailed breakdown of transition timing:
1. The optional `start` callback gets called
2. `from` classes get added
3. One animation frame later, `active` classes get added
4. One animation frame later, `from` classes get removed, and `to` classes get added
5. Transition eventually ends
6. One animation frame later, `active` and `to` classes get removed, and `show` calls the optional `end` callback

Cancel timing:
1. Transition is canceled by setting `transition-property` to `none` and removing `from`, `active`, and `to` classes
2. One animation frame later, `transition-property` is restored to its original value (if any) and `show` calls the optional `cancel` callback
3. `show` never calls the optional `end` callback


:::
```js
import { show } from '@baleada/vue-features'

show(
  myElement,
  myCondition,
  {
    transition: {
      // Example fade-in transition using Tailwind classes
      enter: {
        from: 'opacity-0 scale-[98%]',
        active: 'transition ease-out duration-150',
        to: 'opacity-100 scale-100',

        // Optional callbacks for post-transition side effects
        end: () => myElement.value.focus(),
        cancel: () => someOtherElement.value.focus(),
      }
    }
  }
)
```
:::


:::
#### JS transitions
:::

JS transitions are configured by objects. Here's a breakdown of the JS transition object:

::: ariaLabel="JS transition object breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `before` | Function | no | none | <p>Performs side effects before the transition starts.</p><p>See the list below this table for more info on `before` parameters.</p> |
| `active` | Function | no | none | <p>Performs the bulk of JS transition work</p><p>**Important:** in addition to the parameters explained below this table, `active` receives a final `done` parameter.</p><p>`done` is a callback that you should call with no arguments when the JS transition has been completed.</p> |
| `after` | Function | no | none | <p>Performs side effects after the transition ends.</p><p>See the list below this table for more info on `before` parameters.</p> |
| `cancel` | Function | no | none | <p>Performs side effects after the transition cancels.</p><p>See the list below this table for more info on `before` parameters.</p> |
:::

More info on the parameters passed to these callbacks:
- When you're transitioning a single element, the callbacks receive no parameters.
- When you're transitioning a list, the callbacks get called for each element, and the receive the index (number) of the element currently being transitioned.
- When you're transitioning a `Plane`, the callbacks get called for each element, and they receive the row (Number) and column (Number) of the element currently being transitioned.
- Remember that `active` receives its `done` parameter _after_ any index/row/column parameters. Call `done` with no arguments when the JS transition has been completed.


:::
```js
import { show } from '@baleada/vue-features'

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

Here's a more detailed breakdown of JS transition timing:

::: ariaLabel="JS transition hook timing"
| Callback | When it's called |
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


:::
#### Type-safe transitions
:::

Baleada Features exports a `defineTransition` helper function that you can use to define type-safe transition configurations for `appear`, `enter`, and `leave`.

`defineTransition` is a no-op—you pass in a transition configuration object as its first and only parameter, and the exact same object gets returned.

Type safety comes from the generic types that you can pass to `defineTransition`.

::: ariaLabel="defineTransition generic types breakdown"
| Generic | Required | Default | Description |
| --- | --- | --- | --- |
| `BindElement` | yes | none | <p>A type that describes the type of element being transitioned. Valid types include:</p><ul><li>`HTMLElement`</li><li>`HTMLElement[]`</li><li>`HTMLElement[][]`</li><li>Vue's `Ref` type, with any of the above types passed in as a generic</li></ul><p>Normally, you'll use the `typeof` operator to infer this type—see example below this table.</p> |
| `TransitionType` | yes | none | A string literal—it can be `'css'` or `'js'`, depending on what kind of transition you're configuring. |
:::

Here's a code example:
:::
```ts
import { ref } from 'vue'
import {
  show,
  defineTransition,
  useElementApi
} from '@baleada/vue-features'

const element = ref<HTMLElement>()
const elementIsShown = ref(false)

show(
  element,
  elementIsShown,
  {
    transition: {
      appear: true,
      // It's recommended to use the `typeof` operator to infer
      // the first generic type, instead of manually passing a
      // valid type.
      //
      // The second generic type defines `enter` as a CSS transition.
      enter: defineTransition<typeof element, 'css'>({
        // `from`, `active`, and `to` are type-checked as strings
        from: ..., active: ..., to: ...,
        // `end` and `cancel` are type checked as functions
        end: ..., cancel: ...,
      }),

      // You can pass 'js' as the second generic to define a
      // type-safe JS transition:
      leave: defineTransition<typeof element, 'js'>({
        // All properties are type-checked as functions
        before: () => { ... },
        after: () => { ... },
        cancel: () => { ... },
        // The `active` function actually has a few different
        // signatures. For single elements, it just receives
        // the `done` callback as its first and only parameter.
        //
        // For lists and planes, though, it can receive the `index`
        // or the `row` & `column` as parameters, with the `done`
        // callback always passed as the last parameter. TypeScript
        // will correctly type-check all three of these variations
        // with the help of your generic types.
        active: (done) => { ... },
    }
  }
)
```
:::
