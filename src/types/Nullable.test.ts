import { expectType } from '../dev'
import { Nullable } from './Nullable'

describe('Nullable', () => {
  test('表现正常', () => {
    // @ts-expect-error
    expectType<Nullable<number>, []>()
    // @ts-expect-error
    expectType<Nullable<boolean>, 2>()
    // @ts-expect-error
    expectType<number, Nullable<number>>()
    expectType<number | null | undefined, Nullable<number>>()
  })
})
