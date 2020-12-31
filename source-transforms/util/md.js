import { configureable } from '@baleada/prepare'

export default configureable('markdownit')
  .html()
  .linkify()
  .highlight('refractorRehypeWithEscapedVueMustache')
  .proseContainer({ template: 'vue' })
  .spaLinks({ spa: 'vue' })
  .linkAttributes({ attrs: { rel: 'noopener' } })
  .configure()
