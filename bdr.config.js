module.exports = {
  entry: {
    'vtils': ['src/index.ts', 'vtils']
  },
  format: 'es,cjs,umd,umd-min',
  dest: 'lib',
  typescript: require('typescript'),
  clear: false
}
