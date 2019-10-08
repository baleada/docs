<template lang="html">
<NiftyArticle title="Navigable" updatedAt="Mon Oct 07 2019 21:55:25 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Navigable.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/classes/Navigable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
