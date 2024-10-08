<template>
  <main class="min-h-screen-md">
    <BrandRectangleGradient
      class="absolute pin-t pin-l z-10 w-screen h-screen"
      gradient-id="landing-page"
      :x="{ 1: 0, 2: 1 }"
      :y="{ 1: 0, 2: 1 }"
      :stops="[
        { offset: 0, classes: 'text-primary-40 dork:text-primary-100' },
        { offset: 40, classes: 'text-primary-60 dork:text-primary-110' },
        { offset: 95, classes: 'text-primary-70 dork:text-primary-120' },
      ]"
    />
    <section class="relative z-20 h-screen flex flex-col items-center justify-center px-10">
      <BrandLogo
        id="landing-page"
        ref="logo"
        class="-ml-2 h-13 w-13 sm:h-14 sm:w-14 md:h-15 md:w-15 flex-shrink-0 text-primary-10 transition-none"
        :hasShadow="true"
        @mouseenter="mouseenterHandle"
      />

      <h1 class="mt-6 font-display font-6 text-9 sm:text-10 md:text-11 text-center text-shadow-2 tracking-2 text-primary-10 dork:text-primary-gray-20">Baleada&nbsp;</h1>
      <p class="mt-2 font-display text-7 sm:text-8 md:text-9 text-center text-shadow-2 tracking-2 text-primary-10 dork:text-primary-gray-20">A toolkit for building web apps.</p>

      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-5 sm:mt-10">
        <RouterLink
          to="/docs"
          class="
            btn btn-4 md:btn-5 btn-raised btn-grows ring-3            
            ring-primary-10 text-primary-120 bg-primary-10
            dork:bg-primary-gray-20 dork:ring-primary-gray-20
          "
        >
          <HeroiconsBookOpen class="fill-current icon-btn" />
          <span>Read the docs</span>
        </RouterLink>
        <a
          href="https://github.com/baleada/"
          class="
            btn btn-4 md:btn-5 btn-grows ring-3
            ring-primary-10 text-primary-10
            dork:ring-primary-20 dork:text-primary-20
          "
        >
          <SimpleGitHub class="icon icon-btn" />
          <span>View on GitHub</span>
        </a>
      </div>
    </section>

    <LayoutFooter />
  </main>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useAnimateable, useNavigateable } from '@baleada/vue-composition'
import SimpleGitHub from '@simple-icons/github.svg'
// @ts-ignore
import { HeroiconsBookOpen } from '@baleada/vue-heroicons'

export default {
  name: 'PageIndex',
  components: {
    HeroiconsBookOpen,
    SimpleGitHub
  },
  setup () {
    const logo = ref(null),
          animations = useNavigateable((new Array(4)).fill(undefined)),
          wiggle = useAnimateable(
            [
              {
                progress: 0,
                properties: { rotate: 0 }
              },
              {
                progress: 1,
                properties: { rotate: 8 }
              }
            ],
            {
              duration: 130,
              iterations: 3,
              alternates: true,
            }
          )

    function mouseenterHandle () {
      switch (wiggle.status) {
      case 'playing':
      case 'reversing':
        // do nothing
        break
      default:
        wiggle.play(frame => {
          const { properties: { rotate: { interpolated: rotate } } } = frame

          if (wiggle.iterations === 3) {
            logo.value.$el.style.transform = `rotate(0deg)`
            return
          }

          logo.value.$el.style.transform = `rotate(${rotate}deg)`
        })
        break
      }
    }

    return {
      logo,
      mouseenterHandle
    }
  }
}
</script>

<!--
configs = [
            // Wiggle
            ({ set }) => ({
              animation: {
                direction: 'alternate',
                loop: 6,
                complete: anim => {
                  const target = anim.children[0].animateables[0].target
                  set(target, { rotate: '0deg' })
                  navigateable.value.rand()
                },
              },
              timelineChildren: [
                { rotate: '19deg', easing: 'linear', duration: 400 },
              ],
            }),

            // Spin
            ({ set }) => ({
              animation: {
                autoplay: false,
                complete: anim => {
                  const target = anim.children[0].animateables[0].target
                  set(target, { rotate: '0deg' })
                  navigateable.value.rand()
                },
              },
              timelineChildren: [
                { rotate: '360deg', duration: 190 },
              ],
            }),

            // Toss up and bounce
            ({ set }) => ({
              animation: {
                autoplay: false,
                complete: anim => {
                  const target = anim.children[0].animateables[0].target
                  set(target, { rotate: '0deg' })
                  navigateable.value.rand()
                },
              },
              timelineChildren: [
                { translateY: '-30%', easing: 'easeOutBack', duration: 420 },
                { translateY: 0, easing: 'easeOutElastic(1, .3)' }
              ]
            }),

            // Wind up and spin
            ({ set }) => ({
              animation: {
                autoplay: false,
                complete: anim => {
                  const target = anim.children[0].animateables[0].target
                  set(target, { rotate: '0deg' })
                  navigateable.value.rand()
                },
              },
              timelineChildren: [
                { rotate: '-42deg', easing: 'easeInBack', duration: 200 },
                [{ rotate: `360deg`, duration: 100 }, '+=250'],
              ],
            }),
          ]
          -->
