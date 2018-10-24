module.exports = {
  name: 'vtils',
  moduleName: 'vtils',
  input: 'src/index.ts',
  outDir: 'lib',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  banner: true,
  typescript2: {
    clean: true
  }
}
