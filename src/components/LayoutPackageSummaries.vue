<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <RouterLink
      v-for="{ title, summary, href } in featured"
      :key="title"
      :to="href"
      class="
        flex-col/8 p-5 
        rounded-t-6
        bg-primary-5 dork:bg-primary-gray-110
        hover:bg-primary-10 dork:hover:bg-primary-gray-100
        border-b-6 border-b-primary-20 dork:border-b-primary-gray-90
        no-underline transition-all
      "
    >
      <span class="flex-col/4">
        <span role="heading" aria-level="2" class="text-6 md:text-7 font-5 text-primary-100 dork:text-primary-gray-10">
          {{ toPackageName(title) }}
        </span>
        <span class="text-5 text-primary-90 dork:text-primary-gray-30">
          {{ summary }}
        </span>
      </span>
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import { manifest } from 'virtual:manifest'
import { createClip } from '@baleada/logic'
import { pipe } from 'lazy-collections'

const featured = manifest
  .flatMap(({ articles }) => articles)
  .filter(({ summary }) => summary)

const toPackageName = pipe(
  createClip(/What is Baleada/),
  createClip(/\?/),
)
</script>
