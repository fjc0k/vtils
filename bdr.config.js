module.exports = {
  entry: {
    'vtils': ['src/index.ts', 'vtils']
  },
  format: 'es,cjs,umd,umd-min',
  typescript: require('typescript'),
  external: {
    vue: 'Vue'
  },
  clear: false
}
