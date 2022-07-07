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

Now, let's go through the CSS and JS transition formats individually.


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
| `end` | Function | no | none | A callback that `show` will call with no arguments, one animation frame after the transition ends, in the same animation frame that `active` and `to` classes are removed. Useful for performing post-transition side effects, like focusing a form control. |
| `cancel` | Function | no | none | A callback that `show` will call with no arguments, one animation frame after the transition cancels. Useful for performing post-cancel side effects, like focusing a form control. |
:::

Here's a more detailed breakdown of transition timing:
1. `from` classes get added
2. One animation frame later, `active` classes get added
3. One animation frame later, `from` classes get removed, and `to` classes get added
4. Transition eventually ends
5. One animation frame later, `active` and `to` classes get removed, and `show` calls the optional `end` callback

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

If you're transitioning a single element, the `before`, `after` and `cancel` hooks receive no arguments. The `active` hook receives one argument: `done`, a function that you should call with no arguments when you've finished transitioning the element.

:::
```js
import { show } from '@baleada/vue-features'

// Element transition hooks
show(
  ...
  {
    transition: {
      enter: {
        before: () => {...},
        active: (done) => {...},
        after: () => {...},
        cancel: () => {...},
      }
    }
  }
)
```
:::

If you're transitioning multiple elements, the `before`, `after` and `cancel` hooks each receive only one argument: the `index` (Number) of the elements that is currently being transitioned. The `active` hook receives two arguments: the `index` (Number) of the elements that is currently being transitioned, and `done`, a function that you should call with no arguments when you've finished transitioning the element.

:::
```js
import { show } from '@baleada/vue-features'

// List transition hooks
show(
  ...
  {
    transition: {
      enter: {
        before: (index) => {...},
        active: (index, done) => {...},
        after: (index) => {...},
        cancel: (index) => {...},
      }
    }
  }
)
```
:::

None of the transition hooks should have a return value, and all of them are optional.

If you'd like to use your `enter` functions for `appear` transitions, you can either pass those same functions in the `appear` object, or you can simply replace the `appear` object with `true`:

:::
```js
import { show } from '@baleada/vue-features'

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

<!-- ::: type="info"
[Check out this REPL]() for an example of how to use Baleada Logic's [Animateable](/docs/logic/classes/Animateable) and [Delayable](/docs/logic/classes/Delayable) classes to write JavaScript animations inside your `transition` hooks.
::: -->

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


:::
### Type-safe transitions
:::
