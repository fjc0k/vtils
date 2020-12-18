import { expectType } from '../dev'
import { IsNever } from './IsNever'

describe('IsNever', () => {
  test('不是 never', () => {
    expectType<IsNever<number>, false>()
    expectType<IsNever<boolean>, false>()
    expectType<IsNever<string>, false>()
    expectType<IsNever<RegExp>, false>()
    expectType<IsNever<undefined>, false>()
    expectType<IsNever<null>, false>()
    expectType<IsNever<unknown>, false>()
    expectType<IsNever<any>, false>()
    expectType<IsNever<any[]>, false>()
  })

  test('是 never', () => {
    expectType<IsNever<never>, true>()
  })
})
