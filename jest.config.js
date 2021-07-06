/** @type import('haoma').JestConfig */
module.exports = require('haoma').getJestConfig({
  testEnvironment: 'jsdom',
  transformPackages: ['lodash-es', 'date-fns', 'yup', '@tarojs/runtime'],
  transformer: 'babel',
})
