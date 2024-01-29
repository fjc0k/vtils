import { expectType } from '../dev/index.ts'
import { FirstParameter } from './FirstParameter.ts'

describe('FirstParameter', () => {
  test('表现正常', () => {
    expectType<FirstParameter<(id: number) => any>, number>()
    // @ts-expect-error
    expectType<FirstParameter<(id: number) => any>, string>()
  })
})
