import { types as babelTypes, PluginObj } from '@babel/core'
import { getCompileConfig } from 'haoma'

function removeIsTypePlugin({
  types: t,
}: {
  types: typeof babelTypes
}): PluginObj {
  return {
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
  }
}

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.ts', '!**/*.{test,perf}.*', '!**/__*'],
    module: 'esm',
    target: 'browser',
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
    target: 'browser',
    outDir: 'lib/_cjs',
    emitDts: false,
    renameImport: [
      {
        original: /yup\/es(.*)$/,
        replacement: 'yup/lib$1',
      },
      {
        original: /date-fns\/esm(.*)$/,
        replacement: 'date-fns$1',
      },
    ],
    plugins: [removeIsTypePlugin],
  }),
]
