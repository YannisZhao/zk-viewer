module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    "semi": 0,
    "quotes": 0,
    "indent": 0,
    "no-unused-vars": 0,
    "space-before-function-paren": 0,
    "space-in-parens": 0,
    "space-infix-ops": 0,
    "space-unary-ops": ["error", {"words": true, "nonwords": false}],
    "spaced-comment": "error",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
