<template>
  <div class="flex-col/5">
    <div v-if="variant === 'dynamic'" class="flex center-all-x min-h-full">
      <SystemToggleKeyboardStatus
        :selectingButton="selecting"
        :focusingButton="focusing"
        :selecting="listbox.selecting"
        :focusing="listbox.focusing"
        :is="listbox.is"
      />
    </div>
    <span class="sr-only" :ref="label.ref()">
      Mulago Foundation portfolio
    </span>
    <span
      v-if="variant === 'described'"
      class="sr-only"
      :ref="description.ref()"
    >
      Select the organization you want to donate to
    </span>
    <ul
      :ref="listbox.root.ref({
        labelledBy: label.id.value,
        ...(variant === 'described' && {
          describedBy: description.id.value,
        }),
      })"
      class="
        mt-0 max-h-24 overflow-y-scroll
        ring-sh-2-gray-30 dork:ring-primary-gray-100
        rounded-3 list-none scrollbar-hide select-none whitespace-nowrap
      "
      :class="[
        variant === 'configured'
          ? 'flex overflow-x-scroll'
          : 'flex-col overflow-y-scroll',
      ]"
    >
      <li
        v-for="(name, index) in options"
        :ref="listbox.options.ref(index, { ability: ability[index] })"
        class="
          mt-0 before:content-['']
          text-4
          focus:outline-none
          focus:bg-gray-20 dork:focus:bg-primary-gray-100
        "
        :class="[
          variant === 'configured'
            ? 'p-3 flex-col-reverse/2 center-all-x'
            : 'flex/2 center-all-y px-2 py-1.5',
          listbox.is.disabled(index)
            ? `
              text-gray-60 dork:text-gray-50
              bg-gray-10 dork:bg-primary-gray-130
              cursor-not-allowed
            `
            : `
              text-gray-90 dork:text-gray-40
              hover:bg-gray-20  dork:hover:bg-primary-gray-100
            `
        ]"
      >
        <span v-if="variant === 'configured'">{{ listbox.is.disabled(index) ? '(disabled)' : '' }}</span>
        <div class="flex/2">
          <div class="relative">
            <OcticonsCheck16
              aria-hidden="true"
              class="text-primary-70 transition duration-1"
              :class="[
                listbox.is.selected(index) && !listbox.is.disabled(index)
                  ? 'opacity-1 scale-100'
                  : 'opacity-0 scale-[92%]',
              ]"
            />
            <OcticonsCircleSlash16
              aria-hidden="true"
              class="absolute center text-gray-40 dork:text-gray-50 transition duration-1"
              :class="[
                listbox.is.disabled(index)
                  ? 'opacity-1 scale-100'
                  : 'opacity-0 scale-[92%]',
              ]"
            />
          </div>
        </div>
        <span>{{ name }}</span>
        <span v-if="variant !== 'configured'">{{ listbox.is.disabled(index) ? '(disabled)' : '' }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="tsx">
import { names } from '@alexvipond/mulago'
import {
  useListbox,
  useElementApi,
  useButton,
} from '@baleada/vue-features'
import OcticonsCheck16 from '@octicons/check-16.svg'
import OcticonsCircleSlash16 from '@octicons/circle-slash-16.svg'
import SystemToggleKeyboardStatus from './SystemToggleKeyboardStatus.vue'

const props = defineProps<{
 variant: (
  | 'default'
  | 'described'
  | 'configured'
  | 'dynamic'
 )
}>()

const options = names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
      listbox = useListbox({
        multiselectable: true,
        disabledOptionsReceiveFocus: false,
        loops: true,
        ...(props.variant === 'configured' && {
          orientation: 'horizontal',
          disabledOptionsReceiveFocus: true,
          clears: false,
          initialSelected: 0,
          loops: false,
        }),
      }),
      label = useElementApi({ identifies: true }),
      description = useElementApi({ identifies: true }),
      selecting = useButton(),
      focusing = useButton(),
      ability = options.map((_, index) => index % 4 === 0 ? 'disabled' : 'enabled')
</script>
