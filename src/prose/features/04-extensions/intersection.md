---
title: Intersection
source: useIntersection.ts
tests: suites/extensions/useIntersection.test.ts
publish: true
order: 0
---

`useIntersection` is an [extension](/docs/features/extensions-overview) that tracks whether or not an element has entered a viewport.

Under the hood, `useIntersection` uses the `IntersectionObserver` API for performant intersection tracking.


:::
## Example
:::

<LayoutExample component="ExampleUseIntersection" />



::: type="warning"
Under construction 🚧
:::

<!-- :::
## Create visibility
:::

To start tracking visibility, call the `useIntersection` function, which accepts two parameters:

::: ariaLabel="useIntersection parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `extendable` | Interface, Ref (HTMLElement) | yes | <p>The return object from a Baleada Features [interface](/docs/features#using-functions), or a reactive reference to an HTML element.</p><p>If you pass an interface object, `useIntersection` will track the size of the `root` element.</p> |
| `options` | Object | no | Passes customization options. See the next table for more guidance. |
:::

Here's a breakdown of the `useIntersection` options:

::: ariaLabel="useIntersection options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `observer` | Object | no | none | The `options` parameter of the [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver). |
:::

::: type="info"
**Note**: for the `root` option of the Intersection Observer constructor, you would normally pass an HTML element. However, in your `setup` function, you won't be able to reliably access DOM elements before the component is mounted.

Instead of passing the unreliable DOM element to `options.observer.root`, you can pass a reactive reference to an HTML element. `useIntersection` will resolve that reference before setting up the Intersection Observer.
:::

:::
```html -->
<!-- MyComponent.vue -->
<!-- <template>
  <div ref="viewport">
    <div :ref="tablist.root.ref()">...</div>
  </div>
</template>

<script setup>
import { useTablist, useIntersection } from '@baleada/vue-features'

const tablist = useTablist(),
      viewport = ref(null),
      visibility = useIntersection(
        tablist,
        {
          threshold: 0.5,
          // When in the `setup` function, pass a reactive
          // reference instead of an unreliable HTML element
          // to `options.observer.root` if needed.
          root: viewport,
        }
      )
</script>
```
:::


:::
## Use your visibility
:::

`useIntersection` returns `visibility`—an object with tools you can use to react to an element's visibility and visibility.

Here's a breakdown of that object:

::: ariaLabel="visibility breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `rect` | Ref (Number) | <p>A reactive reference to an object containing three different bounding rectangles.</p><ul><li>`rect.visible` contains the [`intersectionRect`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRect), i.e. the rectangle around the visible area of your element.</li><li>`rect.bounding` contains the [`boundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/boundingClientRect), i.e. the rectangle around your entire element, including non-visible area.</li><li>`rect.viewport` contains the [`rootBounds`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/rootBounds), i.e. the rectangle around the viewport that shows or hides your element.</li></ul> |
| `ratio` | Ref (Number) | <p>A reactive reference to the area of `rect.visible` divided by the area of the `rect.bounding`.</p><p>In other words, a number between `0` and `1` indicating how much of the element is visible, with `1` being the highest visibility.</p> |
| `status` | Ref (String) | <p>A reactive reference to a String describing the state of your element: `visible` or `invisible`.</p> |
| `isVisible` | Ref (Boolean) | <p>A reactive reference to a Boolean describing the visibility of your element. `isVisible` is `true` when `status` is `visible`, and `false` when it's `invisible`.</p> |
| `time` | Ref (DOMHighResTimestamp) | A reactive reference to the [time](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/time) of the most recent change in visibility. |
:::
 -->
