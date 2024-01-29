import { expectType } from '../dev/index.ts'
import { AnyAsyncFunction } from './AnyAsyncFunction.ts'

describe('AnyAsyncFunction', () => {
  test('不是异步 function', () => {
    // @ts-expect-error
    expectType<AnyAsyncFunction, number>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, string>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, boolean>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, unknown>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, undefined>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, null>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, {}>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, []>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, RegExp>()
    // @ts-expect-error
    expectType<AnyAsyncFunction, () => 0>()
  })

  test('是异步 function', () => {
    expectType<AnyAsyncFunction, () => Promise<0>>()
    // why ???
    expectType<AnyAsyncFunction, never>()
  })
})
