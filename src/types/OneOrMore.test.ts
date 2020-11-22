import { expectType } from './__expectType__'
import { OneOrMore } from './OneOrMore'

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
