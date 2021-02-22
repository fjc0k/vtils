import * as dateFns from 'date-fns'
import * as dateFnsLocale from 'date-fns/locale'
import * as lodash from 'lodash-uni'
import * as path from 'path'

export function getBabelPluginImportList() {
  // @ts-ignore
  const resolve = require.resolve
  const vtilsPath = path.dirname(resolve('vtils/package.json'))

  return [
    // utils
    [
      resolve('babel-plugin-import'),
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
      resolve('babel-plugin-import'),
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
      resolve('babel-plugin-import'),
      {
        libraryName: 'lodash-uni',
        camel2DashComponentName: false,
        customName: (name: string) => `lodash-es/${name}`,
      },
      'vtils.utils.2',
    ],
    [
      resolve('babel-plugin-import'),
      {
        libraryName: '../utils',
        camel2DashComponentName: false,
        customName: (name: string, file: { opts: { filename: string } }) => {
          if (!file.opts.filename.startsWith(vtilsPath)) {
            return '../utils'
          }
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
      resolve('babel-plugin-import'),
      {
        libraryName: 'vtils/mp',
        camel2DashComponentName: false,
        customName: (name: string) => `vtils/mp/${name}`,
      },
      'vtils.mp.0',
    ],

    // react
    [
      resolve('babel-plugin-import'),
      {
        libraryName: 'vtils/react',
        camel2DashComponentName: false,
        customName: (name: string) => `vtils/react/${name}`,
      },
      'vtils.react.0',
    ],

    // date
    [
      resolve('babel-plugin-import'),
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
      resolve('babel-plugin-import'),
      {
        libraryName: 'date-fns/esm',
        camel2DashComponentName: false,
        customName: (name: string) => `date-fns/esm/${name}`,
      },
      'vtils.date.1',
    ],
    [
      resolve('babel-plugin-import'),
      {
        libraryName: 'date-fns/esm/locale',
        camel2DashComponentName: false,
        customName: (name: string) => `date-fns/esm/locale/${name}`,
      },
      'vtils.date.2',
    ],
  ]
}
