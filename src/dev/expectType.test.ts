import { expectType } from './expectType.ts'

describe('expectType', () => {
  test('ok', () => {
    expectType<1, 1>()
    // @ts-expect-error
    expectType<1, 2>()
  })
})
