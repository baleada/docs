<template>
  <section>
    <input type="text" v-model="attribute" />
    <input type="text" v-model="value" />
    <span ref="example"></span>
    <pre><code>{{ html }}</code></pre>
  </section>
</template>

<script>
export default {
  setup () {
    const attribute = ref('ariaLabel'),
          value = ref('Example'),
          example = ref(null),
          html = computed(() => example.value?.outerHTML)
    
    return {
      attribute,
      value,
      html,
      example,
    }
  }
}
</script>
