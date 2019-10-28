import proseComponents from '@baleada/prose-loader/lib/stubs/proseComponents'

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
    '~/plugins/runtime',
    '~/plugins/vue-composition-api',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
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
      // config.plugins.push(new GenerateMetafilesPlugin())
      const replaceDelimiters = markup => markup.replace(/({{|}})/g, '<span>$1</span>'),
            prose = {
              loader: '@baleada/prose-loader',
              options: {
                components: proseComponents,
                postRender: markup => `<template lang="html"><section>${replaceDelimiters(markup)}</section></template>\n`
              }
            }

      config.module.rules.push({
        test: /\.md$/,
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
