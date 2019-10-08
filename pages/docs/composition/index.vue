<template lang="html">
<NiftyArticle title="What is Baleada Composition?" updatedAt="Mon Oct 07 2019 00:01:57 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/composition/index.md">
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
