<template lang="html">
<ProseArticle title="Roadmap" updatedAt="Mon Oct 14 2019 16:21:56 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/md/roadmap.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/roadmap.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
