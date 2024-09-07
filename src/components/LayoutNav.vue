<template>
  <div>
    <div class="mt-6 three-column-nav">
      <h2 :ref="packagesLabel.ref()" class="uppercase">
        Filter by package
      </h2>
    </div>
    <ul
      :ref="packagesListbox.root.ref({ labelledBy: packagesLabel.id.value })"
      class="mt-4 flex-col max-h-20 overflow-y-scroll ring-sh-2-gray-30 dork:ring-primary-gray-100 rounded-3 scrollbar-hide select-none"
    >
      <li
        v-for="(tag, index) in packages"
        :ref="packagesListbox.options.ref(index)"
        class="
          flex/2 center-all-y px-2 py-1.5 
          text-3
          focus:outline-none
          text-gray-90 dork:text-gray-40
          hover:bg-gray-20 focus:bg-gray-20 dork:hover:bg-primary-gray-100 dork:focus:bg-primary-gray-100
        "
      >
        <OcticonsCheck16
          aria-hidden="true"
          class="text-primary-70 transition duration-1"
          :class="[
            packagesListbox.is.selected(index)
              ? 'opacity-1 scale-100'
              : 'opacity-0 scale-[92%]',
          ]"
        />
        <span>{{ tag }}</span>
      </li>
    </ul>
    <nav class="mt-6 three-column-nav">
      <section
        v-for="({ level, name, articles }, index) in directories"
        :ref="(el: Element) => articlesEl = el"
        :key="name"
      >
        <component
          :is="`h${level + 1}`"
          class="uppercase"
        >
          {{ name }}
        </component>
        <RouterLink v-for="{ href, title } in articles" :key="title" :to="href">
          {{ title.startsWith('What is') ? 'Getting started' : title }}
        </RouterLink>
      </section>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { manifest } from 'virtual:manifest'
import { useRoute } from 'vue-router'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { useElementApi, useListbox } from '@baleada/vue-features'
import OcticonsCheck16 from '@octicons/check-16.svg'

const directories = computed(() => (
  manifest
    .filter(({ pkg }) => (
      selectedPackages.value.some(p => p.toLowerCase() === pkg))
    )
))

const [articlesEl] = useAutoAnimate()

const route = useRoute(),
      pkg = route.fullPath
        .match(/\/docs\/(\w+)(?:\/.*)?/)
        ?.at(1)
        .replace('-', ' ')

const packages = [
        'Overview',
        'Ancestor variants',
        'Composition',
        'Edge',
        'Features',
        'Linear numeric',
        'Logic',
        'Prose',
        'Source transform',
        'SPA links',
        'Utilities',
      ],
      selectedPackages = computed(() => packages.filter((_, index) => packagesListbox.is.selected(index))),
      packagesListbox = useListbox({
        multiselectable: true,
        initialSelected: pkg
          ? (() => {
            const index = packages.findIndex(p => p.toLowerCase() === pkg.toLowerCase())

            return index > -1 ? index : 0
          })()
          : 0,
      }),
      packagesLabel = useElementApi({ identifies: true })
</script>
