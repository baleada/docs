// @ts-check
const { configureable } = require('@baleada/prepare')

const config = new configureable.Tailwindcss()
  .important()
  .content([
    'index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,md}',
    './source-transforms/util.ts'
  ])
  .future({
    hoverOnlyWhenSupported: true,
  })
  .theme(({ getLinearNumeric, defaultConfig, toTheme }) => ({
    ...getLinearNumeric(),
    colors: getLinearNumeric({ only: 'colors', increment: 10 }),
    fontFamily: {
      // @ts-expect-error
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      // @ts-expect-error
      mono: ['Fira Code', ...defaultConfig.theme.fontFamily.mono],
      // @ts-expect-error
      display: ['Caveat', ...defaultConfig.theme.fontFamily.sans],
    },
    ...toTheme.ancestorVariants(['minimalist', 'dork'])
  }))
  .extend(({ getLinearNumeric }) => ({
    colors: {
      // lake-effect
      primary: {
        '5': 'hsla(193, 83%, 95%, 1.0)', // #E8F8FD
        '10': 'hsla(196, 80%, 92%, 1.0)', // #DAF2FB
        '20': 'hsla(196, 77%, 85%, 1.0)', // #BBE6F6
        '30': 'hsla(197, 73%, 75%, 1.0)', 
        '40': 'hsla(199, 72%, 62%, 1.0)', // #58B8E4
        '50': 'hsla(201, 68%, 53%, 1.0)', 
        '60': 'hsla(202, 67%, 45%, 1.0)', 
        '70': 'hsla(204, 69%, 36%, 1.0)', 
        '80': 'hsla(205, 66%, 31%, 1.0)', // #1b5883
        '90': 'hsla(206, 63%, 26%, 1.0)', 
        '100': 'hsla(210, 62%, 20%, 1.0)', // #133353
        '110': 'hsla(209, 62%, 14%, 1.0)',
        '120': 'hsla(210, 62%, 10%, 1.0)', // #0A1A29
        '130': 'hsla(211, 64%, 8%, 1.0)',
        '140': 'hsla(210, 64%, 5%, 1.0)',
      },
      'primary-gray': {
        '5': 'hsla(196, 53%, 95%, 1.0)',
        '10': 'hsla(199, 50%, 92%, 1.0)',
        '20': 'hsla(199, 47%, 85%, 1.0)',
        '30': 'hsla(200, 43%, 75%, 1.0)',
        '40': 'hsla(202, 42%, 62%, 1.0)',
        '50': 'hsla(204, 38%, 53%, 1.0)',
        '60': 'hsla(205, 37%, 45%, 1.0)',
        '70': 'hsla(207, 39%, 36%, 1.0)',
        '80': 'hsla(208, 36%, 31%, 1.0)',
        '90': 'hsla(209, 33%, 26%, 1.0)',
        '100': 'hsla(213, 32%, 20%, 1.0)',
        '110': 'hsla(212, 32%, 14%, 1.0)',
        '120': 'hsla(213, 32%, 10%, 1.0)',
        '130': 'hsla(214, 34%, 8%, 1.0)',
        '140': 'hsla(213, 34%, 5%, 1.0)',
      },
      gray: {
        ...getLinearNumeric({ only: 'colors', increment: 10 }).slate,
        '110': 'hsla(216, 31%, 6%, 1.0)',
        '100': 'hsla(217, 30%, 8%, 1.0)',
        '75': 'hsla(218, 22%, 26%, 1.0)',
      },
    },
    letterSpacing: {
      '4': '0.25em',
    },
    transitionDuration: {
      DEFAULT: getLinearNumeric({ only: 'transitionDuration' })['3'],
    },
    minWidth: {
      '1': '20rem',
      '4': '32rem',
      '5': '36rem',
    },
    fontWeight: {
      '450': 450,
    },
  }))
  .forms()
  .ancestorVariants()
  .utilities()
  .plugin(require('tailwind-scrollbar-hide'))
  .customPlugin(({ addComponents, apply }) => {
    addComponents({
      '.btn': apply('flex/2 items-center rounded-4'),
      '.btn-4': apply('px-2 py-1 text-4'),
      '.btn-5': apply('px-3 py-2 text-5'),
      '.btn-6': apply('px-4 py-3 text-6'),
      '.btn-7': apply('px-4 py-3 text-7'),
      '.icon-btn': apply('h-[1em] w-[1em]'),
      '.btn-raised': apply('shadow-5 hover:shadow-6 active:shadow-5 transition duration-3'),
      '.btn-grows': apply('scale-100 hover:scale-110 active:scale-100 transform transition duration-3'),
      
      '.form': apply('shadow-0 border-0 ring-2 focus:ring-3 transition'),

      '.highlighted': apply(`
        inline pb-[0.0625rem] px-0.5 ring-2
        rounded-3
        text-primary-120 bg-primary-10 dork:text-primary-gray-20 dork:bg-primary-gray-100
        ring-primary-20 dork:ring-primary-80
      `),

      '.badge': apply(`
        px-2 py-1
        text-2 font-5 tracking-3 uppercase
        rounded-full
        bg-primary-20 text-primary-80
        dork:bg-primary-gray-90 dork:text-primary-gray-20
      `)
    })
  })
  .configure()

module.exports = config
