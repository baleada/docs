<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/theme-utils/functions/fractions.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
