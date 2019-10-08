<template lang="html">
<NiftyArticle title="API design" updatedAt="Mon Oct 07 2019 19:48:22 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/api-design.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/api-design.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
