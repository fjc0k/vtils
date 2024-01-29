import { expectType } from '../dev/index.ts'
import { Defined } from './Defined.ts'

describe('Defined', () => {
  test('表现正常', () => {
    expectType<Defined<number | undefined>, number>()
    expectType<number | undefined, undefined>()
    // @ts-expect-error
    expectType<Defined<number | undefined>, undefined>()
  })
})
