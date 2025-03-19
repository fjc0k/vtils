import { expectType } from '../dev'
import { PartialDeepBy } from './PartialDeepBy'

describe('PartialDeepBy', () => {
  test('表现正常', () => {
    type Example = {
      a: number
      b: {
        c: string
        d: {
          e: boolean
          f: number
        }
      }
    }
    type Example2 = PartialDeepBy<Example, 'a' | 'b.d.e'>

    expectType<number, Example['a']>()
    // @ts-expect-error
    expectType<number, Example2['a']>()
    expectType<number | undefined, Example2['a']>()

    expectType<boolean, Example['b']['d']['e']>()
    // @ts-expect-error
    expectType<boolean, Example2['b']['d']['e']>()
    expectType<boolean | undefined, Example2['b']['d']['e']>()
  })
})
