import { expectType } from '../dev/index.ts'
import { isType } from './isType.ts'

describe('isType', () => {
  test('表现正常', () => {
    const x: any = { y: 1 }
    if (isType<{ x: 1 }>(x)) {
      expectType<typeof x, { x: 1 }>()
      const _x = x
      expect(_x.x).toBe(undefined)
    }
  })
})
