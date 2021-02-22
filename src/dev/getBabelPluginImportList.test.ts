import * as babel from '@babel/core'
import { dedent } from '../utils'
import { getBabelPluginImportList } from './getBabelPluginImportList'

describe('getBabelPluginImportList', () => {
  test('转换正常', async () => {
    const code = dedent`
      import { sample, sampleIndex } from 'vtils'
      import { wait, sampleBy, delay } from '../utils'
      import { uniq } from 'lodash-uni'
      import { anyToDate, getDate, zhCN } from 'vtils/date'
      import { getDay } from 'date-fns/esm'
      import { de } from 'date-fns/esm/locale'
      import { getTopBarInfo } from 'vtils/mp'

      console.log(sample, sampleIndex, wait, sampleBy, anyToDate, getDate, zhCN, getDay, de, uniq, getTopBarInfo, delay)
    `
    const res = await babel.transformAsync(code, {
      filename: __filename,
      plugins: getBabelPluginImportList(),
    })
    expect(res!.code!).toMatchSnapshot()
  })
})
