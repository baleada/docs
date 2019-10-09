<template lang="html">
  <main
    class="relative z-10 lg:flex transition"
    :class="[
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-200',
    ]"
  >
    <section
      class="relative h-screen w-screen lg:w-auto lg:max-w-2 px-7 overflow-scroll scrolling-touch transition"
      :class="[
        isDarkMode ? 'bg-gray-900' : 'bg-gray-200'
      ]"
      ref="nav"
    >
      <header
        class="flex items-center py-3 border-b-2"
        :class="[
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        ]"
      >
        <NuxtLink
          to="/"
          aria-label="Link to home page"
          class="flex-none rounded-full h-10 w-10 p-2 -shadow transition btn-grows"
          :class="[
            isDarkMode ? 'bg-primary-900' : 'bg-primary-600'
          ]"
        >
          <BaleadaLogo
            ref="logo"
            class="-mt-px"
            :tortillaClasses="isDarkMode ? 'text-primary-300' : undefined"
            :burnClasses="isDarkMode ? 'text-primary-900' : undefined"
          />
        </NuxtLink>
      </header>

      <button
        class="lg:hidden absolute top-0 right-0 mt-3 mr-6 h-7 w-7 cursor-pointer transition btn-grows"
        :class="[
          isDarkMode ? 'text-gray-600 hover:text-gray-400' : 'text-gray-900 hover:text-primary-600'
        ]"
        name="close-menu"
        @click="toggleNav"
      >
        <EvaClose :class="'icon'"/>
      </button>

      <div class="mt-3 w-full py-3">
        <div class="flex items-center">
          <button
            class="flex items-center text-1 font-600 tracking-3"
            :class="[
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            ]"
            name="disable-dark-mode"
            @click="() => disableDarkMode()"
          >
            <!-- <span>LIGHT</span> -->
            <EvaSun :class="'icon h-5 w-5'" />
          </button>
          <div
            @click="() => toggleDarkMode()"
            class="relative mx-2 inline-flex -shadow rounded-full h-6 w-9 cursor-pointer transition"
            :class="[
              isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
            ]"
          >
            <button
              id="toggle-dark-mode"
              name="toggle-dark-mode"
              class="absolute rounded-full h-6 w-6 shadow transition"
              :style="isDarkMode ? { transform: 'translateX(-100%)' } : {}"
              :class="[
                isDarkMode ? 'left-full bg-gray-700' : 'left-0 bg-white'
              ]"
            />
          </div>
          <button
            class="flex items-center text-1 font-600 tracking-3"
            :class="[
              isDarkMode ? 'text-gray-500' : 'text-gray-600'
            ]"
            name="enable-dark-mode"
            @click="() => enableDarkMode()"
          >
            <EvaMoon :class="'icon h-5 w-5'" />
            <!-- <span>DARK</span> -->
          </button>
        </div>

        <span class="block mt-3 text-1" :class="[isDarkMode ? 'text-gray-500' : 'text-gray-600']">
          Hotkey: <code class="py-px px-1 font-400">SHIFT</code> + <code class="py-px px-1 font-400">D</code>
        </span>
      </div>

      <DocsNav class="mt-5 pb-7" @click.native="handleNavClick" />
    </section>
    <article
      ref="article"
      class="absolute lg:relative top-0 left-0 z-20 h-screen w-screen lg:w-auto lg:flex-1 flex flex-col overflow-x-hidden overflow-y-scroll scrolling-touch shadow-3 rounded-l-2 transition"
      :class="[
        navIsOpen ? 'translate-x-full lg:translate-0' : '',
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      ]"
    >
      <header class="flex items-center z-40 absolute left-0 top-0 pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          name="open-menu-button"
          class="lg:hidden h-7 w-7 p-0 transition btn-grows"
          :class="[
            isDarkMode ? 'text-gray-600 hover:text-gray-400' : 'text-gray-700 hover:text-primary-600'
          ]"
          @click="toggleNav"
        >
          <EvaMenu :class="'icon'" />
        </button>

        <!-- <DocsSearch class="ml-2 lg:ml-0 w-full max-w-6" /> -->
      </header>

      <BaleadaLogo
        :class="[
          'absolute top-0 right-0 h-17 w-17 translate--y-25-x-25 md:translate--y-30-x-30 md:h-18 md:w-18 lg:h-19 lg:w-19',
          isDarkMode ? 'opacity-60' : 'opacity-20'
        ]"
        :has-shadow="false"
        type="outline"
        v-bind="isDarkMode && { classes: 'text-primary-gray-500' }"
      />

      <!-- table of contents here? -->

      <nuxt key="content" />
    </article>
  </main>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount, provide } from '@vue/composition-api'

import useTouchable from '../assets/js/baleada/composition/useTouchable'

import DocsNav from '~/components/DocsNav.vue'

import { EvaMenu } from '@baleada/icons/vue'
import { EvaClose } from '@baleada/icons/vue'
import { EvaSun } from '@baleada/icons/vue'
import { EvaMoon } from '@baleada/icons/vue'

export default {
  components: {
    DocsNav,
    EvaMenu,
    EvaClose,
    EvaSun,
    EvaMoon,
  },
  setup(props, context) {
    /* Manage nav state */
    const navIsOpen = ref(false),
          toggleNav = () => (navIsOpen.value = !navIsOpen.value),
          closeNav = () => (navIsOpen.value = false),
          openNav = () => (navIsOpen.value = true),
          handleNavClick = evt => {
            if (evt.target.matches('a')) {
              closeNav()
            }
          }

    const nav = ref(null)
    let touchableNav
    useTouchable(nav, {
      allowsSelect: true,
      onSwipeleft: closeNav,
      onSwiperight: openNav
    }, touchableNav)

    const article = ref(null),
          swiperNoSwiping = [
            '.prose .overflow-y-scroll',
            '.prose .overflow-y-scroll *',

            '.prose .overflow-x-scroll',
            '.prose .overflow-x-scroll *',

            '.prose pre',
            '.prose pre *',

            '.prose .scrollable-wrapper',
            '.prose .scrollable-wrapper *',

            '.swiper-no-swiping',
          ]
    let touchableArticle
    useTouchable(article, {
      allowsSelect: true,
      blacklist: swiperNoSwiping,
      onSwipeleft: evt => {
        let shouldCallback = !swiperNoSwiping.some(selector => evt.target.matches(selector))
        if (shouldCallback) {
          closeNav()
        }
      },
      onSwiperight: evt => {
        let shouldCallback = !swiperNoSwiping.some(selector => evt.target.matches(selector))
        if (shouldCallback) {
          openNav()
        }
      }
    }, touchableArticle)


    /* Dark mode */
    const isDarkMode = ref(false),
          toggleDarkMode = () => isDarkMode.value = !isDarkMode.value,
          enableDarkMode = () => isDarkMode.value = true,
          disableDarkMode = () => isDarkMode.value = false,
          shortcutListener = ({ key, shiftKey }) => {
            if (shiftKey && key === 'D') {
              toggleDarkMode()
            }
          }
    onMounted(() => document.addEventListener('keydown', shortcutListener))
    onBeforeUnmount(() => document.removeEventListener('keydown', shortcutListener))
    provide('isDarkMode', isDarkMode)

    return {
      toggleNav,
      handleNavClick,
      navIsOpen,
      nav,
      article,
      isDarkMode,
      toggleDarkMode,
      enableDarkMode,
      disableDarkMode,
    }
  },
}
</script>
