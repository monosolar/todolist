module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true
    }
  },
  plugins: [
    'react'
  ],
  env: {
    'browser': true,
    'node': true,
  },
  rules: { 
    'semi': [2, 'never'], 
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'max-len': [1, 120, 2, {ignoreComments: true}],
    'quote-props': [1, 'consistent-as-needed'],
    'no-cond-assign': [2, 'except-parens'],
    'radix': 0,
    'space-infix-ops': 0,
    'default-case': 0,
    'no-else-return': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'quotes': 0,
    'no-shadow': 0,
    'implicit-arrow-linebreak': 0
  },
}