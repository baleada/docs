<template lang="html">
<NiftyArticle title="Completable" updatedAt="Sun Oct 06 2019 17:42:09 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/libraries/Completable.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/libraries/Completable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
