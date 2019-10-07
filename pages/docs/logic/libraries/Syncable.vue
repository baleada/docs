<template lang="html">
<NiftyArticle title="Syncable" updatedAt="Sun Oct 06 2019 20:42:49 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/libraries/Syncable.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/libraries/Syncable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
