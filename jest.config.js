/** @type import('haoma').JestConfig */
module.exports = require('haoma').getJestConfig({
  transformPackages: ['lodash-es', 'date-fns'],
})
