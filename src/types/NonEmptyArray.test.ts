import { expectType } from '../dev/index.ts'
import { NonEmptyArray } from './NonEmptyArray.ts'

describe('NonEmptyArray', () => {
  test('表现正常', () => {
    // @ts-expect-error
    expectType<NonEmptyArray<number>, []>()
    // @ts-expect-error
    expectType<NonEmptyArray<boolean>, []>()
    expectType<NonEmptyArray<number>, [1]>()
    expectType<NonEmptyArray<number>, [1, 2]>()
  })
})
