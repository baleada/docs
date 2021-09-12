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
