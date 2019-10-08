<template lang="html">
<NiftyArticle title="Syncable" updatedAt="Mon Oct 07 2019 17:36:46 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Syncable.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/classes/Syncable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
