<template>
  <nav class="docs-nav">
    <section
      v-for="({ level, name, articles }, index) in directories"
      :key="index"
    >
      <component
        :is="`h${level + 1}`"
        class="uppercase"
      >
        {{ name }}
      </component>
      <transition
        v-for="{ href, title } in articles"
        :key="href"
        name="docs-nav"
      >
        <RouterLink :to="href">
          {{ title }}
        </RouterLink>
      </transition>
    </section>
  </nav>
</template>

<script lang="ts">
/// <reference types="../../types" />
import { manifest } from 'virtual:manifest'

export default {
  name: 'LayoutNav',
  setup () {
    // TODO: filter based on metadata, with enter/leave transitions

    return {
      directories: manifest,
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
    @apply w-9 mt-3 block rounded-full h-[2px] bg-gray-30;
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
  a.router-link-exact-active {
    @apply border-l-5 text-primary-70 border-primary-70 -ml-19;
  }
  a:hover {
    @apply text-primary-60 border-primary-60 underline;
  }

  .dark & {
    h2::after {
      @apply bg-primary-gray-90;
    }
    h2, h3 {
      @apply text-primary-gray-50;
    }
    a {
      @apply text-primary-gray-40;
    }
    a.router-link-exact-active {
      @apply text-gray-40 border-gray-40;
    }
    a:hover {
      @apply text-gray-30 border-gray-30;
    }
  }
}
</style>
