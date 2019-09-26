<template lang="md">
<NiftyHeading :level="1">
# Using with React
</NiftyHeading>
<UpdatedAt timestamp="Thu Sep 26 2019 16:41:14 GMT-0600 (CST)" />

<NiftyHeading level="2">
Import a component (allows for tree-shaking)
</NiftyHeading>

React `@baleada/icons` components can be imported from `@baleada/icons/react`.

```js
import { EvaGlobe2 } from '@baleada/icons/react'
```


<NiftyHeading level="2">
Use a component
</NiftyHeading>


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

These 4 attributes are easy to override or expand—simply pass an object to the component's `attrs` prop. All of the `attrs` (including event listeners) are passed directly to the SVG.

```js
export default function MyComponent() {
  ...

  return (
    <SimpleGeocaching
      attrs={{
        preserveAspectRatio: "none",
        className: "h-4 w-4 fill-current inline-block text-blue-600"
      }}
    />
    <EvaGlobe2
      attrs={{
        'aria-label': "A nifty globe icon",
        onClick: () => console.log('Eva icon was clicked')
      }}
    />
  )
}
```
</template>

<script>
export default {
  layout: 'article',
  head: () => ({
    title: 'Baleada - Using with React',
  })
}
</script>
