<template>
  <section class="docs-table-of-contents">
    <h2 class="transition">ON THIS PAGE</h2>
    <RouterLink
      v-for="({ level, slug, text }, index) in headings"
      :key="index"
      :class="`h${level}`"
      :to="`#${slug}`"
    >
      {{ text }}
    </RouterLink>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useContext } from '@baleada/vue-prose'

export default {
  name: 'LayoutTableOfContents',
  setup () {
    const headings = computed(() => useContext().article.headings)

    return { headings }
  }
}
</script>

<style lang="postcss">
.docs-table-of-contents {
  @apply flex flex-col;

  h2::after {
    content: '';
    @apply w-9 mt-3 block rounded-full h-px-2 bg-gray-30;
  }
  h2 {
    @apply text-3 font-6 tracking-3 text-primary-70;
  }
  h3 {
    @apply mt-6 text-2 font-6 tracking-3 text-gray-70;
  }
  a {
    @apply block mt-3 pl-2 text-3 text-gray-90 no-underline;
    transition: all 0.1s ease;
  }
  a.nuxt-link-exact-active {
    @apply border-l-5 text-primary-70 border-primary-70 -ml-px-2;
  }
  a:hover {
    @apply text-primary-60 border-primary-60 underline;
  }
  * + a {
    @apply mt-2;
  }
  .h1 {
    @apply ml-0 font-5;
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
      @apply bg-primary-gray-90;
    }
    h2 {
      @apply text-primary-gray-50;
    }
    h3 {
      @apply text-primary-gray-50;
    }
    a {
      @apply text-primary-gray-40;
    }
    a.nuxt-link-exact-active {
      @apply text-gray-40 border-gray-40;
    }
    a:hover {
      @apply text-gray-30 border-gray-30;
    }
  }
}

</style>
