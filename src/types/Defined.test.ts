import { Defined } from './Defined'
import { expectType } from '../dev'

describe('Defined', () => {
  test('表现正常', () => {
    expectType<Defined<number | undefined>, number>()
    expectType<number | undefined, undefined>()
    // @ts-expect-error
    expectType<Defined<number | undefined>, undefined>()
  })
})
