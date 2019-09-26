<template lang="html">
  <aside class="nifty-aside" :class="[`aside-${type}`]">
    <div>
      <div v-if="type === 'info'" class="aside-icon">
        <EvaInfo :class="'fill-current'"/>
      </div>
      <div v-if="type === 'warning'" class="aside-icon">
        <EvaAlertTriangle :class="'fill-current'"/>
      </div>
      <div v-if="type === 'danger'" class="aside-icon">
        <EvaFlash :class="'fill-current'"/>
      </div>
      <div v-if="type === 'success'" class="aside-icon">
        <EvaAward :class="'fill-current'"/>
      </div>
    </div>
    <div ref="nifty">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import useNifty from '~/assets/js/useNifty'

import { EvaInfo } from '@baleada/icons/vue'
import { EvaAlertTriangle } from '@baleada/icons/vue'
import { EvaFlash } from '@baleada/icons/vue'
import { EvaAward } from '@baleada/icons/vue'

export default {
  components: {
    EvaInfo,
    EvaAlertTriangle,
    EvaFlash,
    EvaAward,
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        return ['info', 'warning', 'danger', 'success'].indexOf(value) !== -1;
      }
    }
  },
  setup() {
    const nifty = useNifty()

    return {
      nifty
    }
  },
}
</script>
