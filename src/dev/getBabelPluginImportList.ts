import * as dateFns from 'date-fns'
import * as dateFnsLocale from 'date-fns/locale'
import * as lodash from 'lodash-uni'
import * as path from 'path'
import { babelPluginImport } from './babelPluginImport'

export function getBabelPluginImportList() {
  const vtilsPath = path.dirname(
    process.env.JEST_WORKER_ID
      ? __filename
      : // @ts-ignore
        require.resolve('vtils/package.json'),
  )
  return [
    // utils
    [
      babelPluginImport,
      {
        libraryName: 'vtils',
        camel2DashComponentName: false,
        customName: (name: string) => {
          if (name in lodash) {
            return `lodash-es/${name}`
          }
          return `vtils/utils/${name}`
        },
      },
      'vtils.utils.0',
    ],
    [
      babelPluginImport,
      {
        libraryName: 'vtils/utils',
        camel2DashComponentName: false,
        customName: (name: string) => {
          if (name in lodash) {
            return `lodash-es/${name}`
          }
          return `vtils/utils/${name}`
        },
      },
      'vtils.utils.1',
    ],
    [
      babelPluginImport,
      {
        libraryName: 'lodash-uni',
        camel2DashComponentName: false,
        customName: (name: string) => `lodash-es/${name}`,
      },
      'vtils.utils.2',
    ],
    [
      babelPluginImport,
      {
        libraryName: '../utils',
        camel2DashComponentName: false,
        only: (file: babel.BabelFile) =>
          file.opts.filename!.startsWith(vtilsPath),
        customName: (name: string) => {
          if (name in lodash) {
            return `lodash-es/${name}`
          }
          return `../utils/${name}`
        },
      },
      'vtils.utils.3',
    ],

    // mp
    [
      babelPluginImport,
      {
        libraryName: 'vtils/mp',
        camel2DashComponentName: false,
        customName: (name: string) => `vtils/mp/${name}`,
      },
      'vtils.mp.0',
    ],

    // react
    [
      babelPluginImport,
      {
        libraryName: 'vtils/react',
        camel2DashComponentName: false,
        customName: (name: string) => `vtils/react/${name}`,
      },
      'vtils.react.0',
    ],

    // date
    [
      babelPluginImport,
      {
        libraryName: 'vtils/date',
        camel2DashComponentName: false,
        customName: (name: string) => {
          if (name in dateFns) {
            return `date-fns/esm/${name}`
          }
          if (name in dateFnsLocale) {
            return `date-fns/esm/locale/${name}`
          }
          return `vtils/date/${name}`
        },
      },
      'vtils.date.0',
    ],
    [
      babelPluginImport,
      {
        libraryName: 'date-fns/esm',
        camel2DashComponentName: false,
        customName: (name: string) => `date-fns/esm/${name}`,
      },
      'vtils.date.1',
    ],
    [
      babelPluginImport,
      {
        libraryName: 'date-fns/esm/locale',
        camel2DashComponentName: false,
        customName: (name: string) => `date-fns/esm/locale/${name}`,
      },
      'vtils.date.2',
    ],
  ]
}
