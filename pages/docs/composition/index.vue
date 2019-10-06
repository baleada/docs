<template lang="html">
<NiftyArticle title="What is Baleada Composition?" updatedAt="Tue Oct 01 2019 10:23:57 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/composition/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
