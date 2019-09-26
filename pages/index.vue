<template lang="html">
  <main class="h-screen flex flex-col items-center justify-center px-10">
    <BaleadaLogo
      ref="logo"
      :class="'-ml-2 h-13 w-13 sm:h-14 sm:w-14 md:h-15 md:w-15 text-primary-100'"
      :hasShadow="true"
      @mouseover="handleLogoMouseover"
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
import { ref, computed, watch, onMounted } from '@vue/composition-api'

import useAnimatable from '../assets/js/baleada/composition/useAnimatable'
import useNavigable from '../assets/js/baleada/composition/useNavigable'

import { EvaBook } from '@baleada/icons/vue'
import { SimpleGitLab } from '@baleada/icons/vue'

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
    /* Set up reactive data */
    const logoAnimations = [
            // Wiggle
            {
              speed: 0.5,
              direction: 'alternate',
              loop: 6,
              children: [
                { rotate: '12deg', easing: 'linear', duration: 70 },
              ],
            },

            // Spin
            {
              speed: 0.5,
              children: [
                { rotate: '360deg' },
              ],
            },

            // Toss up and bounce
            {
              speed: 0.5,
              children: [
                { translateY: '-30%', easing: 'easeOutBack', duration: 200 },
                { translateY: 0, easing: 'easeOutElastic(1, .3)' }
              ]
            },

            // Wind up and spin
            {
              speed: 0.5,
              children: [
                { rotate: '-42deg', easing: 'easeInBack', duration: 200 },
                [{ rotate: `360deg` }, '+=200'],
              ],
            },
          ],
          navigable = useNavigable(logoAnimations),
          logoAnimationIndex = ref(0),
          onComplete = (anim, set) => {
            const target = anim.children[0].animatables[0].target
            set(target, { rotate: '0deg' })
            navigable.next()
            console.log(navigable.location)
          },
          currentAnimation = computed(() => navigable.array[navigable.location]),
          animation = computed(() => {
            return ({ set }) => {
              return {
                autoplay: false,
                complete: (anim) => onComplete(anim, set),
                direction: currentAnimation.value.direction,
                loop: currentAnimation.value.loop
              }
            }
          }),
          timelineChildren = computed(() => currentAnimation.value.hasOwnProperty('children') ? currentAnimation.value.children : undefined),
          options = computed(() => ({
            speed: currentAnimation.value.speed,
            animation: animation.value,
            timelineChildren: timelineChildren.value
          }))

    /* Create and update animatable */
    const logo = ref(null)
    let animatable = {}
    onMounted(() => {
      animatable = useAnimatable(logo.value, options.value)
    })
    watch(() => {
      animatable = useAnimatable(logo.value, options.value)
    })

    function handleLogoMouseover () {
      animatable.play()
    }

    return {
      logo,
      animatable,
      handleLogoMouseover
    }
  }
}
</script>
