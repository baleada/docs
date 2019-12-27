<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/markdown-it-spa-links/index.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
