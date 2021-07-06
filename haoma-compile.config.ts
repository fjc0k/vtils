import { defineBabelPlugin, getCompileConfig } from 'haoma'

const removeIsTypePlugin = defineBabelPlugin(t => ({
  visitor: {
    ImportDeclaration: {
      exit(path) {
        if (
          path.node.specifiers.length === 1 &&
          t.isImportSpecifier(path.node.specifiers[0]) &&
          t.isIdentifier(path.node.specifiers[0].imported) &&
          path.node.specifiers[0].imported.name === 'isType'
        ) {
          path.remove()
        }
      },
    },
    CallExpression: {
      exit(path) {
        if (
          t.isIdentifier(path.node.callee) &&
          path.node.callee.name === 'isType'
        ) {
          path.remove()
        }
      },
    },
  },
}))

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.ts', '!**/*.{test,perf}.*', '!**/__*'],
    module: 'esm',
    target: file => (/src\/(dev|x)\//.test(file) ? 'node' : 'browser'),
    outDir: 'lib',
    rollupDts: true,
    rollupDtsFiles: ['**/index.d.ts'],
    rollupDtsExcludeFiles: ['**/validator/**/*'],
    rollupDtsIncludedPackages: ['type-fest', 'ts-essentials'],
    plugins: [removeIsTypePlugin],
  }),
  getCompileConfig({
    name: 'cjs',
    inputFiles: ['src/**/*.ts', '!**/*.{test,perf}.*', '!**/__*'],
    module: 'cjs',
    target: file => (/src\/(dev|x)\//.test(file) ? 'node' : 'browser'),
    outDir: 'lib/_cjs',
    emitDts: false,
    alias: {
      'yup/es': 'yup/lib',
      'date-fns/esm': 'date-fns',
    },
    plugins: [removeIsTypePlugin],
  }),
]
