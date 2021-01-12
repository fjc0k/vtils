import { DotPath, DotPathValue } from './DotPath'
import { expectType } from '../dev'

describe('DotPath', () => {
  test('表现正常', () => {
    const obj = {
      x: {
        y: {
          z: [0, '1'] as const,
          哈哈: 1,
        },
      },
    }
    // eslint-disable-next-line
    function get<T, P extends DotPath<T>>(
      _object: T,
      _path: P,
    ): DotPathValue<T, P> {
      return 1 as any
    }

    const xyz1 = get(obj, 'x.y.z.1')
    expectType<typeof xyz1, '1'>()

    const xyz哈哈 = get(obj, 'x.y.哈哈')
    expectType<typeof xyz哈哈, number>()
  })
})
