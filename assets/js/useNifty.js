import { ref, onMounted } from '@vue/composition-api'
import useNuxtMarkdownit from './useNuxtMarkdownit'

export default function useNifty (options = {}) {
  const postMd = options.postMd === undefined ? markup => markup : options.postMd,
        md = useNuxtMarkdownit(),
        nifty = ref(null)

  onMounted(() => {
    const markup = postMd(md.render(nifty.value.innerHTML))
    nifty.value.innerHTML = markup
  })

  return nifty
}
