<template>
  <span class="flex flex-col gap-2 text-3">
    <a
      v-if="source"
      class="mr-auto flex/2 center-all-y text-3"
      :href="source"
      target="_blank"
    >
      <SimpleGitHub class="icon icon-btn duration-1" />
      <span class="duration-1">Source code</span>
    </a>
    <a
      v-if="tests"
      class="mr-auto flex/2 center-all-y text-3"
      :href="tests"
      target="_blank"
    >
      <OcticonBeaker class="icon icon-btn duration-1" />
      <span class="duration-1">Tests</span>
    </a>
    <a
      v-if="stub"
      class="mr-auto flex/2 center-all-y text-3"
      :href="stub"
      target="_blank"
    >
      <OcticonFileCode class="icon icon-btn duration-1" />
      <span class="duration-1">Test stub</span>
    </a>
  </span>
</template>

<script lang="ts">
import { computed } from 'vue'
import SimpleGitHub from '@simple-icons/github.svg'
import OcticonBeaker from '@octicons/beaker-24.svg'
import OcticonFileCode from '@octicons/file-code-24.svg'
import { useStore } from '../composition'

export default {
  name: 'LayoutArticleLinks',
  components: {
    SimpleGitHub,
    OcticonBeaker,
    OcticonFileCode,
  },
  setup () {
    const store = useStore(),
          source = computed(() => store?.article.source),
          tests = computed(() => store?.article.tests),
          stub = computed(() => store?.article.stub)

    return {
      source,
      tests,
      stub,
    }
  }
}
</script>
