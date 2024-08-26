<template>
  <div class="flex">
    <button
      :ref="selectingButton.root.ref()"
      class="btn btn-4 rounded-r-0 ring-sh-2-primary-20 dork:ring-primary-100"
      :class="{
        'bg-primary-20 text-primary-120 dork:bg-primary-100 dork:text-primary-30': is.selecting(),

      }"
    >
      Default mode
    </button>
    <button
      :ref="focusingButton.root.ref()"
      class="btn btn-4 rounded-l-0 ring-sh-2-primary-20 dork:ring-primary-100"
      :class="{
        'bg-primary-20 text-primary-120 dork:bg-primary-100 dork:text-primary-30': is.focusing(),
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

watch(
  props.selectingButton.firstPressDescriptor,
  props.selecting,
)

watch(
  props.focusingButton.firstPressDescriptor,
  props.focusing,
)
</script>
