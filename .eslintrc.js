module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'eslint:recommended'],
  env: {
    node: true,
    jest: true,
    es6: true,
    browser: true
  },
  plugins: ['react', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    quotes: [2, 'single'],
    'arrow-parens': 0,
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': 0,
    'no-console': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    'max-len': 0,
    'import/first': 0,
    'import/no-unresolved': 2,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-named-as-default': 0,
    'jsx-tag-spacing': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-for': 2,
    'react/jsx-filename-extension': 0,
    'react/require-extension': 0,
    'react/destructuring-assignment': 0,
    'react/require-default-props': 0,
    'react/no-unused-state': 0,
    'react/require-render-return': 0,
    'react/jsx-tag-spacing': 0,
    'react/jsx-indent': 0,
    'react/button-has-type': 0,
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'prefer-template': 0,
    'react/prefer-stateless-function': [
      0,
      {
        ignorePureComponents: true
      }
    ],
    semi: 0,
    'array-callback-return': 0
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.config.dev.js'
      },
      node: {
        paths: ['src']
      }
    }
  }
};
