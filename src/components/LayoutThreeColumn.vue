<template>
  <main
    class="relative z-10 lg:flex w-full overflow-x-hidden"
    :class="[
      darkThemeStatus === 'enabled' ? 'dark' : '',
      minimalistThemeStatus === 'enabled' ? 'minimalist' : '',
      darkThemeStatus === 'disabled' && minimalistThemeStatus === 'disabled'
        ? 'bg-gray-200'
        : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
          ? 'bg-primary-gray-1000'
          : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
            ? 'bg-primary-gray-950'
            : darkThemeStatus === 'disabled' && minimalistThemeStatus === 'enabled'
              ? 'bg-white'
              : ''
    ]"
  >
    <!-- Left -->
    <section
      class="relative h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch lg:translate-0"
      :class="[
        openStatus === 'nav' ? 'translate-0' : '-translate-x-100',
        tableOfContentsTransitionStatus === 'after-leave'
          ? 'lg:absolute lg:z-30 lg:h-auto'
          : ''
      ]"
      ref="nav"
    >
      <header
        class="flex items-center pb-3 border-b-2"
        :class="[
          darkThemeStatus === 'disabled' && minimalistThemeStatus === 'disabled'
            ? 'border-gray-300'
            : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
              ? 'border-primary-gray-950'
              : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
                ? 'border-primary-gray-950'
                : darkThemeStatus === 'disabled' && minimalistThemeStatus === 'enabled'
                  ? 'border-white'
                  : ''
        ]"
      >
        <NuxtLink
          to="/"
          aria-label="Link to home page"
          class="flex-none rounded-full h-10 w-10 p-2 -shadow transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'bg-primary-gray-900' : 'bg-primary-600',
          ]"
        >
          <BaleadaLogo
            id="nav-header"
            :tortillaClasses="darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : undefined"
            :burnClasses="darkThemeStatus === 'enabled' ? 'text-primary-gray-1000' : undefined"
          />
        </NuxtLink>
      </header>

      <button
        class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
        :class="[
          darkThemeStatus === 'enabled' ? 'text-gray-600 hover:text-gray-400' : 'text-gray-900 hover:text-primary-600'
        ]"
        aria-label="Close menu"
        @click="openArticle"
      >
        <HeroiconsX :class="'icon'"/>
      </button>

      <!-- TODO: use toggle component -->
      <!-- Dark theme toggle -->
      <div class="mt-3 py-3 w-full'">
        <div class="flex items-center">
          <button
            class="flex items-center text-2 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            aria-label="Disable dark theme"
            @click="() => disableDarkTheme()"
          >
            <HeroiconsSun :class="'icon h-5 w-5 transition'"/>
          </button>
          <div
            @click="() => toggleDarkTheme()"
            class="relative mx-2 inline-flex h-6 w-9 -shadow rounded-full cursor-pointer"
            :class="[
              darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
                ? 'bg-primary-gray-900'
                : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
                  ? 'bg-primary-gray-1000'
                  : 'bg-gray-300'
            ]"
          >
            <button
              aria-label="Toggle dark theme"
              class="absolute rounded-full h-6 w-6 shadow transition-all focus:shadow-outline"
              :style="darkThemeStatus === 'enabled' ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                darkThemeStatus === 'enabled' ? 'left-full bg-primary-gray-700' : 'left-0 bg-white',
              ]"
            />
          </div>
          <button
            class="flex items-center text-2 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            aria-label="Enable dark theme"
            @click="() => enableDarkTheme()"
          >
            <HeroiconsMoon :class="'icon h-5 w-5 transition'"/>
          </button>
        </div>

        <span class="block mt-3 text-2" :class="[darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">D</code>
        </span>
      </div>

      <!-- Minimalist theme toggle -->
      <div class="hidden lg:block mt-3 py-3 w-full">
        <div class="flex items-center">
          <button
            class="flex items-center text-3 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            aria-label="Disable minimalist theme"
            @click="() => disableMinimalistTheme()"
          >
            <HeroiconsTemplate :class="'icon transition h-5 w-5'" />
          </button>
          <div
            @click="() => toggleMinimalistTheme()"
            class="relative mx-2 inline-flex h-6 w-9 -shadow rounded-full cursor-pointer"
            :class="[
              darkThemeStatus === 'enabled' && minimalistThemeStatus === 'disabled'
                ? 'bg-primary-gray-900'
                : darkThemeStatus === 'enabled' && minimalistThemeStatus === 'enabled'
                  ? 'bg-primary-gray-1000'
                  : darkThemeStatus === 'disabled' && minimalistThemeStatus === 'enabled'
                    ? 'bg-primary-300'
                    : 'bg-gray-300'
            ]"
          >
            <button
              aria-label="Toggle minimalist theme"
              class="absolute rounded-full h-6 w-6 shadow transition-all focus:shadow-outline"
              :style="minimalistThemeStatus === 'enabled' ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                darkThemeStatus === 'enabled' ? 'bg-primary-gray-700' : 'bg-white',
                minimalistThemeStatus === 'enabled' ? 'left-full' : 'left-0',
              ]"
            />
          </div>
          <button
            class="flex items-center text-2 rounded-full font-6 tracking-3"
            :class="[
              darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            aria-label="Enable minimalist theme"
            @click="() => enableMinimalistTheme()"
          >
            <EvaSquare :class="'icon transition h-5 w-5'" />
          </button>
        </div>

        <span class="block mt-3 text-2" :class="[darkThemeStatus === 'enabled' ? 'text-primary-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">M</code>
        </span>
      </div>

      <transition name="fade">
        <DocsNav
          v-show="minimalistThemeStatus === 'disabled'"
          class="mt-5 pb-7"
          @click.native="handleSidebarClick"
        />
      </transition>
    </section>

    <!-- Middle -->
    <section
      ref="article"
      class="absolute lg:relative top-0 left-0 z-20 h-screen w-screen lg:w-full overflow-x-hidden overflow-y-scroll scrolling-touch lg:translate-0"
      :class="[
        openStatus === 'nav'
          ? 'translate-x-100'
          : openStatus === 'tableOfContents'
            ? '-translate-x-100'
            : '',
        darkThemeStatus === 'enabled' ? 'bg-primary-gray-950' : 'bg-white',
        minimalistThemeStatus === 'enabled' ? '' : 'shadow-3 lg:rounded-2',
        `table-of-contents-${tableOfContentsTransitionStatus}`,
      ]"
    >
      <transition name="fade">
        <div v-show="minimalistThemeStatus === 'disabled'">
          <BaleadaLogo
            id="article-decoration"
            :class="'absolute h-auto w-full sm:w-3/4 max-w-screen-sm top-0 right-0'"
            :style="{ transform: 'translate(14%, -42%)' }"
            type="outline"
            :classes="[
              darkThemeStatus === 'disabled' ? 'text-primary-100' : 'text-primary-gray-800 opacity-80',
            ]"
          />
        </div>
      </transition>
      <header class="relative flex items-center z-40 absolute left-0 top-0 pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          aria-label="Show navigation"
          class="lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="openNav"
        >
          <HeroiconsMenu :class="'icon'" />
        </button>

        <!-- <DocsSearch class="ml-2 lg:ml-0 w-full max-w-6" /> -->

        <button
          type="button"
          aria-label="Show table of contents"
          class="ml-auto lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="openTableOfContents"
        >
          <HeroiconsMenuAlt1 :class="'icon'" />
        </button>
      </header>

      <nuxt class="relative" key="content" />
    </section>

    <!-- Right -->
    <transition
      name="fade"
      v-on:before-enter="onTableOfContentsBeforeEnter"
      v-on:after-leave="onTableOfContentsAfterLeave"
    >
      <section
        v-show="minimalistThemeStatus === 'disabled'"
        class="absolute lg:relative top-0 left-0 h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch lg:translate-0"
        :class="[
          openStatus === 'tableOfContents' ? 'translate-0' : 'translate-x-100',
        ]"
        ref="tableOfContents"
      >
      <!-- minimalistThemeStatus === 'enabled' ? 'opacity-0 pointer-events-none translate-x-100' : 'lg:translate-0', -->
        <button
          class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
          :class="[
            darkThemeStatus === 'enabled' ? 'text-gray-600 hover:text-gray-400' : 'text-gray-900 hover:text-primary-600'
          ]"
          aria-label="close-menu"
          @click="openArticle"
        >
          <HeroiconsX :class="'icon'"/>
        </button>
        <!-- <DocsAd class="mt-auto"/> -->
        <DocsTableOfContents
          :headings="headings"
          @click.native="handleSidebarClick"
        />
      </section>
    </transition>
  </main>
</template>

<script>
import { ref, computed, onMounted, inject } from '@vue/composition-api'

import { swipe } from '@baleada/listenable-gestures'
import { useListenable, useStoreable } from '@baleada/vue-composition'
import { useSymbol } from '@baleada/vue-prose'
import { HeroiconsMenu, HeroiconsX, HeroiconsMenuAlt1, HeroiconsSun, HeroiconsMoon, HeroiconsTemplate, EvaSquare } from '@baleada/vue-icons'

import DocsNav from '~/components/DocsNav'
import DocsSearch from '~/components/DocsSearch'
import DocsTableOfContents from '~/components/DocsTableOfContents'

export default {
  name: 'ThreeColumn',
  components: {
    HeroiconsMenu,
    HeroiconsX,
    HeroiconsMenuAlt1,
    HeroiconsSun,
    HeroiconsMoon,
    HeroiconsTemplate,
    EvaSquare,
    DocsNav,
    // DocsSearch,
    DocsTableOfContents,
  },
  setup (props, context) {
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

            '.baleada-prose-grid',
            '.baleada-prose-grid *',

            '.swiper-no-swiping',
          ]

    onMounted(() => {
      articleSwipe.value.listen(
        ({ recognizeable }) => {
          const direction = recognizeable.metadata.direction.fromStart
          if (direction === 'right') {
            openNav()
          } else if (direction === 'left') {
            openTableOfContents()
          }
        },
        { target: article.value, except, addEventListener: { passive: true } }
      )

      navSwipe.value.listen(
        ({ recognizeable }) => {
          const direction = recognizeable.metadata.direction.fromStart
          if (direction === 'left') {
            openArticle()
          }
        },
        { target: nav.value, addEventListener: { passive: true } }
      )

      tableOfContentsSwipe.value.listen(
        ({ recognizeable }) => {
          const direction = recognizeable.metadata.direction.fromStart
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

    /* Get headings for table of contents */
    const headings = inject(useSymbol('layout', 'headings'))

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

      headings,
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
    transition: none;

    & > .contents {
      transition: none;
    }

    .table-of-contents-after-leave & {
      @apply w-full px-17;

      & > .contents {
        /* pr-11 is defined in article.css */
        @apply px-11;
      }
    }

    .table-of-contents-before-enter & {
      @apply w-auto px-11;

      & > .contents {
        @apply px-0;
      }
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
