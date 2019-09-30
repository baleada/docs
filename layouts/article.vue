<template lang="html">
  <main class="relative z-10 lg:flex">
    <section
      class="relative h-screen w-screen lg:w-auto lg:max-w-2 px-7 overflow-scroll scrolling-touch bg-gray-200 transition"
      ref="nav"
    >
      <header class="flex items-center py-3 border-b border-gray-300">
        <NuxtLink to="/" aria-label="Link to home page" class="flex-none rounded-full h-10 w-10 bg-primary-600 p-2 -shadow transition btn-grows">
          <BaleadaLogo ref="logo" class="-mt-px" />
        </NuxtLink>
      </header>

      <button
        class="lg:hidden absolute top-0 right-0 mt-3 mr-3 h-6 w-6 hover:text-primary-600 cursor-pointer transition btn-grows"
        name="close-menu"
        @click="toggleNav"
      >
        <EvaClose :class="'icon'"/>
      </button>

      <DocsNav class="pb-7" @click.native="handleNavClick" />
    </section>
    <article
      ref="article"
      class="absolute lg:relative top-0 left-0 z-20 h-screen w-screen lg:w-auto lg:flex-1 flex flex-col overflow-x-hidden overflow-y-scroll scrolling-touch shadow-3 rounded-l-2 bg-white transition"
      :class="[
        navIsOpen ? 'translate-x-full lg:translate-0' : ''
      ]"
    >
      <header class="flex items-center z-40 absolute left-0 top-0 pt-6 px-7 sm:px-9 lg:pl-11 w-full">
        <button
          type="button"
          name="open-menu-button"
          class="btn btn-lg h-6 w-6 p-0 lg:hidden hover:text-primary-600 transition"
          @click="toggleNav"
        >
          <EvaMenu :class="'icon'" />
        </button>

        <!-- <DocsSearch class="ml-2 lg:ml-0 w-full max-w-6" /> -->
      </header>

      <BaleadaLogo
        :class="'opacity-20 absolute top-0 right-0 h-17 w-17 translate--y-25-x-25 md:translate--y-30-x-30 md:h-18 md:w-18 lg:h-19 lg:w-19'"
        :has-shadow="false"
        type="outline" />

      <!-- table of contents here? -->

      <nuxt key="content" />
    </article>
  </main>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from '@vue/composition-api'

import useTouchable from '../assets/js/baleada/composition/useTouchable'

import DocsNav from '~/components/DocsNav.vue'

import { EvaMenu } from '@baleada/icons/vue'
import { EvaClose } from '@baleada/icons/vue'

export default {
  components: {
    DocsNav,
    EvaMenu,
    EvaClose
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
    onMounted(() => {
      touchableNav = useTouchable(nav.value, {
        allowsSelect: true,
        onSwipeleft: closeNav,
        onSwiperight: openNav
      })
    })
    onBeforeUnmount(() => {
      touchableNav.destroy()
    })

    const article = ref(null)
    let touchableArticle
    onMounted(() => {
      const swiperNoSwiping = [
        '.long-form .overflow-y-scroll',
        '.long-form .overflow-y-scroll *',

        '.long-form .overflow-x-scroll',
        '.long-form .overflow-x-scroll *',

        '.long-form pre',
        '.long-form pre *',

        '.long-form .scrollable-wrapper',
        '.long-form .scrollable-wrapper *',

        '.swiper-no-swiping',
      ]
      touchableArticle = useTouchable(article.value, {
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
      })
    })
    onBeforeUnmount(() => {
      touchableArticle.destroy()
    })

    return {
      toggleNav,
      handleNavClick,
      navIsOpen,
      nav,
      article,
    }
  },
}
</script>
