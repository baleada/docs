<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/spa-links/index.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
