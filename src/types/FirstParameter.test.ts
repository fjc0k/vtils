import { expectType } from './__expectType__'
import { FirstParameter } from './FirstParameter'

describe('FirstParameter', () => {
  test('表现正常', () => {
    expectType<FirstParameter<(id: number) => any>, number>()
    // @ts-expect-error
    expectType<FirstParameter<(id: number) => any>, string>()
  })
})
