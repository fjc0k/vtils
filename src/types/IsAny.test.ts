import { expectType } from './__expectType__'
import { IsAny } from './IsAny'

describe('IsAny', () => {
  test('不是 any', () => {
    expectType<IsAny<number>, false>()
    expectType<IsAny<boolean>, false>()
    expectType<IsAny<string>, false>()
    expectType<IsAny<RegExp>, false>()
    expectType<IsAny<undefined>, false>()
    expectType<IsAny<null>, false>()
    expectType<IsAny<unknown>, false>()
    expectType<IsAny<never>, false>()
    expectType<IsAny<any[]>, false>()
  })

  test('是 any', () => {
    expectType<IsAny<any>, true>()
  })
})
