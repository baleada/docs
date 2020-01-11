<template lang="html">
  <main class="h-screen flex flex-col items-center justify-center px-10">
    <BaleadaLogo
      id="landing-page"
      ref="logo"
      :class="'-ml-2 h-13 w-13 sm:h-14 sm:w-14 md:h-15 md:w-15 text-primary-100'"
      :hasShadow="true"
      @mouseover="handleMouseover"
    />

    <h1 class="mt-6 font-display font-600 text-8 sm:text-9 md:text-10 text-center text-shadow-2 tracking-2 text-primary-100">Baleada&nbsp;</h1>
    <p class="mt-2 font-display text-6 sm:text-7 md:text-8 text-center text-shadow-2 tracking-2 text-primary-100">A toolkit for building web apps.</p>

    <div class="flex flex-col sm:flex-row mt-5 sm:mt-10">
      <NuxtLink to="/docs" class="btn md:btn-lg btn-raised btn-grows bg-primary-100 text-primary-800">
        <EvaBook :class="'icon'" />
        <span>Read the docs</span>
      </NuxtLink>
      <a href="https://gitlab.com/baleada/" class="mt-3 sm:mt-0 sm:ml-4 btn md:btn-lg btn-grows border-2 border-primary-100 text-primary-100">
        <SimpleGitLab :class="'icon'" />
        <span>View on GitLab</span>
      </a>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'

import { useAnimatable, useNavigable } from '@baleada/composition/vue'

import { EvaBook, SimpleGitLab } from '@baleada/icons/vue'

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
          navigable = useNavigable(new Array(1)), // Grody hardcoded 4
          configs = [
            // Wiggle
            ({ set }) => ({
              animation: {
                direction: 'alternate',
                loop: 6,
                complete: anim => {
                  const target = anim.children[0].animatables[0].target
                  set(target, { rotate: '0deg' })
                  navigable.value.rand()
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
                  const target = anim.children[0].animatables[0].target
                  set(target, { rotate: '0deg' })
                  navigable.value.rand()
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
                  const target = anim.children[0].animatables[0].target
                  set(target, { rotate: '0deg' })
                  navigable.value.rand()
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
                  const target = anim.children[0].animatables[0].target
                  set(target, { rotate: '0deg' })
                  navigable.value.rand()
                },
              },
              timelineChildren: [
                { rotate: '-42deg', easing: 'easeInBack', duration: 200 },
                [{ rotate: `360deg`, duration: 100 }, '+=250'],
              ],
            }),
          ],
          animatables = configs.map(config => {
            return {
              instance: useAnimatable(logo),
              config
            }
          })

    // onMounted(() => {
    //   animatables.forEach(animatable => {
    //     const { config } = animatable
    //     animatable.instance.value.animate(config)
    //   })
    // })

    function handleMouseover () {
      // animatables[navigable.value.location].instance.value.play()
    }

    return {
      logo,
      // handleMouseover
    }
  }
}
</script>
