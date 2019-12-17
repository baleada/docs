<template>
  <section class="docs-table-of-contents">
    <h2 class="transition">ON THIS PAGE</h2>
    <NuxtLink
      v-for="(heading, index) in headings"
      :key="index"
      :class="`h${heading.level}`"
      :to="`#${heading.slug}`"
    >
      {{ heading.text }}
    </NuxtLink>
  </section>
</template>

<script>
export default {
  name: 'DocsTableOfContents',
  props: {
    headings: {
      type: Array,
      required: true
    }
  },
}
</script>

<style lang="postcss">
.docs-table-of-contents {
  @apply flex flex-col;

  h2::after {
    content: '';
    @apply w-9 mt-3 block rounded-full h-2px bg-gray-300;
  }
  h2 {
    @apply text-2 font-600 tracking-3 text-primary-700;
  }
  h3 {
    @apply mt-6 text-1 font-600 tracking-3 text-gray-700;
  }
  a {
    @apply block mt-3 pl-2 text-2 text-gray-900 no-underline;
    transition: all 0.1s ease;
  }
  a.nuxt-link-exact-active {
    @apply border-l-2 text-primary-700 border-primary-700 -ml-2px;
  }
  a:hover {
    @apply text-primary-600 border-primary-600 underline;
  }
  * + a {
    @apply mt-2;
  }
  .h1 {
    @apply ml-0 font-500;
  }
  .h2 {
    @apply ml-2;
  }
  .h3 {
    @apply ml-5;
  }
  .h4 {
    @apply ml-7;
  }
  .h5 {
    @apply ml-9;
  }
  .h6 {
    @apply ml-10;
  }

  .dark & {
    h2::after {
      @apply bg-primary-gray-900;
    }
    h2 {
      @apply text-primary-gray-500;
    }
    h3 {
      @apply text-primary-gray-500;
    }
    a {
      @apply text-primary-gray-400;
    }
    a.nuxt-link-exact-active {
      @apply text-gray-400 border-gray-400;
    }
    a:hover {
      @apply text-gray-300 border-gray-300;
    }
  }
}

</style>
