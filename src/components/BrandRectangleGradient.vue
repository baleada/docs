<template>
  <svg
    version="1.1"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    preserveAspectRatio="none"
    v-bind="data.attrs"
    v-on="listeners"
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

<script>
export default {
  props: {
    gradientId: {
      type: String,
      required: true,
    },
    stops: {
      type: Array,
      default: () => {
        return [
          { offset: 0, classes: 'text-white' },
          { offset: 100, classes: 'text-black' },
        ]
      }
    },
    x: {
      type: Object,
      default: () => { return { 1: 0, 2: 1 } },
    },
    y: {
      type: Object,
      default: () => { return { 1: 0, 2: 1 } },
    }
  },
}
</script>
