<template lang="html">
<ProseArticle title="Completable" updatedAt="Sun Oct 27 2019 18:26:00 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/md/logic/classes/Completable.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/logic/classes/Completable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
