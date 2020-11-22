import { getCompileConfig } from 'haoma'

export default [
  getCompileConfig({
    name: 'esm',
    inputFiles: ['src/**/*.ts', '!**/*.test.*', '!**/__*'],
    module: 'esm',
    target: 'browser',
    outDir: 'lib',
    rollupDts: true,
    rollupDtsFiles: ['**/index.d.ts'],
    rollupDtsIncludedPackages: ['type-fest', 'ts-essentials'],
  }),
  getCompileConfig({
    name: 'cjs',
    inputFiles: ['lib/**/*.js'],
    module: 'cjs',
    target: 'browser',
    outDir: 'lib/_cjs',
    renameImport: [
      {
        original: 'yup/es(.*)$',
        replacement: 'yup/lib$1',
      },
      {
        original: 'date\\-fns/esm(.*)$',
        replacement: 'date-fns$1',
      },
    ],
  }),
]
