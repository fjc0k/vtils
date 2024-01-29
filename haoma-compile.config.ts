import fs from 'fs-extra'
import { defineBabelPlugin, getCompileConfig } from 'haoma'
import pa from 'path'
import { FirstParameter } from './src/types'

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
          path.replaceWith(t.booleanLiteral(true))
        }
      },
    },
  },
}))

const addExtension: ReturnType<
  FirstParameter<typeof defineBabelPlugin>
>['visitor']['ImportDeclaration'] = {
  exit(path, { filename }) {
    if (path.node.source) {
      const modulePath = path.node.source.value
      if (modulePath.startsWith('.')) {
        for (const ext of ['.ts', '/index.ts', '.js', '/index.js']) {
          const modulePathWithExt = modulePath + ext
          const resolvedPath = pa.join(pa.dirname(filename), modulePathWithExt)
          if (fs.pathExistsSync(resolvedPath)) {
            path.node.source.value = modulePathWithExt.replace(/\.ts$/, '.js')
            break
          }
        }
      }
    }
  },
}
const addExtensionPlugin = defineBabelPlugin(() => ({
  visitor: {
    ImportDeclaration: addExtension,
    ExportAllDeclaration: addExtension as any,
    ExportNamedDeclaration: addExtension as any,
  },
}))

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.{ts,js}', '!**/*.{test,perf}.*', '!**/__*'],
    module: 'esm',
    target: file => (/src\/(dev|x)\//.test(file) ? 'node' : 'browser'),
    outDir: 'lib',
    emitDts: true,
    rollupDts: true,
    rollupDtsFiles: ['**/index.d.ts'],
    rollupDtsExcludeFiles: ['**/validator/**'],
    rollupDtsIncludedPackages: ['type-fest', 'ts-essentials'],
    plugins: [removeIsTypePlugin, addExtensionPlugin],
  }),
  getCompileConfig({
    name: 'cjs',
    inputFiles: ['src/**/*.{ts,js}', '!**/*.{test,perf}.*', '!**/__*'],
    module: 'cjs',
    target: file => (/src\/(dev|x)\//.test(file) ? 'node' : 'browser'),
    outDir: 'lib/_cjs',
    emitDts: false,
    plugins: [removeIsTypePlugin],
  }),
]
