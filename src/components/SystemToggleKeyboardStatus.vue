<template>
  <div class="flex">
    <button
      :ref="selectingButton.root.ref()"
      class="btn btn-4 rounded-r-0 ring-sh-2-gray-30 dork:ring-primary-100"
      :class="{
        'bg-gray-30 dork:bg-primary-100 dork:text-primary-30': is.selecting(),

      }"
    >
      Default mode
    </button>
    <button
      :ref="focusingButton.root.ref()"
      class="btn btn-4 rounded-l-0 ring-sh-2-gray-30 dork:ring-primary-100"
      :class="{
        'bg-gray-30 dork:bg-primary-100 dork:text-primary-30': is.focusing(),
      }"
    >
      "Add to Selection" mode
    </button>
  </div>
</template>

<script setup lang="tsx">
import { watch } from 'vue'
import type { Listbox, Grid, Button } from '@baleada/vue-features'
const props = defineProps<{
  selectingButton: Button,
  focusingButton: Button,
  selecting: (Listbox | Grid)['selecting'],
  focusing: (Listbox | Grid)['focusing'],
  is: (Listbox | Grid)['is'],
}>()

let selectedWasPressed = false
watch(
  props.selectingButton.press,
  () => {
    if (focusingWasPressed || selectedWasPressed) return
    selectedWasPressed = true
    props.selecting()
  },
)
watch(
  props.selectingButton.release,
  () => {
    selectedWasPressed = false
    focusingWasPressed = false
  }
)

let focusingWasPressed = false
watch(
  props.focusingButton.press,
  () => {
    if (focusingWasPressed || selectedWasPressed) return
    focusingWasPressed = true
    props.focusing()
  },
)
watch(
  props.focusingButton.release,
  () => {
    selectedWasPressed = false
    focusingWasPressed = false
  }
)
</script>
