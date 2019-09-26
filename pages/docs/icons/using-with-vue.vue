<template lang="md">
# Using with Vue
<UpdatedAt timestamp="Wed Sep 25 2019 14:35:59 GMT-0600 (CST)" />

All components will render an SVG of their icon. The SVG has 4 default attributes:

```html
<svg
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  preserveAspectRatio="xMinYMin meet"
>
  ...
</svg>
```

These 4 attributes are easy to override or expand—all of the component's attributes, event listeners, and class & style bindings are passed directly to the SVG.

```html
<template lang="html">
  <SimpleGeocaching
    preserveAspectRatio="none"
    :class="'h-4 w-4 fill-current inline-block text-blue-600'"
  />
  <EvaGlobe2
    aria-label="A nifty globe icon"
    @click.native="() => console.log('Eva icon was clicked')"
  />
</template>

<script>...</script>
```
</template>

<script>
export default {
  layout: 'article',
  head: () => ({
    title: 'Baleada - Using with Vue',
  })
}
</script>
