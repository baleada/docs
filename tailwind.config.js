const { configureable } = require('@baleada/prepare')

module.exports = configureable('tailwindcss')
  .important()
  .purge([
    'index.html',
    'src/App.vue',
    'src/components/**/*',
    'src/styles/**/*',
  ])
  .baleada()
  .theme(({ defaultConfig }) => ({
    fontFamily: {
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      mono: ['Inconsolata', ...defaultConfig.theme.fontFamily.mono],
      display: ['Caveat', ...defaultConfig.theme.fontFamily.sans],
    },
  }))
  .theme.extend(({ linearNumeric }) => ({
    colors: {
      gray: {
        ...linearNumeric({ only: 'colors', increment: '10' }).blueGray,
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
    minWidth: {
      '1': '20rem',
      '4': '32rem',
      '5': '36rem',
    },
  }))
  .variants.extend({
    boxShadow: ['active'],
    scale: ['active'],
  })
  .forms()
  .plugin(({ addComponents }) => addComponents({
    '.icon': apply('h-full w-full fill-current'),
  }))
  .plugin(({ addComponents }) => addComponents({
    '.btn-lg': apply('px-4 py-3 text-5'),
    '.btn': apply('flex items-center space-x-2 px-2 py-1 rounded-4 text-3'),
    '.icon-btn': apply('h-em-1 w-em-1'),
    '.btn-raised': apply('shadow-4 hover:shadow-5 active:shadow-4'),
    '.btn-grows': apply('scale-100 hover:scale-110 active:scale-100 transform'),
    '.btn-red-weak': apply('bg-red-10 text-red-90'),
    '.btn-red-strong': apply('bg-red-70 text-red-10'),
    '.btn-blue-weak': apply('bg-blue-10 text-blue-90'),
    '.btn-blue-strong': apply('bg-blue-80 text-blue-10'),
    '.btn-green-weak': apply('bg-green-10 text-green-90'),
    '.btn-green-strong': apply('bg-green-70 text-green-10'),
    '.btn-amber-weak': apply('bg-amber-10 text-amber-90'),
    '.btn-amber-strong': apply('bg-amber-80 text-amber-10'),
    '.btn-gray-weak': apply('bg-gray-10 text-gray-90'),
    '.btn-gray-strong': apply('bg-gray-90 text-gray-10'),
    '.form': apply('shadow-0 border-0 ring-2 focus:ring-3 transition'),
  }))
  .configure()

function apply (classes) {
  return {
    [`@apply ${classes}`]: {}
  }
}
