import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContext } from '@baleada/vue-prose'

export default function createProseContext (articleRef) {
  const route = useRoute(),
        fullPath = computed(() => route.fullPath),
        defaultProps = {
          article: {
            scrollableContainer: computed(() => articleRef.value ?? document)
          },
          blockquote: {
            readerCanTweet: true,
            tweetVia: 'BaleadaToolkit',
            tweetUrl: 'current',
          },
          codeblock: {
            readerCanCopy: true,
          },
          heading: {
            classes: '',
            readerCanCopy: true,
          },
        }

  return useContext(
    { fullPath, defaultProps },
  )
}
