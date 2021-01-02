<template>
  <main
    class="relative z-10 lg:flex w-full overflow-x-hidden"
    :class="[
      darkThemeStatus === 'enabled' ? 'dark' : '',
      minimalistThemeStatus === 'enabled' ? 'minimalist' : '',
      darkThemeStatus === 'disabled' && minimalistThemeStatus === 'disabled'
        ? 'bg-gray-10'
        : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
          ? 'bg-primary-gray-100'
          : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
            ? 'bg-primary-gray-95'
            : darkThemeStatus === 'disabled' && minimalistThemeStatus === 'enabled'
              ? 'bg-white'
              : ''
    ]"
  >
    <!-- Left -->
    <section
      ref="nav"
      class="relative h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch lg:translate-x-0 transform"
      :class="[
        openStatus === 'nav' ? 'translate-x-0' : '-translate-x-full',
        tableOfContentsTransitionStatus === 'after-leave'
          ? 'lg:absolute lg:z-30 lg:h-auto'
          : ''
      ]"
    >
      <header
        class="flex items-center pb-3 border-b-2"
        :class="[
          darkThemeStatus === 'disabled' && minimalistThemeStatus === 'disabled'
            ? 'border-gray-30'
            : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
              ? 'border-primary-gray-95'
              : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
                ? 'border-primary-gray-95'
                : darkThemeStatus === 'disabled' && minimalistThemeStatus === 'enabled'
                  ? 'border-white'
                  : ''
        ]"
      >
        <RouterLink
          to="/"
          aria-label="Link to home page"
          class="flex-none rounded-full h-10 w-10 p-2 -shadow transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'bg-primary-gray-90' : 'bg-primary-60',
          ]"
        >
          <BrandLogo
            id="nav-header"
            :tortillaClasses="darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : undefined"
            :burnClasses="darkThemeStatus === 'enabled' ? 'text-primary-gray-100' : undefined"
          />
        </RouterLink>
      </header>

      <button
        class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
        :class="[
          darkThemeStatus === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-90 hover:text-primary-60'
        ]"
        aria-label="Close menu"
        @click="openArticle"
      >
        <HeroiconsX class="icon" />
      </button>

      <!-- TODO: use toggle component -->
      <!-- Dark theme toggle -->
      <div class="mt-3 py-3 w-full'">
        <div class="flex items-center">
          <button
            class="flex items-center text-2 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : 'text-gray-60'
            ]"
            aria-label="Disable dark theme"
            @click="() => disableDarkTheme()"
          >
            <HeroiconsSun class="icon h-5 w-5 transition" />
          </button>
          <div
            class="relative mx-2 inline-flex h-6 w-9 -shadow rounded-full cursor-pointer"
            :class="[
              darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
                ? 'bg-primary-gray-90'
                : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
                  ? 'bg-primary-gray-100'
                  : 'bg-gray-30'
            ]"
            @click="() => toggleDarkTheme()"
          >
            <button
              aria-label="Toggle dark theme"
              class="absolute rounded-full h-6 w-6 shadow transition-all focus:shadow-outline"
              :style="darkThemeStatus === 'enabled' ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                darkThemeStatus === 'enabled' ? 'left-full bg-primary-gray-70' : 'left-0 bg-white',
              ]"
            />
          </div>
          <button
            class="flex items-center text-2 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : 'text-gray-60'
            ]"
            aria-label="Enable dark theme"
            @click="() => enableDarkTheme()"
          >
            <HeroiconsMoon class="icon h-5 w-5 transition" />
          </button>
        </div>

        <span
          class="block mt-3 text-2"
          :class="[darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : 'text-gray-60']"
        >
          <code class="py-px px-1 font-40">SHIFT</code> + <code class="py-px px-1 font-40">D</code>
        </span>
      </div>

      <!-- Minimalist theme toggle -->
      <div class="hidden lg:block mt-3 py-3 w-full">
        <div class="flex items-center">
          <button
            class="flex items-center text-3 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : 'text-gray-60'
            ]"
            aria-label="Disable minimalist theme"
            @click="() => disableMinimalistTheme()"
          >
            <HeroiconsTemplate class="icon transition h-5 w-5" />
          </button>
          <div
            class="relative mx-2 inline-flex h-6 w-9 -shadow rounded-full cursor-pointer"
            :class="[
              darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
                ? 'bg-primary-gray-90'
                : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
                  ? 'bg-primary-gray-100'
                  : darkThemeStatus === 'disabled' && minimalistThemeStatus === 'enabled'
                    ? 'bg-primary-30'
                    : 'bg-gray-30'
            ]"
            @click="() => toggleMinimalistTheme()"
          >
            <button
              aria-label="Toggle minimalist theme"
              class="absolute rounded-full h-6 w-6 shadow transition-all focus:shadow-outline"
              :style="minimalistThemeStatus === 'enabled' ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                darkThemeStatus === 'enabled' ? 'bg-primary-gray-70' : 'bg-white',
                minimalistThemeStatus === 'enabled' ? 'left-full' : 'left-0',
              ]"
            />
          </div>
          <button
            class="flex items-center text-2 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : 'text-gray-60'
            ]"
            aria-label="Enable minimalist theme"
            @click="() => enableMinimalistTheme()"
          >
            <OcticonsSquare24 class="icon transition h-5 w-5" />
          </button>
        </div>

        <span
          class="block mt-3 text-2"
          :class="[darkThemeStatus === 'enabled' ? 'text-primary-gray-50' : 'text-gray-60']"
        >
          <code class="py-px px-1 font-40">SHIFT</code> + <code class="py-px px-1 font-40">M</code>
        </span>
      </div>

      <transition name="fade">
        <LayoutNav
          v-show="minimalistThemeStatus === 'disabled'"
          class="mt-5 pb-7"
          @click="handleSidebarClick"
        />
      </transition>
    </section>

    <!-- Middle -->
    <section
      ref="article"
      class="absolute lg:relative top-0 left-0 z-20 h-screen w-screen lg:w-full overflow-x-hidden overflow-y-scroll scrolling-touch lg:translate-x-0 transform"
      :class="[
        openStatus === 'nav'
          ? 'translate-x-full'
          : openStatus === 'tableOfContents'
            ? '-translate-x-full'
            : '',
        darkThemeStatus === 'enabled' ? 'bg-primary-gray-95' : 'bg-white',
        minimalistThemeStatus === 'enabled' ? '' : 'shadow-3 lg:rounded-2',
        `table-of-contents-${tableOfContentsTransitionStatus}`,
      ]"
    >
      <transition name="fade">
        <div v-show="minimalistThemeStatus === 'disabled'">
          <BrandLogo
            id="article-decoration"
            class="absolute h-auto w-full sm:w-3/4 max-w-screen-sm top-0 right-0"
            :style="{ transform: 'translate(14%, -42%)' }"
            type="outline"
            :classes="[
              darkThemeStatus === 'disabled' ? 'text-primary-10' : 'text-primary-gray-80 opacity-80',
            ]"
          />
        </div>
      </transition>
      <header class="flex items-center z-40 absolute left-0 top-0 pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          aria-label="Show navigation"
          class="lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-70 hover:text-primary-60'
          ]"
          @click="openNav"
        >
          <HeroiconsMenuAlt2 class="icon" />
        </button>

        <!-- <LayoutSearch class="ml-2 lg:ml-0 w-full max-w-6" /> -->

        <button
          type="button"
          aria-label="Show table of contents"
          class="ml-auto lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-70 hover:text-primary-60'
          ]"
          @click="openTableOfContents"
        >
          <HeroiconsMenuAlt3 class="icon" />
        </button>
      </header>

      <RouterView
        key="content"
        class="relative mt-7"
      />
    </section>

    <!-- Right -->
    <transition
      name="fade"
      @before-enter="onTableOfContentsBeforeEnter"
      @after-leave="onTableOfContentsAfterLeave"
    >
      <section
        v-show="minimalistThemeStatus === 'disabled'"
        ref="tableOfContents"
        class="absolute lg:relative top-0 left-0 h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch lg:translate-x-0 transform"
        :class="[
          openStatus === 'tableOfContents' ? 'translate-x-0' : 'translate-x-full',
        ]"
      >
        <!-- minimalistThemeStatus === 'enabled' ? 'opacity-0 pointer-events-none translate-x-full' : 'lg:translate-x-0', -->
        <button
          class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'text-gray-60 hover:text-gray-40' : 'text-gray-90 hover:text-primary-60'
          ]"
          aria-label="close-menu"
          @click="openArticle"
        >
          <HeroiconsX class="icon" />
        </button>
        <!-- <LayoutAd class="mt-auto" /> -->
        <LayoutTableOfContents @click="handleSidebarClick" />
      </section>
    </transition>
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { swipe } from '@baleada/recognizeable-handlers'
import { useListenable, useStoreable } from '@baleada/vue-composition'
import { useHead } from '@baleada/vue-features'
import {
  HeroiconsMenuAlt2,
  HeroiconsX,
  HeroiconsMenuAlt3,
  HeroiconsSun,
  HeroiconsMoon,
  HeroiconsTemplate,
} from '@baleada/vue-heroicons'
import { OcticonsSquare24 } from '@baleada/vue-octicons'

import { createProseContext, useContext } from '../functions'

export default {
  name: 'LayoutThreeColumn',
  components: {
    HeroiconsMenuAlt2,
    HeroiconsX,
    HeroiconsMenuAlt3,
    HeroiconsSun,
    HeroiconsMoon,
    HeroiconsTemplate,
    OcticonsSquare24,
  },
  setup () {
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
          articleSwipe = useListenable('recognizeable', {
            recognizeable: { handlers: swipe() }
          }),
          navSwipe = useListenable('recognizeable', {
            recognizeable: { handlers: swipe() }
          }),
          tableOfContentsSwipe = useListenable('recognizeable', {
            recognizeable: { handlers: swipe() }
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
      articleSwipe.value.listen(
        () => {
          const direction = articleSwipe.value.recognizeable.metadata.direction.fromStart
          if (direction === 'right') {
            openNav()
          } else if (direction === 'left') {
            openTableOfContents()
          }
        },
        { target: article.value, except, addEventListener: { passive: true } }
      )

      navSwipe.value.listen(
        () => {
          const direction = navSwipe.value.recognizeable.metadata.direction.fromStart
          if (direction === 'left') {
            openArticle()
          }
        },
        { target: nav.value, addEventListener: { passive: true } }
      )

      tableOfContentsSwipe.value.listen(
        () => {
          const direction = tableOfContentsSwipe.value.recognizeable.metadata.direction.fromStart
          if (direction === 'right') {
            openArticle()
          }
        },
        { target: tableOfContents.value, addEventListener: { passive: true } }
      )
    })

    /* Dark theme */
    const storeableDarkThemeStatus = useStoreable('baleada_dark_theme_status'),
          darkThemeStatus = ref(storeableDarkThemeStatus.value.string),
          enableDarkTheme = () => {
            storeableDarkThemeStatus.value.store('enabled')
            darkThemeStatus.value = storeableDarkThemeStatus.value.string
          },
          disableDarkTheme = () => {
            storeableDarkThemeStatus.value.store('disabled')
            darkThemeStatus.value = storeableDarkThemeStatus.value.string
          },
          toggleDarkTheme = () => {
            switch (darkThemeStatus.value) {
            case null:
              // do nothing
              break
            case 'enabled':
              disableDarkTheme()
              break
            case 'disabled':
              enableDarkTheme()
              break
            }
          },
          darkThemeShortcut = useListenable('shift+d')

    onMounted(() => {
      switch (storeableDarkThemeStatus.value.status) {
      case 'ready':
        disableDarkTheme() // Disable by default
        break
      case 'stored':
      case 'removed':
        // do nothing
        break
      }
      darkThemeShortcut.value.listen(() => toggleDarkTheme())
    })

    /* Minimalist theme */
    const storeableMinimalistThemeStatus = useStoreable('baleada_minimalist_theme_status'),
          minimalistThemeStatus = ref(storeableMinimalistThemeStatus.value.string),
          enableMinimalistTheme = () => {
            storeableMinimalistThemeStatus.value.store('enabled')
            minimalistThemeStatus.value = storeableMinimalistThemeStatus.value.string
          },
          disableMinimalistTheme = () => {
            storeableMinimalistThemeStatus.value.store('disabled')
            minimalistThemeStatus.value = storeableMinimalistThemeStatus.value.string
          },
          toggleMinimalistTheme = () => {
            switch (minimalistThemeStatus.value) {
            case null:
              // do nothing
              break
            case 'enabled':
              disableMinimalistTheme()
              break
            case 'disabled':
              enableMinimalistTheme()
              break
            }
          },
          minimalistThemeShortcut = useListenable('shift+m')

    onMounted(() => {
      switch (storeableMinimalistThemeStatus.value.status) {
      case 'ready':
        disableMinimalistTheme() // Disable by default
        break
      case 'stored':
      case 'removed':
        // do nothing
        break
      }
      minimalistThemeShortcut.value.listen(() => toggleMinimalistTheme())
    })

    /* Transition hooks for table of contents */
    const tableOfContentsTransitionStatus = ref('after-enter'),
          onTableOfContentsAfterLeave = () => (tableOfContentsTransitionStatus.value = 'after-leave'),
          onTableOfContentsBeforeEnter = () => (tableOfContentsTransitionStatus.value = 'before-enter')
    
    onMounted(() => {
      if (minimalistThemeStatus.value === 'enabled') {
        tableOfContentsTransitionStatus.value = 'after-leave'
      }
    })

    // Create Prose context
    createProseContext(article)
          
          
    // Set up reactive SEO
    const context = useContext(),
          route = useRoute(),
          SITE_NAME = 'Baleada'

    useHead({
      title: computed(() => context.article.frontMatter?.title ?? SITE_NAME),
      metas: [
        // Essential META Tags
        { 
          property: 'og:title',
          content: computed(() => context.article.frontMatter?.title ?? SITE_NAME)
        },
        { 
          property: 'og:description',
          content: computed(() => context.article.frontMatter?.summary ?? '')
        },
        { 
          property: 'og:image',
          content: computed(() => context.article.frontMatter?.image ?? '')
        },
        { 
          property: 'og:url',
          content: computed(() => `${window.origin}${route.fullPath}`),
        },
        { 
          name: 'twitter:card',
          content: computed(() => context.article.frontMatter?.image ?? ''),
        },

        // Non-Essential, But Recommended
        { 
          property: 'og:site_name',
          content: SITE_NAME
        },
        {
          name: 'twitter:image:alt',
          content: computed(() => context.article.frontMatter?.imageAlt ?? '')
        },

        // Non-Essential, But Required for Analytics
        {
          name: 'twitter:site',
          content: '@BaleadaToolkit'
        },
      ]
    })

    return {
      openStatus,
      openNav,
      openArticle,
      openTableOfContents,
      handleSidebarClick,

      nav,
      article,
      tableOfContents,

      darkThemeStatus,
      toggleDarkTheme,
      enableDarkTheme,
      disableDarkTheme,

      minimalistThemeStatus,
      toggleMinimalistTheme,
      enableMinimalistTheme,
      disableMinimalistTheme,

      tableOfContentsTransitionStatus,
      onTableOfContentsAfterLeave,
      onTableOfContentsBeforeEnter,
    }
  },
}
</script>

<style lang="postcss">
.baleada-prose-article {
  /* Not doing all styles here because can't use @apply for non-plugin utilities. Also because this file size would be insane. */
}

@media screen and (min-width: theme(screens.lg)) {
  .baleada-prose-article {
    @apply transition-none;

    .table-of-contents-after-leave & {
      @apply w-full;
      padding-left: 21rem;
      padding-right: 21rem;
    }

    .table-of-contents-before-enter & {
      @apply w-auto px-11;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
