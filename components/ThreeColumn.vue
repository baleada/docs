<template>
  <main
    class="relative z-10 lg:flex"
    :class="[
      isDarkTheme ? 'dark' : '',
      isMinimalistTheme ? 'minimalist' : '',
      !isDarkTheme && !isMinimalistTheme
        ? 'bg-gray-200'
        : isDarkTheme && !isMinimalistTheme
          ? 'bg-primary-gray-1000'
          : isDarkTheme && isMinimalistTheme
            ? 'bg-primary-gray-950'
            : !isDarkTheme && isMinimalistTheme
              ? 'bg-white'
              : ''
    ]"
  >
    <!-- Left -->
    <section
      class="relative h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch lg:translate-0"
      :class="[
        navIsOpen ? 'translate-0' : '-translate-x-100',
        tableOfContentsTransitionStatus === 'after-leave'
          ? 'lg:absolute lg:z-30 lg:h-auto'
          : ''
      ]"
      ref="nav"
    >
      <header
        class="flex items-center pb-3 border-b-2"
        :class="[
          !isDarkTheme && !isMinimalistTheme
            ? 'border-gray-300'
            : isDarkTheme && !isMinimalistTheme
              ? 'border-primary-gray-950'
              : isDarkTheme && isMinimalistTheme
                ? 'border-primary-gray-950'
                : !isDarkTheme && isMinimalistTheme
                  ? 'border-white'
                  : ''
        ]"
      >
        <NuxtLink
          to="/"
          aria-label="Link to home page"
          class="flex-none rounded-full h-10 w-10 p-2 -shadow transition btn-grows"
          :class="[
            isDarkTheme ? 'bg-primary-gray-900' : 'bg-primary-600',
          ]"
        >
          <BaleadaLogo
            :tortillaClasses="isDarkTheme ? 'text-primary-gray-500' : undefined"
            :burnClasses="isDarkTheme ? 'text-primary-gray-1000' : undefined"
          />
        </NuxtLink>
      </header>

      <button
        class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
        :class="[
          isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-900 hover:text-primary-600'
        ]"
        name="close-menu"
        @click="toggleNav"
      >
        <EvaClose :class="'icon'"/>
      </button>

      <!-- TODO: use toggle component -->
      <!-- Dark theme toggle -->
      <div class="mt-3 py-3 w-full'">
        <div class="flex items-center">
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            name="Disable dark theme"
            @click="() => disableDarkTheme()"
          >
            <EvaSun :class="'icon h-5 w-5 transition'"/>
          </button>
          <div
            @click="() => toggleDarkTheme()"
            class="relative mx-2 inline-flex h-6 w-9 -shadow rounded-full cursor-pointer"
            :class="[
              isDarkTheme && !isMinimalistTheme
                ? 'bg-primary-gray-900'
                : isDarkTheme && isMinimalistTheme
                  ? 'bg-primary-gray-1000'
                  : 'bg-gray-300'
            ]"
          >
            <button
              name="Toggle dark theme"
              class="absolute rounded-full h-6 w-6 shadow transition focus:shadow-outline"
              :style="isDarkTheme ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                isDarkTheme ? 'left-full bg-primary-gray-700' : 'left-0 bg-white',
              ]"
            />
          </div>
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            name="Enable dark theme"
            @click="() => enableDarkTheme()"
          >
            <EvaMoon :class="'icon h-5 w-5 transition'"/>
          </button>
        </div>

        <span class="block mt-3 text-1" :class="[isDarkTheme ? 'text-primary-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">D</code>
        </span>
      </div>

      <!-- Minimalist theme toggle -->
      <div class="hidden lg:block mt-3 py-3 w-full">
        <div class="flex items-center">
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            name="Disable minimalist theme"
            @click="() => disableMinimalistTheme()"
          >
            <EvaLayout :class="'icon transition h-5 w-5'" />
          </button>
          <div
            @click="() => toggleMinimalistTheme()"
            class="relative mx-2 inline-flex h-6 w-9 -shadow rounded-full cursor-pointer"
            :class="[
              isDarkTheme && !isMinimalistTheme
                ? 'bg-primary-gray-900'
                : isDarkTheme && isMinimalistTheme
                  ? 'bg-primary-gray-1000'
                  : !isDarkTheme && isMinimalistTheme
                    ? 'bg-primary-300'
                    : 'bg-gray-300'
            ]"
          >
            <button
              name="Toggle minimalist theme"
              class="absolute rounded-full h-6 w-6 shadow transition focus:shadow-outline"
              :style="isMinimalistTheme ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                isDarkTheme ? 'bg-primary-gray-700' : 'bg-white',
                isMinimalistTheme ? 'left-full' : 'left-0',
              ]"
            />
          </div>
          <button
            class="flex items-center text-1 rounded-full font-600 tracking-3"
            :class="[
              isDarkTheme ? 'text-primary-gray-500' : 'text-gray-600'
            ]"
            name="Enable minimalist theme"
            @click="() => enableMinimalistTheme()"
          >
            <EvaSquare :class="'icon transition h-5 w-5'" />
          </button>
        </div>

        <span class="block mt-3 text-1" :class="[isDarkTheme ? 'text-primary-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">M</code>
        </span>
      </div>

      <transition name="fade">
        <DocsNav
          v-show="!isMinimalistTheme"
          class="mt-5 pb-7"
          @click.native="handleNavClick"
        />
      </transition>
    </section>

    <!-- Middle -->
    <section
      ref="article"
      class="absolute lg:relative top-0 left-0 z-20 h-screen w-screen lg:w-full overflow-x-hidden overflow-y-scroll scrolling-touch lg:translate-0"
      :class="[
        navIsOpen ? 'translate-x-100' : '',
        tableOfContentsIsOpen ? '-translate-x-100' : '',
        isDarkTheme ? 'bg-primary-gray-950' : 'bg-white',
        isMinimalistTheme ? '' : 'shadow-3 lg:rounded-2',
        `table-of-contents-${tableOfContentsTransitionStatus}`,
      ]"
    >
      <transition name="fade">
        <div v-show="!isMinimalistTheme">
          <BaleadaLogo
            :class="'absolute h-19 w-19 top-0 right-0'"
            :style="{ transform: 'translate(14%, -42%)' }"
            type="outline"
            :classes="[
              !isDarkTheme ? 'text-primary-100' : 'text-primary-gray-800 opacity-80',
            ]"
          />
        </div>
      </transition>
      <header class="relative flex items-center z-40 absolute left-0 top-0 pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          name="Show navigation"
          class="lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="toggleNav"
        >
          <EvaMenu :class="'icon'" />
        </button>

        <!-- <DocsSearch class="ml-2 lg:ml-0 w-full max-w-6" /> -->

        <button
          type="button"
          name="Show table of contents"
          class="ml-auto lg:hidden h-7 w-7 p-0 rounded-full transition btn-grows"
          :class="[
            isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="toggleTableOfContents"
        >
          <EvaList :class="'icon'" />
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
        v-show="!isMinimalistTheme"
        class="absolute lg:relative top-0 left-0 h-screen w-screen lg:w-17 flex-none px-7 py-3 overflow-y-scroll scrolling-touch lg:translate-0"
        :class="[
          tableOfContentsIsOpen ? 'translate-0' : 'translate-x-100',
        ]"

        ref="tableOfContents"
      >
      <!-- isMinimalistTheme ? 'opacity-0 pointer-events-none translate-x-100' : 'lg:translate-0', -->
        <button
          class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
          :class="[
            isDarkTheme ? 'text-gray-600 hover:text-gray-400' : 'text-gray-900 hover:text-primary-600'
          ]"
          name="close-menu"
          @click="toggleTableOfContents"
        >
          <EvaClose :class="'icon'"/>
        </button>
        <!-- <DocsAd class="mt-auto"/> -->
        <DocsTableOfContents :headings="headings" />
      </section>
    </transition>
  </main>
</template>

<script>
import { ref, onMounted, inject } from '@vue/composition-api'

import { useListenable } from '@baleada/composition/vue'

import { useSymbol } from '@baleada/prose/vue'

import { EvaMenu, EvaClose, EvaList, EvaSun, EvaMoon, EvaLayout, EvaSquare } from '@baleada/icons/vue'

import DocsNav from '~/components/DocsNav'
import DocsSearch from '~/components/DocsSearch'
import DocsTableOfContents from '~/components/DocsTableOfContents'

export default {
  name: 'ThreeColumn',
  components: {
    EvaMenu,
    EvaClose,
    EvaList,
    EvaSun,
    EvaMoon,
    EvaLayout,
    EvaSquare,
    DocsNav,
    DocsSearch,
    DocsTableOfContents,
  },
  setup(props, context) {
    /* Manage nav state */
    const navIsOpen = ref(false),
          toggleNav = () => (navIsOpen.value = !navIsOpen.value),
          openNav = () => (navIsOpen.value = true),
          closeNav = () => (navIsOpen.value = false),
          handleNavClick = evt => {
            if (evt.target.matches('a')) {
              closeNav()
            }
          }

    /* Manage table of contents state */
    const tableOfContentsIsOpen = ref(false),
          toggleTableOfContents = () => tableOfContentsIsOpen.value = !tableOfContentsIsOpen.value,
          openTableOfContents = () => tableOfContentsIsOpen.value = true,
          closeTableOfContents = () => tableOfContentsIsOpen.value = false,
          handleTableOfContentsClick = evt => {
            if (evt.target.matches('a')) {
              closeTableOfContents()
            }
          }

    /* Touch gestures */
    const nav = ref(null),
          article = ref(null),
          tableOfContents = ref(null),
          swipe = useListenable('swipe'),
          blacklist = [
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
      swipe.value.listen(
        (gesture, { toDirection }) => {
          const direction = toDirection(gesture.metadata.angle.degrees)
          if (direction === 'right') {
            openNav()
          } else if (direction === 'left') {
            openTableOfContents()
          }
        },
        { target: article.value, blacklist }
      )

      swipe.value.listen(
        (gesture, { toDirection }) => {
          const direction = toDirection(gesture.metadata.angle.degrees)
          if (direction === 'left') {
            closeNav()
          }
        },
        { target: nav.value }
      )

      swipe.value.listen(
        (gesture, { toDirection }) => {
          const direction = toDirection(gesture.metadata.angle.degrees)
          if (direction === 'right') {
            closeTableOfContents()
          }
        },
        { target: tableOfContents.value }
      )
    })

    /* Dark theme */
    const isDarkTheme = ref(true),
          toggleDarkTheme = () => isDarkTheme.value = !isDarkTheme.value,
          enableDarkTheme = () => isDarkTheme.value = true,
          disableDarkTheme = () => isDarkTheme.value = false,
          darkThemeShortcutListener = ({ key, shiftKey }) => {
            if (shiftKey && key === 'D') {
              toggleDarkTheme()
            }
          },
          prefersDarkTheme = useListenable('(prefers-color-scheme: dark)')


    onMounted(() => {
      prefersDarkTheme.value.listen(({ matches }) => (isDarkTheme.value = matches))
      isDarkTheme.value = prefersDarkTheme.value.activeListeners[0].target.matches
    })

    /* Minimalist theme */
    const isMinimalistTheme = ref(false),
          toggleMinimalistTheme = () => isMinimalistTheme.value = !isMinimalistTheme.value,
          enableMinimalistTheme = () => isMinimalistTheme.value = true,
          disableMinimalistTheme = () => isMinimalistTheme.value = false,
          minimalistThemeShortcutListener = ({ key, shiftKey }) => {
            if (shiftKey && key === 'M') {
              toggleMinimalistTheme()
            }
          }


    /* Keyboard shortcuts */
    const shortcuts = [
            {
              fn: toggleMinimalistTheme,
              condition: ({ key, shiftKey }) => (shiftKey && key === 'M')
            },
            {
              fn: toggleDarkTheme,
              condition: ({ key, shiftKey }) => (shiftKey && key === 'D')
            },
          ],
          keydown = useListenable('keydown')

    onMounted(() => {
      shortcuts.forEach(({ fn, condition }) => {
        const listener = evt => {
          if (condition(evt)) {
            fn()
          }
        }
        keydown.value.listen(listener)
      })
    })

    /* Transition hooks for table of contents */
    const tableOfContentsTransitionStatus = ref('after-enter'),
          onTableOfContentsAfterLeave = () => (tableOfContentsTransitionStatus.value = 'after-leave'),
          onTableOfContentsBeforeEnter = () => (tableOfContentsTransitionStatus.value = 'before-enter')

    const headings = inject(useSymbol('layout', 'headings'))

    return {
      toggleNav,
      handleNavClick,
      navIsOpen,

      toggleTableOfContents,
      handleTableOfContentsClick,
      tableOfContentsIsOpen,

      nav,
      article,
      tableOfContents,

      isDarkTheme,
      toggleDarkTheme,
      enableDarkTheme,
      disableDarkTheme,

      isMinimalistTheme,
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
