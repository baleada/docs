<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/prose/components/layout.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
