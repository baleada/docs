<template functional>
  <svg
    version="1.1"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    preserveAspectRatio="none"
    v-bind="data.attrs"
    v-on="listeners"
    :class="data.class"
    :ref="data.ref"
    :key="data.key"
    :slot="data.slot"
  >
    <defs>
      <linearGradient :id="props.gradientId" :x1="props.x[1]" :x2="props.x[2]" :y1="props.y[1]" :y2="props.y[2]">
        <stop
          v-for="(stop, index) in props.stops"
          :key="index"
          :offset="`${stop.offset}%`"
          :class="stop.classes"
          :style="stop.styles"
          :stop-opacity="stop.opacity"
          stop-color="currentColor" />
      </linearGradient>
    </defs>

    <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${props.gradientId})`"/>
  </svg>
</template>

<script>

function isValidCoordinate(value) {
  return typeof value === 'number' || value === undefined || value === null
}

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
      validator: (value) => isValidCoordinate(value[1]) && isValidCoordinate(value[2])
    },
    y: {
      type: Object,
      default: () => { return { 1: 0, 2: 1 } },
      validator: (value) => isValidCoordinate(value[1]) && isValidCoordinate(value[2])
    }
  },
}
</script>
