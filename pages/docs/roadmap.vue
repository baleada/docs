<template lang="md">
<NiftyHeading :level="1">
# Roadmap
</NiftyHeading>
<UpdatedAt timestamp="Thu Sep 26 2019 18:51:05 GMT-0600 (CST)" />

<NiftyHeading level="2">
Pre-1.0.0 to-do list
</NiftyHeading>

- Baleada Logic
  - Document all Baleada Logic libraries
  - Pursue [other library ideas](https://trello.com/b/UIRmWCOQ/baleada-logic)
- Baleada Composition
  - Publish 0.0.0
  - Document installation, importing, and usage
  - React and Svelte support
- Baleada Icons
  - Svelte support


<NiftyHeading level="2">
Post-1.0.0 to-do list
</NiftyHeading>

- Build example to-do app using Baleada tools
- Build example blog/static site using Baleada tools


<NiftyHeading level="2">
Ideas for other tool categories
</NiftyHeading>

<NiftyTable>
| Name | Description |
| --- | --- |
| Baleada Style | Custom Tailwind config files, custom Tailwind plugins that register component classes and utility classes |
| Baleada Nifty | Components with a great user experience (WCAG compliant) and a great developer experience (can be used in `.md`, `.js`, `.vue`, `.jsx`, `.mdx`, and `.svelte` files, easy to style, easy to customize behavior). Will be _extremely_ nifty. |
| Baleada Scaffold | CLI tool for scaffolding out Nuxt, Next, and Sapper projects with other Baleada tools pre-installed |
| Baleada Baleadas | A gallery with photos of actual baleadas |
</NiftyTable>
</template>

<script>
export default {
  layout: 'article',
  head: () => ({
    title: 'Baleada - Roadmap',
  })
}
</script>
