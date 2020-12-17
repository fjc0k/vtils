import { getCompileConfig } from 'haoma'

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
  }),
]
