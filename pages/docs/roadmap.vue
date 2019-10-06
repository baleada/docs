<template lang="html">
<NiftyArticle title="Roadmap" updatedAt="Sun Oct 06 2019 17:04:54 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/roadmap.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
