import { expectType } from '../dev'
import { prepareData } from './prepareData'

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
