<template lang="md">
<UpdatedAt timestamp="Sun Sep 22 2019 00:14:07 GMT-0600 (CST)" />
# What is Baleada?

Honduras's favorite food is the **baleada**—a fresh flour tortilla, spread with refried beans, then decorated with scrambled eggs, mantequilla, queso seco, avocado, or meat, and finally folded in half.

You can't have a baleada without its core ingredients and presentation (tortilla spread with refried beans and folded in half), but once those requirements are met, you can be creative and combine ingredients that suit your tastebuds.

Anyway, the Baleada you're here for is **a toolkit for building web apps**. Baleada is decidedly not a framework, it's not a standalone library, and although libraries for UI logic makes up the majority of the Baleada codebase, Baleada offers plenty of other tools.

Getting down to brass tacks, Baleada offers the following types of tools:
- UI logic
- Composition functions (a.k.a. hooks)
- Icon components

<NiftyAside>
  <p>
    Feeling a little fuzzy on what these terms mean? Check out the guide on <NuxtLink to="/docs/types-of-tools">types of tools</NuxtLink> for definitions.
  </p>
</NiftyAside>

Think of these tools as the ingredients in a savory, delectable baleada. You're encouraged to take what you want and sprinkle it into the stack you're already using to build your apps and websites. You're free to take just a few things, but if you're so inclined, you can really pile on the extras.s


## Who is Baleada designed for?

Baleada is designed for developers who:
- **Do** want to add common UI features and behaviors to their app, but **don't** want to think about implementation details.
- **Do** value consistency and predictability in JavaScript library APIs.
- **Do** care about performance, best practices, internationalization, accessibility, and security, but **haven't** had time to fine-tune this stuff in the past, because they've always been too busy hacking together a custom autocomplete component or another 🤬 carousel for the who-knows-how-many-th time.
- **Do** appreciate the role React hooks and Vue composition functions play in making web dev easier and more inclusive.
- **Do** appreciate [the benefits of using SVG over icon fonts](http://www.fullstackradio.com/47).
- **Do** appreciate documentation that makes them hungry.
<!-- - **Do** want a design system to govern their styles, but **don't** want their apps and sites to look like everyone else's. -->

<!-- <NiftyAside>
  <p>
    Baleada 1.0.0 will be optimized for developers building with <a href="http://vuejs.org/">Vue.js</a>, styling with <a href="http://tailwindcss.com/">TailwindCSS</a>, and using <a href="https://www.netlify.com">Netlify</a> services like <a href="https://www.netlify.com/docs/identity/">Identity</a> and <a href="https://www.netlify.com/products/functions/">Functions</a>.
  </p>
  <p>
    Future versions aim to not just support other stacks, but design specifically for them, as well. Check out the <NuxtLink to="/docs/roadmap">roadmap</NuxtLink> for more info.
  </p>
</NiftyAside> -->
</template>

<script>
export default {
  head: () => ({
    title: 'Baleada - What is Baleada?',
  })
}
</script>
