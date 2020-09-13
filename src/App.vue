<template>
  <Nav />
  <RouterView/>
</template>

<script>
import Nav from './Nav.vue'

export default {
  name: 'App',
  components: {
    Nav,
  },
}
</script>
