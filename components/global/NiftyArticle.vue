<script>
import metadata from '~/assets/json/metadata.json'

import useMarkdownit from '~/assets/js/useMarkdownit'

export default {
  layout: 'article',
  functional: true,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  head: () => ({
    title: 'Baleada - What is Baleada?',
  }),
  render (h, { props: { title }, data: { attrs, on, class: className, style, ref, key, slot } }) {
    const body = metadata.find(article => article.title === title).body

    const md = useMarkdownit()

    return h('section', {
      attrs,
      on,
      class: className,
      ref,
      key,
      slot,
      domProps: {
        innerHTML: md.render(body)
      },
    })
  }
}
</script>
