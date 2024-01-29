import { expectType } from '../dev/index.ts'
import { DotPath, DotPathValue } from './DotPath.ts'

describe('DotPath', () => {
  test('表现正常', () => {
    const obj = {
      x: {
        y: {
          z: [0, '1'] as const,
          哈哈: 1,
        },
        arr: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
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

    const xyzArr = get(obj, 'x.arr')
    expectType<typeof xyzArr, Array<{ id: number }>>()

    const xyzArrItem = get(obj, 'x.arr.0')
    expectType<typeof xyzArrItem, { id: number }>()

    const xyzArrItemId = get(obj, 'x.arr.0.id')
    expectType<typeof xyzArrItemId, number>()
  })
})
