import { expectType } from '../dev/index.ts'
import { AnyFunction } from './AnyFunction.ts'

describe('AnyFunction', () => {
  test('不是 function', () => {
    // @ts-expect-error
    expectType<AnyFunction, number>()
    // @ts-expect-error
    expectType<AnyFunction, string>()
    // @ts-expect-error
    expectType<AnyFunction, boolean>()
    // @ts-expect-error
    expectType<AnyFunction, unknown>()
    // @ts-expect-error
    expectType<AnyFunction, undefined>()
    // @ts-expect-error
    expectType<AnyFunction, null>()
    // @ts-expect-error
    expectType<AnyFunction, {}>()
    // @ts-expect-error
    expectType<AnyFunction, []>()
    // @ts-expect-error
    expectType<AnyFunction, RegExp>()
  })

  test('是 function', () => {
    expectType<AnyFunction, () => any>()
    // why ???
    expectType<AnyFunction, never>()
  })
})
