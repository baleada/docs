<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/prose/components/codeblock.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
