<template lang="html">
<NiftyArticle title="Completable" updatedAt="Sun Oct 06 2019 17:15:27 GMT-0600 (CST)">
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
