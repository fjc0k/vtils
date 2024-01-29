import { expectType } from '../dev/index.ts'
import { AnyObject } from './AnyObject.ts'

describe('AnyObject', () => {
  test('不是 object', () => {
    // @ts-expect-error
    expectType<AnyObject, number>()
    // @ts-expect-error
    expectType<AnyObject, string>()
    // @ts-expect-error
    expectType<AnyObject, boolean>()
    // @ts-expect-error
    expectType<AnyObject, unknown>()
    // @ts-expect-error
    expectType<AnyObject, undefined>()
    // @ts-expect-error
    expectType<AnyObject, null>()
  })

  test('是 object', () => {
    expectType<AnyObject, {}>()
    expectType<AnyObject, []>()
    expectType<AnyObject, RegExp>()
    expectType<AnyObject, () => any>()
    // why ???
    expectType<AnyObject, never>()
  })
})
