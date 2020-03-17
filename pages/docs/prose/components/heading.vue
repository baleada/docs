<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/prose/components/heading.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
