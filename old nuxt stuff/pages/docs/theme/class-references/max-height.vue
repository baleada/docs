<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/theme/class-references/max-height.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
