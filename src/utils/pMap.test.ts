import { expectType } from '../dev/index.ts'
import { pMap } from './pMap.ts'

describe('pMap', () => {
  test('表现正常', async () => {
    const res = await pMap([1, 2], item =>
      item === 1 ? item : Promise.resolve(item),
    )
    expectType<typeof res, number[]>()
    expect(res).toEqual([1, 2])
  })
})
