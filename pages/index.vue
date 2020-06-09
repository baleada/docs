<template lang="html">
  <main class="h-screen flex flex-col items-center justify-center px-10">
    <BaleadaLogo
      id="landing-page"
      ref="logo"
      :class="'-ml-2 h-13 w-13 sm:h-14 sm:w-14 md:h-15 md:w-15 text-primary-100 transition-none'"
      :hasShadow="true"
      @mouseover="handleMouseover"
    />

    <h1 class="mt-6 font-display font-6 text-9 sm:text-10 md:text-11 text-center text-shadow-2 tracking-2 text-primary-100">Baleada&nbsp;</h1>
    <p class="mt-2 font-display text-7 sm:text-8 md:text-9 text-center text-shadow-2 tracking-2 text-primary-100">A toolkit for building web apps.</p>

    <div class="flex flex-col sm:flex-row mt-5 sm:mt-10">
      <NuxtLink to="/docs" class="btn md:btn-lg btn-raised btn-grows bg-primary-100 text-primary-800">
        <EvaBook :class="'icon'" />
        <span>Read the docs</span>
      </NuxtLink>
      <a href="https://gitlab.com/baleada/" class="mt-3 sm:mt-0 sm:ml-4 btn md:btn-lg btn-grows border-5 border-primary-100 text-primary-100">
        <SimpleGitLab :class="'icon'" />
        <span>View on GitLab</span>
      </a>
    </div>
  </main>
</template>

<script>
import { ref } from '@vue/composition-api'

import { useAnimateable, useNavigateable } from '@baleada/vue-composition'

import { EvaBook, SimpleGitLab } from '@baleada/vue-icons'

export default {
  layout: 'landing',
  head: () => ({
    title: 'Baleada'
  }),
  components: {
    EvaBook,
    SimpleGitLab
  },
  setup() {
    const logo = ref(null),
          navigateable = useNavigateable(new Array(4)), // Grody hardcoded 4
          wiggle = useAnimateable(
            [
              {
                progress: 0,
                data: { rotate: 0 }
              },
              {
                progress: 1,
                data: { rotate: 8 }
              }
            ],
            {
              duration: 130,
              iterations: 3,
              alternates: true,
            }
          )

    function handleMouseover () {
      switch (wiggle.value.status) {
      case 'playing':
      case 'reversing':
        // do nothing
        break
      default:
        wiggle.value.play(frame => {
          const { data: { rotate } } = frame

          logo.value.style.transform = `rotate(${rotate}deg)`

          if (wiggle.value.iterations === 3) {
            logo.value.style.transform = `rotate(0deg)`
          }
        })
        break
      } 
    }

    return {
      logo,
      handleMouseover
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