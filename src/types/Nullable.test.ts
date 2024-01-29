import { expectType } from '../dev/index.ts'
import { Nullable } from './Nullable.ts'

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
