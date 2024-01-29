import { expectType } from '../dev/index.ts'
import { Path, PathValue } from './Path.ts'

describe('Path', () => {
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
    function get<T, L extends Path<T, L>>(object: T, path: L): PathValue<T, L> {
      return 1 as any
    }

    const xyz1 = get(obj, ['x', 'y', 'z', '1'])
    expectType<typeof xyz1, '1'>()

    const xyz哈哈 = get(obj, ['x', 'y', '哈哈'])
    expectType<typeof xyz哈哈, number>()
  })
})
