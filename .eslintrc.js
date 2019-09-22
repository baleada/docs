module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': 'off',
    'no-console': 'off',
    'arrow-parens': 'off',
    'one-var': ['error', 'consecutive'],
    'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'always',
        'asyncArrow': 'always'
    }],
    'indent': ['error', 2, {
      'VariableDeclarator': 'first',
      'MemberExpression': 'off',
    }],
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true,
    }],
  }
}
