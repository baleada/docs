<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/theme/class-references/translate.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
