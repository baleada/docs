import pkg from './package'
import purgecssConfig from './config/purgecss.config'
import headConfig from './config/head.config'
import markdownitConfig from './config/markdownit.config'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'keywords', name: 'keywords', content: pkg.keywords },
      { hid: 'author', name: 'author', content: pkg.author },
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
      class: 'bg-gray-100 antialiased font-sans overflow-x-hidden'
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
    '~/plugins/vue-hooks',
    '~/plugins/vue-composition-api',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
    'nuxt-purgecss',
    '@nuxtjs/markdownit'
  ],

  purgeCSS: {
    mode: () => 'postcss',
    // enabled: true,
    ...purgecssConfig
  },

  markdownit: markdownitConfig,

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
  }
}
