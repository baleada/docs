<template>
  <span class="flex flex-col gap-2 text-3">
    <a
      v-if="source"
      class="btn btn-sm p-0 no-underline"
      :href="source"
      target="_blank"
    >
      <SimpleGitHub class="icon icon-btn duration-1" />
      <span class="duration-1">Source code</span>
    </a>
    <a
      v-if="tests"
      class="btn btn-sm p-0 no-underline"
      :href="tests"
      target="_blank"
    >
      <OcticonBeaker class="icon icon-btn duration-1" />
      <span class="duration-1">Tests</span>
    </a>
  </span>
</template>

<script lang="ts">
import { computed } from 'vue'
import SimpleGitHub from '@simple-icons/github.svg'
import OcticonBeaker from '@octicons/beaker-24.svg'
import { useStore } from '../composition'

export default {
  name: 'LayoutArticleLinks',
  components: {
    SimpleGitHub,
    OcticonBeaker,
  },
  setup () {
    const store = useStore(),
          tests = computed(() => store?.article.tests),
          source = computed(() => store?.article.source)

    return {
      source,
      tests,
    }
  }
}
</script>
