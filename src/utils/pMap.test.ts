import { expectType } from '../dev'
import { pMap } from './pMap'

describe('pMap', () => {
  test('表现正常', async () => {
    const res = await pMap([1, 2], item =>
      item === 1 ? item : Promise.resolve(item),
    )
    expectType<typeof res, number[]>()
    expect(res).toEqual([1, 2])
  })
})
