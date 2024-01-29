import { expectType } from '../dev/index.ts'
import { prepareData } from './prepareData.ts'

describe('prepareData', () => {
  test('ok', async () => {
    const data = await prepareData({
      f: () => 'fn',
      fa: async () => 'fns',
    })
    expectType<typeof data['f'], 'fn'>()
    expectType<typeof data['fa'], string>()
    expect(data).toEqual({
      f: 'fn',
      fa: 'fns',
    })
  })
})
