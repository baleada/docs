const defaultTheme = require('tailwindcss/defaultTheme')

function fractions (unit) {
  const suffix = unit === '%' ? '' : '-screen',
        fractions = [
          '1/2',
          '1/3',
          '2/3',
          '1/4',
          '2/4',
          '3/4',
          '1/5',
          '2/5',
          '3/5',
          '4/5',
          '1/6',
          '2/6',
          '3/6',
          '4/6',
          '5/6',
          '1/12',
          '2/12',
          '3/12',
          '4/12',
          '5/12',
          '6/12',
          '7/12',
          '8/12',
          '9/12',
          '10/12',
          '11/12',
        ],
        fractionScale = fractions.reduce(
          (scale, fraction) => ({
            ...scale,
            [`${fraction}${suffix}`]: `calc(${fraction} * 100${unit})`,
          }),
          {}
        )

  return {
    ...fractionScale,
    [unit === '%' ? 'full' : 'screen']: `100${unit}`,
  }
}

const screenWidthUtilities = (defaultTheme) => ({
  'sm-screen': defaultTheme.screens.sm,
  'md-screen': defaultTheme.screens.md,
  'lg-screen': defaultTheme.screens.lg,
  'xl-screen': defaultTheme.screens.xl,
})

module.exports = {
  theme: {
    fontFamily: {
      sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
      mono: ['Fira Mono', ...defaultTheme.fontFamily.mono],
      display: ['Caveat', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      ...defaultTheme.colors,
      current: 'currentColor',
      inherit: 'inherit',
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
        '100': 'hsla(242, 35%, 97%, 1.0)',
        '200': 'hsla(243, 33%, 90%, 1.0)',
        '300': 'hsla(243, 31%, 84%, 1.0)',
        '400': 'hsla(244, 29%, 75%, 1.0)',
        '500': 'hsla(245, 26%, 68%, 1.0)',
        '600': 'hsla(247, 21%, 60%, 1.0)',
        '700': 'hsla(248, 17%, 52%, 1.0)',
        '800': 'hsla(249, 14%, 42%, 1.0)',
        '900': 'hsla(251, 13%, 33%, 1.0)',
        '1000': 'hsla(251, 12%, 20%, 1.0)',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    spacing: {
      px: '1px',
      '2px': '2px',
      '4px': '4px',
      '8px': '8px',
      '1/4em': '0.25em',
      '1/2em': '.5em',
      '1em': '1em',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '2rem',
      '8': '2.5rem',
      '9': '3rem',
      '10': '4rem',
      '11': '5rem',
      '12': '6rem',
      '13': '8rem',
      '14': '10rem',
      '15': '12rem',
      '16': '14rem',
      '17': '16rem',
      '18': '20rem',
      '19': '24rem',
    },
    borderRadius: {
      '0': '0',
      default: '0.125rem',
      '1': '0.25rem',
      '2': '0.5rem',
      full: '9999px'
    },
    borderWidth: {
      '0': '0',
      default: '1px',
      '1': '1.5px',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    },
    boxShadow: {
      '0': 'none',
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '1': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      '2': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '3': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '4': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '-': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)'
    },
    fontSize: {
      '1': '0.75rem',
      '2': '0.875rem',
      '3': '1rem',
      '4': '1.125rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.875rem',
      '8': '2.25rem',
      '9': '3rem',
      '10': '4rem'
    },
    fontWeight: {
      '100': '100',
      '200': '200',
      '300': '300',
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
      '800': '800',
      '900': '900'
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      ...fractions('%'),
      ...fractions('vh')
    }),
    letterSpacing: {
      '-2': '-0.05em',
      '-1': '-0.025em',
      '0': '0',
      '1': '0.025em',
      '2': '0.05em',
      '3': '0.1em'
    },
    lineHeight: {
      '0': '1',
      '1': '1.25',
      '2': '1.375',
      '3': '1.5',
      '4': '1.625',
      '5': '2'
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    maxHeight: theme => ({
      ...fractions('%'),
      ...fractions('vh')
    }),
    maxWidth: theme => ({
      '1': '20rem',
      '2': '24rem',
      '3': '28rem',
      '4': '32rem',
      '5': '36rem',
      '6': '42rem',
      '7': '48rem',
      '8': '56rem',
      '9': '64rem',
      '10': '72rem',
      ...screenWidthUtilities(defaultTheme),
      ...fractions('%'),
      ...fractions('vw'),
    }),
    minHeight: theme => ({
      '0': '0',
      '550': '550px',
      ...screenWidthUtilities(defaultTheme),
      ...fractions('%'),
      ...fractions('vh')
    }),
    minWidth: theme => ({
      '0': '0',
      '1': '20rem',
      '2': '24rem',
      '3': '28rem',
      '4': '32rem',
      '5': '36rem',
      '6': '42rem',
      '7': '48rem',
      '8': '56rem',
      '9': '64rem',
      '10': '72rem',
      ...screenWidthUtilities(defaultTheme),
      ...fractions('%'),
      ...fractions('vw')
    }),
    width: theme => ({
      auto: 'auto',
      ...screenWidthUtilities(defaultTheme),
      ...theme('spacing'),
      ...fractions('%'),
      ...fractions('vw')
    }),
    inset: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    objectPosition: {
      ...defaultTheme.objectPosition,
      'center-top': 'center top',
      'center-bottom': 'center bottom',
    },
    opacity: {
      '0': '0',
      '10': '.10',
      '20': '.20',
      '25': '.25',
      '30': '.30',
      '33': '.33',
      '40': '.40',
      '50': '.50',
      '60': '.60',
      '67': '.67',
      '70': '.70',
      '75': '.75',
      '80': '.80',
      '90': '.90',
      '100': '1.00',
    },
    zIndex: {
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '60': '60',
      '70': '70',
      '80': '80',
      '90': '90',
      '100': '100',
    },
  },
  variants: ['responsive', 'group-hover', 'focus-within', 'hover', 'focus', 'active']
}
