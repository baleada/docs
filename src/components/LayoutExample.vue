<template>
  <p>
    <a
      class="flex/2 center-all-y text-3"
      :href="`https://github.com/baleada/docs/blob/main/src/components/${component}.vue`"
      target="_blank"
    >
      <SimpleGitHub class="icon icon-btn duration-1" />
      <span class="duration-1">Example source code</span>
    </a>
  </p>
  <component :is="component" />
</template>

<script setup lang="tsx">
import SimpleGitHub from '@simple-icons/github.svg'
const props = defineProps<{ component: any }>()
console.log(props)
</script>
