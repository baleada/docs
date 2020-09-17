<template lang="html">
  <footer class="px-3 py-8 bg-primary-100 text-primary-gray-50 text-2">
    <div class="flex flex-col">
      <!-- Spacer -->
      <div class="md:hidden mt-7 mx-auto w-11 h-px rounded-full bg-primary-gray-60" />
      <div class="mt-4 md:mt-0 flex flex-col md:flex-row">
        <nav class="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-60 md:pr-5">
          <RouterLink
            v-for="(page, index) in pages"
            :key="page.href"
            :to="page.href"
            class="hover:text-primary-gray-20"
            :class="[index > 0 ? 'mt-1 ' : '']"
          >
            {{ page.name }}
          </RouterLink>
        </nav>
        <!-- Spacer -->
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-primary-gray-60" />
        <div class="mt-4 md:mt-0 flex-1 flex items-center justify-center md:border-r border-gray-60">
          <a
            class="hover:text-primary-gray-20"
            href="https://github.com/baleada"
          >
            <span class="sr-only">View on GitHub</span>
            <SimpleGitHub :class="'icon h-7 w-7'" />
          </a>
          <a
            class="ml-4 hover:text-primary-gray-20"
            href="https://twitter.com/BaleadaToolkit"
          >
            <span class="sr-only">View Twitter profile</span>
            <SimpleTwitter :class="'icon h-7 w-7'" />
          </a>
        </div>
        <!-- Spacer -->
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-primary-gray-60" />
        <div class="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
          <span class="">&copy; {{ new Date().getFullYear() }} Alex Vipond</span>
          <span class="mt-7 md:mt-1">
            Created by <a class="underline hover:text-primary-gray-20" href="https://alexvipond.dev">Alex Vipond</a> 🌱
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { SimpleGitHub, SimpleTwitter } from '@baleada/vue-simple-icons'

export default {
  components: {
    SimpleGitHub,
    SimpleTwitter,
  },
  setup () {
    const pages = [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Docs',
        href: '/docs',
      },
    ]

    return {
      pages
    }
  },
}
</script>
