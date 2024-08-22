<template>
  <div class="flex-col/5">
    <div v-if="variant === 'dynamic'" class="flex center-all-x min-h-full">
      <SystemToggleKeyboardStatus
        :selectingButton="selecting"
        :focusingButton="focusing"
        :selecting="grid.selecting"
        :focusing="grid.focusing"
        :is="grid.is"
      />
    </div>
    <div
      :ref="grid.root.ref()"
      class="
        mx-auto grid/3
        select-none
      "
    >
      <div
        v-for="(r, row) in data"
        :key="row"
        class="grid/3 grid-cols-6"
      >
        <div
          v-for="(c, column) in r"
          :ref="grid.cells.ref({ row, column })"
          class="
            relative d-11 flex center-all
            rounded-3
            ring-sh-2-gray-40 dork:ring-primary-gray-100
            focus:outline-none
            focus:bg-gray-20 dork:focus:bg-primary-gray-100
          "
          :class="[
            grid.is.superselected({ row, column }) && 'bg-gray-10 dork:bg-primary-gray-110',
          ]"
        >
          <OcticonsCheck16
            aria-hidden="true"
            class="text-primary-70 transition duration-1"
            :class="[
              grid.is.selected({ row, column })
                ? 'opacity-1 scale-100'
                : 'opacity-0 scale-[92%]',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { useGrid, useButton } from '@baleada/vue-features'
import SystemToggleKeyboardStatus from './SystemToggleKeyboardStatus.vue'
import OcticonsCheck16 from '@octicons/check-16.svg'

defineProps<{
 variant: (
  | 'default'
  | 'dynamic'
 )
}>()

const data = new Array(6).fill(new Array(6).fill(0)),
      grid = useGrid({
        multiselectable: true,
        initialKeyboardStatus: 'selecting',
      }),
      selecting = useButton(),
      focusing = useButton()
</script>
