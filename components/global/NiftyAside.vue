<template functional>
  <div class="alert" :class="[`alert-${type}`]">
    <div>
      <div v-if="type === 'info'" class="alert-icon">
        <EvaInfo />
      </div>
      <div v-if="type === 'warning'" class="alert-icon">
        <EvaAlertTriangle />
      </div>
      <div v-if="type === 'danger'" class="alert-icon">
        <EvaFlash />
      </div>
      <div v-if="type === 'success'" class="alert-icon">
        <EvaAward />
      </div>
    </div>
    <div>
      <!-- TODO: Figure out how to inject markdown -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>
