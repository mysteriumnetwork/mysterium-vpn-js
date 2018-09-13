module.exports = {
  parser: 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'standard',
    'plugin:flowtype/recommended'
    ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  plugins: [
    'flowtype',
    'filenames'
  ],
  'rules': {
    'no-unused-expressions': 0,
    // overwrite file naming rules to support 2 dots simbols in file name (ex:  file-name.js)
    'filenames/match-regex': [2, '^[a-z-]+.+$', true],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    "no-restricted-globals": ['error', 'event'],
    'no-console': ['error'],
    // strict file names rules (ex: 'file-name.js')
    "max-len": ["error", { "code": 120 }],
    'object-curly-spacing': [2, 'always']
  }
}
