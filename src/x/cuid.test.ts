import { cuid } from './cuid.ts'

describe('cuid', () => {
  test('表现正常', () => {
    expect(cuid()).toStartWith('c')
  })
})
