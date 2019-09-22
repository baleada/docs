<template lang="html">
  <nav>
    <section v-for="(directory, index) in directories" :key="directory.name">
      <component :is="`h${directory.level + 1}`">{{ directory.name.toUpperCase() }}</component>
      <transition
        v-for="page in directory.pages"
        :key="page.href"
      >
        <nuxt-link
          v-show="frameworks.includes(page.framework)"
          :to="page.href"
        >
          {{ page.title }}
        </nuxt-link>
      </transition>
    </section>
  </nav>
</template>

<script>
import manifest from '~/assets/json/manifest.json'

export default {
  setup() {
    // TODO: filter based on framwork, with enter/leave transitions
    const directories = manifest,
          frameworks = ['Vue', 'React', 'Svelte', 'agnostic']


    console.log(directories)
    return {
      directories,
      frameworks
    }
  },
}
</script>
