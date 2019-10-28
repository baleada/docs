<template lang="html">
<ProseArticle title="API design" updatedAt="Sun Oct 27 2019 22:05:49 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/md/logic/api-design.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/logic/api-design.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
