<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/logic/api-design.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
