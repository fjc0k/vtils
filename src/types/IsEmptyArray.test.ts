import { expectType } from '../dev/index.ts'
import { IsEmptyArray } from './IsEmptyArray.ts'

describe('IsEmptyArray', () => {
  test('不是空数组', () => {
    expectType<IsEmptyArray<number>, false>()
    expectType<IsEmptyArray<boolean>, false>()
    expectType<IsEmptyArray<string>, false>()
    expectType<IsEmptyArray<RegExp>, false>()
    expectType<IsEmptyArray<undefined>, false>()
    expectType<IsEmptyArray<null>, false>()
    expectType<IsEmptyArray<unknown>, false>()
    expectType<IsEmptyArray<{}>, false>()
  })

  test('是空数组', () => {
    expectType<IsEmptyArray<[]>, true>()
  })
})
