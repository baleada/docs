const baleada = require('@baleada/tailwind-theme'),
      linearNumeric = require('@baleada/tailwind-linear-numeric'),
      defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  purge: {
    content: [
      'index.html',
      'src/App.vue',
      'src/components/**/*',
      'src/tests/**/*',
    ]
  },
  experimental: {
    applyComplexClasses: true,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    ...baleada,
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      display: ['Caveat', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...baleada.colors,
      gray: {
        ...linearNumeric({ only: 'colors' }).gray,
        '100': 'hsla(217, 30%, 8%, 1.0)',
        '75': 'hsla(218, 22%, 26%, 1.0)',
      },
      primary: { // horizon
        '10': 'hsla(242, 100%, 97%, 1.0)', // #F0F0FF
        '20': 'hsla(243, 94%, 90%, 1.0)',
        '30': 'hsla(243, 88%, 84%, 1.0)',
        '40': 'hsla(244, 84%, 75%, 1.0)',
        '50': 'hsla(245, 75%, 68%, 1.0)',
        '60': 'hsla(247, 61%, 60%, 1.0)', // #695BD7
        '70': 'hsla(248, 49%, 52%, 1.0)',
        '80': 'hsla(249, 41%, 42%, 1.0)',
        '90': 'hsla(251, 37%, 33%, 1.0)',
        '100': 'hsla(251, 33%, 20%, 1.0)',
      },
      'primary-gray': { // horizon-gray
        '10': 'hsla(223, 73%, 98%, 1.0)',
        '20': 'hsla(227, 66%, 93%, 1.0)',
        '30': 'hsla(229, 60%, 88%, 1.0)',
        '40': 'hsla(228, 55%, 80%, 1.0)',
        '50': 'hsla(230, 48%, 69%, 1.0)',
        '60': 'hsla(232, 38%, 56%, 1.0)',
        '70': 'hsla(233, 33%, 44%, 1.0)',
        '80': 'hsla(234, 32%, 33%, 1.0)',
        '85': 'hsla(235, 31%, 27%, 1.0)', // #30345C
        '90': 'hsla(236, 32%, 24%, 1.0)',
        '95': 'hsla(235, 32%, 19%, 1.0)',
        '100': 'hsla(234, 32%, 14%, 1.0)'
      },
    },
  },
}
