<template>
  <nav class="docs-nav transition">
    <section
      v-for="(directory, index) in directories"
      :key="directory.name"
    >
      <component :is="`h${directory.level + 1}`">{{ directory.name.toUpperCase() }}</component>
      <transition
        name="docs-nav"
        v-for="page in directory.pages"
        :key="page.href"
      >
        <NuxtLink :to="page.href">
          {{ page.title }}
        </NuxtLink>
      </transition>
    </section>
  </nav>
</template>

<script>
import manifest from '~/static/json/manifest.json'

export default {
  name: 'DocsNav',
  setup() {
    const directories = manifest.filter(dir => dir.pages.length > 0)

    // TODO: filter based on metadata, with enter/leave transitions

    return {
      directories,
    }
  },
}
</script>

<style lang="postcss">
.docs-nav {
  * + section {
    @apply mt-7;
  }
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
