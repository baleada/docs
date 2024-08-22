<template>
  <footer class="px-3 py-8 bg-gray-100 text-gray-40 text-4">
    <div class="flex-col">
      <!-- Spacer -->
      <div class="md:hidden mt-7 mx-auto w-11 h-px rounded-full bg-gray-60"></div>
      <div class="mt-4 md:mt-0 flex-col md:flex-row">
        <!-- Spacer -->
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-gray-60"></div>
        <div class="mt-4 md:mt-0 flex-1 flex/4 center-all  md:border-r border-gray-60">
          <a
            class="hover:text-gray-10"
            href="https://github.com/baleada"
          >
            <span class="sr-only">View on GitHub</span>
            <svg
              role="img"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              class="d-7 fill-current"
            >
              <title>GitHub icon</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            class="hover:text-gray-10"
            href="https://twitter.com/BaleadaToolkit"
          >
            <span class="sr-only">View Twitter profile</span>
            <svg
              role="img"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              class="d-7 fill-current"
            >
              <title>Twitter icon</title>
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
            </svg>
          </a>
        </div>
        <!-- Spacer -->
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-gray-60"></div>
        <div class="mt-7 md:mt-0 flex-1 flex-col/7 center-all  md:pl-5">
          <span class="md:mt-1">
            Site by <a class="underline hover:text-gray-10" href="https://alexvipond.dev">Alex Vipond</a> 🌱
          </span>
        </div>
        <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full bg-gray-60"></div>
        <div class="mt-7 md:mt-0 mx-auto flex-1 flex center-all-x">
          <div class="flex-col/2">
            <template v-for="{ name, href } in nav" :key="name">
              <RouterLink
                v-if="href.startsWith('/')"
                :to="href"
                class="underline hover:text-gray-10 transition"
              :class="{ 'text-gray-30': route.fullPath === href }"
              >
                {{ name }}
              </RouterLink>
              <a
                v-else
                :href="href"
                class="underline hover:text-gray-10 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ name }}
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'

const nav = [
  { name: '/docs', href: '/docs' },
]

const route = useRoute()
</script>
