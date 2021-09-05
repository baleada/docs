<template>
  <svg
    version="1.1"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        :x1="x[1]"
        :x2="x[2]"
        :y1="y[1]"
        :y2="y[2]"
      >
        <stop
          v-for="(stop, index) in stops"
          :key="index"
          :offset="`${stop.offset}%`"
          :class="stop.classes"
          :style="stop.styles"
          :stop-opacity="stop.opacity"
          stop-color="currentColor"
        />
      </linearGradient>
    </defs>

    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      :fill="`url(#${gradientId})`"
    />
  </svg>
</template>

<script lang="ts">
import { PropType } from "@vue/runtime-core";

export type Stop = {
  offset: number,
  opacity: number,
  classes: string,
  styles: { [key: string]: any },
}

export default {
  name: 'BrandRectangleGradient',
  props: {
    gradientId: {
      type: String,
      required: true,
    },
    stops: {
      type: Array as PropType<Stop[]>,
      default: () => {
        return [
          { offset: 0, classes: 'text-white' },
          { offset: 100, classes: 'text-black' },
        ]
      }
    },
    x: {
      type: Object as PropType<{ 1: number, 2: number }>,
      default: () => { return { 1: 0, 2: 1 } },
    },
    y: {
      type: Object as PropType<{ 1: number, 2: number }>,
      default: () => { return { 1: 0, 2: 1 } },
    }
  },
}
</script>
