<template>

</template>

<script>
import { getCurrentInstance, onMounted } from '@vue/composition-api'

export default {
  props: {
    tags: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const vm = getCurrentInstance()
      vm.head = () => { title: 'What is Baleada?' }
  },
}
</script>
