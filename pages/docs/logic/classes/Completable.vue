<template lang="html">
<NiftyArticle title="Completable" updatedAt="Mon Oct 07 2019 17:12:15 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Completable.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/classes/Completable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
