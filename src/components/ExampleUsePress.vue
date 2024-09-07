<template>
  <p>
    Press anywhere to start, or use <code>Tab</code> to focus the element, and <code>Enter</code> or <code>Space</code> to descriptor.
  </p>
  <div
    :ref="element.ref()"
    tabindex="0"
    class="
      swiper-no-swiping
      relative mx-auto w-full with-max-w with-mt h-26 
      ring-sh-2-gray-40 dork:ring-primary-gray-100
      rounded-6 overflow-hidden touch-none
    "
  >
    <div class="text-3 absolute top-2 left-2 pointer-events-none select-none flex flex-col gap-1">
      <div v-if="isDenied">Canceled by mouseout</div>
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 text-inherit"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <code>{{ press.descriptor.value?.metadata?.duration ?? 0 }}ms</code>
      </div>
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="d-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
          />
        </svg>
        <code>
          {{
            decimalFormatter.format(
              Math.round(((press.descriptor.value?.metadata as MousepressMetadata | TouchpressMetadata)?.velocity ?? 0) * 100) / 100 || 0
            )
          }}px/ms
        </code>
      </div>
    </div>
    <div
      class="absolute w-2.5 h-2.5 bg-primary-90 dork:bg-gray-40 rounded-full -translate-x-1/2 -translate-y-1/2"
      :style="{
        top: `${((press.descriptor.value?.metadata as MousepressMetadata | TouchpressMetadata)?.points?.start?.y ?? 0) - (boundingClientRect.top ?? 0) || -100}px`,
        left: `${((press.descriptor.value?.metadata as MousepressMetadata | TouchpressMetadata)?.points?.start?.x ?? 0) - (boundingClientRect.left ?? 0) || -100}px`,
      }"
    >
      <div class="absolute top-1/2 left-1/2 -translate-y-1/2 w-6">
        <div
          class="w-full origin-left flex items-center justify-end"
          :style="{
            transform: `rotate(-${(press.descriptor.value?.metadata as MousepressMetadata | TouchpressMetadata)?.angle?.fromStart?.degrees ?? 0}deg)`,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="absolute w-8 h-8 sm:w-4 sm:h-4 bg-rose-400 rounded-full -translate-x-1/2 -translate-y-1/2"
      :style="{
        top: `${((press.descriptor.value?.metadata as MousepressMetadata | TouchpressMetadata)?.points?.end?.y ?? 0) - (boundingClientRect.top ?? 0) || -100}px`,
        left: `${((press.descriptor.value?.metadata as MousepressMetadata | TouchpressMetadata)?.points?.end?.x ?? 0) - (boundingClientRect.left ?? 0) || -100}px`,
      }"
    />
  </div>
  <p>
    Metadata used in this example includes press duration, velocity, and angle.
  </p>
</template>

<script setup lang="tsx">
import { ref, watch } from 'vue'
import {
  useElementApi,
  usePress,
} from '@baleada/vue-features'
import type { MousepressMetadata, TouchpressMetadata } from '@baleada/logic'

const element = useElementApi()
const boundingClientRect = ref<DOMRect>({} as DOMRect)
const press = usePress(
  element.element,
  {
    mouse: {
      onDown: () => {
        isDenied.value = false
        boundingClientRect.value = element.element.value.getBoundingClientRect()
      },
      onOut: () => {
        // isDenied.value = press.status.value !== 'released'
      },
    },
    touch: {
      onStart: () => {
        isDenied.value = false
        boundingClientRect.value = element.element.value.getBoundingClientRect()
      },
    },
    keyboard: {
      onDown: () => isDenied.value = false,
    }
  }
)

const isDenied = ref(false)

const decimalFormatter = new Intl.NumberFormat(
  'en-US',
  { style: 'decimal', minimumSignificantDigits: 2 }
)

watch(
  press.status,
  status => {
    if (status !== 'released') return
    isDenied.value = false
  },
)
</script>
