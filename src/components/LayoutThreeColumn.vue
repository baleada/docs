<template>
  <main
    class="
      layout-three-column
      relative z-10
      d-screen lg:flex overflow-x-hidden
      not-dork:not-minimalist:bg-gray-10
      dork:not-minimalist:bg-primary-gray-130
      dork:minimalist:bg-primary-gray-120
      not-dork:minimalist:bg-white"
  >
    <!-- Left -->
    <section
      ref="nav"
      class="
        relative h-screen w-screen lg:w-24 flex-none
        px-7 py-3 overflow-y-scroll scrolling-touch scrollbar-hide
        lg:translate-x-0
      "
      :class="[
        openStatus === 'nav' ? 'translate-x-0' : '-translate-x-full',
        tableOfContentsTransitionStatus === 'after-leave'
          ? 'lg:absolute lg:z-30 lg:h-auto'
          : ''
      ]"
    >
      <header
        class="
          flex center-all-y pb-3 border-b-5
          border-gray-30 dork:border-primary-gray-100 minimalist:border-transparent dork:minimalist:border-transparent
        "
      >
        <RouterLink
          to="/"
          aria-label="Link to home page"
          class="
            d-13 p-2
            flex-none rounded-full overflow-hidden -shadow transition btn-grows
            bg-primary-60 dork:bg-primary-gray-90
          "
        >
          <BrandLogo
            id="nav-header"
            :tortillaClasses="store.dorkTheme.status === 'enabled' ? 'text-primary-gray-50' : undefined"
            :burnClasses="store.dorkTheme.status === 'enabled' ? 'text-primary-gray-100' : undefined"
          />
        </RouterLink>
      </header>
      <button
        class="
          lg:hidden
          absolute corner-t-r mt-3 mr-6 d-7
          cursor-pointer transition btn-grows
          dork:text-gray-60 dork:hover:text-gray-40
          not-dork:text-gray-90 not-dork:hover:text-primary-60
        "
        aria-label="Close menu"
        @click="openArticle"
      >
        <OcticonsX24 class="icon" />
      </button>
      <!-- Dark theme toggle -->
      <div class="mt-5 w-full'">
        <div class="flex center-all-y">
          <button
            class="
              flex center-all-y text-2 rounded-full font-6 tracking-3
              text-gray-60 dork:text-gray-40
            "
            aria-label="Disable dark theme"
            @click="() => store.dorkTheme.disable()"
          >
            <OcticonsSun24 class="icon d-5 transition" />
          </button>
          <div
            class="
              relative mx-2 inline-flex d-9/6 -shadow rounded-full cursor-pointer
              bg-gray-30 dork:bg-primary-100
            "
            @click="() => store.dorkTheme.toggle()"
          >
            <button
              aria-label="Toggle dark theme"
              class="
                absolute rounded-full d-6 shadow focus:shadow-outline
                left-0 bg-white dork:left-full dork:-translate-x-full dork:bg-primary-gray-70
                transition-all duration-3
              "
            />
          </div>
          <button
            class="
              flex center-all-y text-2 rounded-full font-6 tracking-3
              text-gray-60 dork:text-gray-40
            "
            aria-label="Enable dark theme"
            @click="() => store.dorkTheme.enable()"
          >
            <OcticonsMoon24 class="icon d-5 transition" />
          </button>
        </div>
        <span
          class="block mt-2 text-2 text-gray-60 dork:text-gray-40"
        >
          <code class="py-px px-1">SHIFT</code> + <code class="py-px px-1">D</code>
        </span>
      </div>
      <!-- Minimalist theme toggle -->
      <div class="hidden lg:block mt-5 w-full">
        <div class="flex center-all-y">
          <button
            class="
              flex center-all-y text-3 rounded-full font-6 tracking-3
              text-gray-60 dork:text-gray-40
            "
            aria-label="Disable minimalist theme"
            @click="() => store.minimalistTheme.disable()"
          >
            <OcticonsColumns24 class="icon transition d-5" />
          </button>
          <div
            class="
              relative mx-2 inline-flex d-9/6 -shadow rounded-full cursor-pointer
              bg-gray-30 minimalist:bg-primary-20 dork:bg-primary-gray-110 dork:minimalist:bg-primary-100
            "
            @click="() => store.minimalistTheme.toggle()"
          >
            <button
              aria-label="Toggle minimalist theme"
              class="
                absolute rounded-full d-6 shadow focus:shadow-outline
                left-0 bg-white minimalist:left-full minimalist:-translate-x-full dork:bg-primary-gray-70
                transition-all duration-3
              "
            />
          </div>
          <button
            class="
              flex center-all-y text-2 rounded-full font-6 tracking-3
              text-gray-60 dork:text-gray-40
            "
            aria-label="Enable minimalist theme"
            @click="() => store.minimalistTheme.enable()"
          >
            <IconBox24 class="icon transition d-5" />
          </button>
        </div>
        <span
          class="block mt-2 text-2 text-gray-60 dork:text-gray-40"
        >
          <code class="py-px px-1">SHIFT</code> + <code class="py-px px-1">M</code>
        </span>
      </div>
      <Transition name="fade">
        <LayoutNav
          v-if="store.minimalistTheme.status === 'disabled'"
          class="mt-5 pb-7"
          @click="handleSidebarClick"
        />
      </Transition>
    </section>
    <!-- Middle -->
    <section
      ref="article"
      class="
        h-screen w-screen lg:w-full
        absolute lg:relative corner-t-l z-20 lg:translate-x-0
        overflow-x-hidden overflow-y-scroll scrolling-touch scrollbar-hide
        bg-white dork:bg-primary-gray-120
        not-minimalist:shadow-3 not-minimalist:rounded-2
      "
      :class="[
        (() => {
          if (openStatus === 'nav') return 'translate-x-full'
          if (openStatus === 'tableOfContents') return '-translate-x-full'
          return ''
        })(),
        `table-of-contents-${tableOfContentsTransitionStatus}`,
      ]"
    >
      <header class="flex center-all-y z-40 absolute corner-t-l pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          aria-label="Show navigation"
          class="
            lg:hidden d-7 p-0 rounded-full transition btn-grows"
          :class="[
            store.dorkTheme.status === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-70 hover:text-primary-60'
          ]"
          @click="openNav"
        >
          <OcticonsThreeBars16 class="icon" />
        </button>
        <!-- <LayoutSearch class="ml-2 lg:ml-0 stretch-w-6" /> -->
        <button
          type="button"
          aria-label="Show table of contents"
          class="ml-auto lg:hidden d-7 p-0 rounded-full transition btn-grows"
          :class="[
            store.dorkTheme.status === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-70 hover:text-primary-60'
          ]"
          @click="openTableOfContents"
        >
          <OcticonsThreeBars16 class="icon" />
        </button>
      </header>
      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          key="content"
          class="relative mt-7"
        />
      </RouterView>
    </section>
    <!-- Right -->
    <Transition
      name="fade"
      @before-enter="onTableOfContentsBeforeEnter"
      @after-leave="onTableOfContentsAfterLeave"
    >
      <section
        v-show="store.minimalistTheme.status === 'disabled'"
        ref="tableOfContents"
        class="
          absolute lg:relative corner-t-l d-screen lg:w-24 flex-none
          px-7 py-3 overflow-y-scroll scrolling-touch scrollbar-hide
          lg:translate-x-0
        "
        :class="[
          openStatus === 'tableOfContents' ? 'translate-x-0' : 'translate-x-full',
        ]"
      >
        <!-- store.minimalistTheme.status === 'enabled' ? 'opacity-0 pointer-events-none translate-x-full' : 'lg:translate-x-0', -->
        <button
          class="lg:hidden absolute corner-t-r mt-3 mr-6 d-7 cursor-pointer transition btn-grows"
          :class="[
            store.dorkTheme.status === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-90 hover:text-primary-60'
          ]"
          aria-label="close-menu"
          @click="openArticle"
        >
          <OcticonsX24 class="icon" />
        </button>
        <!-- <LayoutAd class="mt-auto" /> -->
        <LayoutTableOfContents @click="handleSidebarClick" />
      </section>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEffects } from '@baleada/vue-prose'
import { createTouchrelease as createSwipe } from '@baleada/logic'
import type {
  TouchreleaseType as SwipeType,
  TouchreleaseMetadata as SwipeMetadata,
} from '@baleada/logic'
import { useListenable } from '@baleada/vue-composition'
import { useHead } from '@baleada/vue-features'
import OcticonsThreeBars16 from '@octicons/three-bars-16.svg'
import OcticonsX24 from '@octicons/x-24.svg'
import OcticonsSun24 from '@octicons/sun-24.svg'
import OcticonsMoon24 from '@octicons/moon-24.svg'
import OcticonsColumns24 from '@octicons/columns-24.svg'
import IconBox24 from '../icons/box-24.svg'
import { useStore } from '../composition'
import LayoutNav from './LayoutNav.vue'
import LayoutTableOfContents from './LayoutTableOfContents.vue'


// Gonna need it
const store = useStore()


/* Manage open status */
const openStatus = ref('article'),
      openNav = () => (openStatus.value = 'nav'),
      openArticle = () => (openStatus.value = 'article'),
      openTableOfContents = () => (openStatus.value = 'tableOfContents'),
      handleSidebarClick = ({ target }) => {
        if (target.matches('a')) {
          openArticle()
        }
      },

      /* Touch gestures */
      nav = ref(null),
      article = ref(null),
      tableOfContents = ref(null),
      articleSwipe = useListenable<SwipeType, SwipeMetadata>('recognizeable' as SwipeType, {
        recognizeable: { effects: createSwipe({ minDistance: 20 }) }
      }),
      navSwipe = useListenable<SwipeType, SwipeMetadata>('recognizeable' as SwipeType, {
        recognizeable: { effects: createSwipe({ minDistance: 20 }) }
      }),
      tableOfContentsSwipe = useListenable<SwipeType, SwipeMetadata>('recognizeable' as SwipeType, {
        recognizeable: { effects: createSwipe({ minDistance: 20 }) }
      }),
      except = [
        '.baleada-prose-article .overflow-y-scroll',
        '.baleada-prose-article .overflow-y-scroll *',

        '.baleada-prose-article .overflow-x-scroll',
        '.baleada-prose-article .overflow-x-scroll *',

        '.baleada-prose-codeblock',
        '.baleada-prose-codeblock *',

        '.baleada-prose-table',
        '.baleada-prose-table *',

        '.swiper-no-swiping',
      ]

onMounted(() => {
  articleSwipe.listen(
    () => {
      const direction = articleSwipe.recognizeable.metadata.direction.fromStart
      if (direction === 'right') {
        openNav()
      } else if (direction === 'left') {
        openTableOfContents()
      }
    },
    { target: article.value, except, addEventListener: { passive: true } }
  )

  navSwipe.listen(
    () => {
      const direction = navSwipe.recognizeable.metadata.direction.fromStart
      if (direction === 'left') {
        openArticle()
      }
    },
    { target: nav.value, addEventListener: { passive: true } }
  )

  tableOfContentsSwipe.listen(
    () => {
      const direction = tableOfContentsSwipe.recognizeable.metadata.direction.fromStart
      if (direction === 'right') {
        openArticle()
      }
    },
    { target: tableOfContents.value, addEventListener: { passive: true } }
  )
})

/* Transition hooks for table of contents */
const tableOfContentsTransitionStatus = ref('after-enter'),
      onTableOfContentsAfterLeave = () => (tableOfContentsTransitionStatus.value = 'after-leave'),
      onTableOfContentsBeforeEnter = () => (tableOfContentsTransitionStatus.value = 'before-enter')

onMounted(() => {
  if (store.minimalistTheme.status === 'enabled') {
    tableOfContentsTransitionStatus.value = 'after-leave'
  }
})


// Prose effects
useEffects({ scrollableContainer: article })

      
// Set up reactive SEO
const route = useRoute(),
      siteName = 'Baleada'

useHead({
  title: computed(() => store.article.frontMatter?.title ?? siteName),
  metas: [
    // Essential META Tags
    { 
      property: 'og:title',
      content: computed(() => store.article.frontMatter?.title ?? siteName)
    },
    { 
      property: 'og:description',
      content: computed(() => store.article.frontMatter?.summary ?? '')
    },
    { 
      property: 'og:image',
      content: computed(() => store.article.frontMatter?.image ?? '')
    },
    { 
      property: 'og:url',
      content: computed(() => `${window.origin}${route.fullPath}`),
    },
    { 
      name: 'twitter:card',
      content: computed(() => store.article.frontMatter?.image ?? ''),
    },

    // Non-Essential, But Recommended
    { 
      property: 'og:site_name',
      content: siteName
    },
    {
      name: 'twitter:image:alt',
      content: computed(() => store.article.frontMatter?.imageAlt ?? '')
    },

    // Non-Essential, But Required for Analytics
    {
      name: 'twitter:site',
      content: '@BaleadaToolkit'
    },
  ]
})
</script>

<style lang="postcss">
@media screen and (min-width: theme('screens.lg')) {
  .baleada-prose-article {
    @apply transition-none;

    .table-of-contents-after-leave & {
      @apply mx-auto;
      width: calc(100% - 14rem * 2);
    }

    .table-of-contents-before-enter & {
      @apply w-auto px-11;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .0s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
