<template lang="html">
  <footer class="px-3 py-8 bg-primary-1000 text-primary-gray-500 text-2">
    <div class="flex flex-col">
      <!-- Spacer -->
      <div class="md:hidden mt-7 mx-auto w-11 h-px rounded-full bg-primary-gray-600"></div>
      <div class="mt-4 md:mt-0 flex flex-col md:flex-row">
        <nav class="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-600 md:pr-5">
          <NuxtLink
            v-for="(page, index) in pages"
            :key="page.href"
            :to="page.href"
            class="hover:text-primary-gray-200"
            :class="[index > 0 ? 'mt-1 ' : '']"
          >
            {{ page.name }}
          </NuxtLink>
        </nav>
        <!-- Spacer -->
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-primary-gray-600"></div>
        <div class="mt-4 md:mt-0 flex-1 flex items-center justify-center md:border-r border-gray-600">
          <a
            class="hover:text-primary-gray-200"
            href="https://gitlab.com/baleada"
          >
            <span class="hidden">View on GitLab</span>
            <SimpleGitLab :class="'icon h-7 w-7'" />
          </a>
          <a
            class="ml-4 hover:text-primary-gray-200"
            href="https://twitter.com/baleadajs"
          >
            <span class="hidden">View Twitter profile</span>
            <SimpleTwitter :class="'icon h-7 w-7'" />
          </a>
        </div>
        <!-- Spacer -->
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-primary-gray-600"></div>
        <div class="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
          <span class="">&copy; {{ new Date().getFullYear() }} Alex Vipond</span>
          <span class="mt-7 md:mt-1">
            Created by <a class="underline hover:text-primary-gray-200" href="https://alexvipond.dev">Alex Vipond</a> 🌱
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { SimpleGitLab } from '@baleada/icons/vue'
import { SimpleTwitter } from '@baleada/icons/vue'

export default {
  components: {
    SimpleGitLab,
    SimpleTwitter,
  },
  setup() {
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
