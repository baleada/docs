<template lang="html">
<div class="italic text-2">
  Last updated on {{ intl }}
</div>
</template>

<script>
export default {
  props: {
    timestamp: {
      type: String,
      required: true,
    }
  },
  setup ({ timestamp }) {
    const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          date = new Date(timestamp),
          intl = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    return {
      intl
    }
  }
}
</script>
