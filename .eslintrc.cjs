/** @type import('haoma').ESLintConfig */
module.exports = require('haoma').getESLintConfig({
  plugins: ['node'],
  rules: {
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'node/file-extension-in-import': [
      'error',
      'always',
      {
        tryExtensions: ['.ts', '.js', '/index.ts', '/index.js'],
      },
    ],
  },
})
