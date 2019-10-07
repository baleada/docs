<template lang="html">
<NiftyArticle title="What is Baleada Icons?" updatedAt="Sun Oct 06 2019 17:58:27 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/icons/index.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/icons/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
