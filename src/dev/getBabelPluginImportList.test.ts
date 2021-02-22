import * as babel from '@babel/core'
import { dedent } from '../utils'
import { getBabelConfig } from 'haoma'
import { getBabelPluginImportList } from './getBabelPluginImportList'

describe('getBabelPluginImportList', () => {
  test('转换正常', async () => {
    const code = dedent`
      import { sample, sampleIndex } from 'vtils'
      import { wait, sampleBy } from '../utils'
      import { uniq } from 'lodash-uni'
      import { anyToDate, getDate, zhCN } from 'vtils/date'
      import { getDay } from 'date-fns/esm'
      import { de } from 'date-fns/esm/locale'
      import { getTopBarInfo } from 'vtils/mp'

      console.log(sample, sampleIndex, wait, sampleBy, anyToDate, getDate, zhCN, getDay, de, uniq, getTopBarInfo)
    `
    const res = await babel.transformAsync(
      code,
      getBabelConfig({
        filename: __filename,
        target: 'browser',
        module: 'cjs',
        plugins: getBabelPluginImportList(),
      }),
    )
    expect(res!.code!).toMatchSnapshot()
  })
})
