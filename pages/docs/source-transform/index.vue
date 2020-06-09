<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/source-transform/index.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
