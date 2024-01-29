import { expectType } from '../dev/index.ts'
import { IsEmptyObject } from './IsEmptyObject.ts'

describe('IsEmptyObject', () => {
  test('不是空对象', () => {
    expectType<IsEmptyObject<number>, false>()
    expectType<IsEmptyObject<boolean>, false>()
    expectType<IsEmptyObject<string>, false>()
    expectType<IsEmptyObject<RegExp>, false>()
    expectType<IsEmptyObject<undefined>, false>()
    expectType<IsEmptyObject<null>, false>()
    expectType<IsEmptyObject<unknown>, false>()
    expectType<IsEmptyObject<any[]>, false>()
  })

  test('是空对象', () => {
    expectType<IsEmptyObject<{}>, true>()
  })
})
