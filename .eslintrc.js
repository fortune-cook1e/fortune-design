const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  env: {
    browser: true,
    es6: true,
    mocha: true
  },
  globals: {
    JSX: true,
    COMPONENTS: true
  },
  plugins: ['import', 'react', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-implicit-coercion': OFF,
    'max-params': OFF,

    'simple-import-sort/imports': ERROR,
    'simple-import-sort/exports': ERROR,

    // typescript-eslint
    '@typescript-eslint/consistent-type-definitions': OFF
  }
}
