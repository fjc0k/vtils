import { expectType } from '../dev/index.ts'
import { OneOrMore } from './OneOrMore.ts'

describe('OneOrMore', () => {
  test('表现正常', () => {
    expectType<OneOrMore<number>, number>()
    expectType<OneOrMore<number>, number[]>()
    expectType<OneOrMore<number>, []>()
    expectType<OneOrMore<number>, 1>()
    // @ts-expect-error
    expectType<OneOrMore<number>, string>()
  })
})
