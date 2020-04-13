const baleada = require('@baleada/tailwind-theme'),
      linearNumeric = require('@baleada/tailwind-linear-numeric'),
      { withoutColorPalettes } = require('@baleada/tailwind-theme-utils'),
      defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: true,
  theme: {
    ...baleada,
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      display: ['Caveat', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...withoutColorPalettes(baleada.colors),
      ...linearNumeric({ only: 'colors', increment: 100 }),
      gray: {
        ...linearNumeric({ only: 'colors', increment: 100 }).gray,
        '1000': 'hsla(217, 30%, 8%, 1.0)',
        '775': 'hsla(218, 22%, 26%, 1.0)',
      },
      primary: { // horizon
        '100': 'hsla(242, 100%, 97%, 1.0)',
        '200': 'hsla(243, 94%, 90%, 1.0)',
        '300': 'hsla(243, 88%, 84%, 1.0)',
        '400': 'hsla(244, 84%, 75%, 1.0)',
        '500': 'hsla(245, 75%, 68%, 1.0)',
        '600': 'hsla(247, 61%, 60%, 1.0)',
        '700': 'hsla(248, 49%, 52%, 1.0)',
        '800': 'hsla(249, 41%, 42%, 1.0)',
        '900': 'hsla(251, 37%, 33%, 1.0)',
        '1000': 'hsla(251, 33%, 20%, 1.0)',
      },
      'primary-gray': { // horizon-gray
        '100': 'hsla(223, 73%, 98%, 1.0)',
        '200': 'hsla(227, 66%, 93%, 1.0)',
        '300': 'hsla(229, 60%, 88%, 1.0)',
        '400': 'hsla(228, 55%, 80%, 1.0)',
        '500': 'hsla(230, 48%, 69%, 1.0)',
        '600': 'hsla(232, 38%, 56%, 1.0)',
        '700': 'hsla(233, 33%, 44%, 1.0)',
        '800': 'hsla(234, 32%, 33%, 1.0)',
        '850': 'hsla(235, 31%, 27%, 1.0)', // #30345C
        '900': 'hsla(236, 32%, 24%, 1.0)',
        '950': 'hsla(235, 32%, 19%, 1.0)',
        '1000': 'hsla(234, 32%, 14%, 1.0)'
      },
    },
  },
  variants: defaultConfig.variants
}
