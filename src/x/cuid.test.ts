import { cuid } from './cuid'

describe('cuid', () => {
  test('表现正常', () => {
    expect(cuid()).toStartWith('c')
  })
})
