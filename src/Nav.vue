<template>
  <ul class="flex space-x-4 space-y-4 mb-10 flex-wrap p-5">
    <li
      v-for="({ path }) in routes"
      :key="path"
      class="hover:underline text-blue-60"
    >
      <RouterLink :to="path">{{ path }}</RouterLink>
    </li>
  </ul>
</template>

<script>
import routes from './tests/routes'

export default {
  setup () {
    return { routes }
  }
}
</script>
