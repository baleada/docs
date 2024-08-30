<template>
  <p class="flex">
    <a
      class="mr-auto flex/2 center-all-y text-3"
      :href="`https://github.com/baleada/docs/blob/main/src/components/${component}.vue`"
      target="_blank"
    >
      <SimpleGitHub class="icon icon-btn duration-1" />
      <span class="duration-1">Example source code</span>
    </a>
  </p>
  <div class="with-mt">
    <component :is="component" />
  </div>
</template>

<script setup lang="tsx">
import SimpleGitHub from '@simple-icons/github.svg'
defineProps<{ component: any }>()
</script>
