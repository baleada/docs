import getTransform from '@baleada/markdown-to-prose'
import propsInterfaces from '@baleada/vue-prose/lib/propsInterfaces'
import MarkdownItSpaLinks from '@baleada/markdown-it-spa-links'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import refractor from 'refractor'
import rehype from 'rehype'
import purgecssConfig from './config/purgecss.config'
import headConfig from './config/head.config'

//  import GenerateMetafilesPlugin from './scripts/webpack-plugins/generateMetafiles'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: headConfig.description },
      { hid: 'keywords', name: 'keywords', content: headConfig.keywords.join(',') },
      { hid: 'author', name: 'author', content: headConfig.author },
      { hid: 'generator', name: 'generator', content: 'Nuxt.js' },
      { hid: 'robots', name: 'robots', content: headConfig.robots }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ],
    bodyAttrs: {
      class: 'bg-gray-100 antialiased font-sans overflow-x-hidden w-full'
    }
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/global-components',
    '~/plugins/example-components',
    '~/plugins/prose',
    '~/plugins/vue-composition-api',
    // '~/plugins/icons.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // 'portal-vue/nuxt',
    'nuxt-purgecss',
    // '@nuxtjs/markdownit'
  ],

  purgeCSS: {
    mode: () => 'postcss',
    // enabled: true,
    ...purgecssConfig
  },

  // markdownit: markdownitConfig,

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        tailwindcss: './tailwind.config.js',
        autoprefixer: {}
      }
    },
    extend: config => {
      function escapeRawVueExpression (str) {
        return str.replace(/({{|}})/g, '<span>$1</span>')
      }

      const transform = getTransform({ templateType: 'vue', propsInterfaces }, {
        markdownIt: {
          html: true,
          linkify: true,
          highlight: (code, lang) => {
            try {
              const children = refractor.highlight(code, lang),
                    html = rehype()
                      .stringify({ type: 'root', children })
                      .toString()
              return escapeRawVueExpression(html)
            } catch (error) {
              return ''
            }
          },
          plugins: [
            [MarkdownItSpaLinks, { spa: 'nuxt' }],
            [MarkdownItLinkAttributes, { attrs: { rel: 'noopener' } }],
          ],
        },
        before: ({ frontMatter: { title }, stats }) => `\n\
:::\n\
# ${title}\n\
:::\n\
\n\
<DocsArticleStats />\n\
\n\
<DocsMeta />\n\
\n\
`,
        after: ({ filePath }) => `\n\
<DocsAdjacentArticleLinks />\n\
<DocsArticleEdit />\n\
\n\
`
      }),
            prose = {
              loader: '@baleada/webpack-source-transform',
              options: {
                transform: ({ source, id }) => transform(source, id)
              }
            }

      config.module.rules.push({
        test: /\.prose$/,
        oneOf: [
          {
            use: [
              'vue-loader',
              prose,
            ]
          }
        ]
      })
    },
  },
  watchers: {
    chokidar: {
      ignoreInitial: true,
      ignored: [
        'pages/docs',
        'assets/json/**/*.json',
        'node_modules',
      ]
    },
    webpack: {
      ignored: [
        'pages/docs',
        'assets/json/**/*.json',
        'node_modules',
      ]
    }
  }
}
