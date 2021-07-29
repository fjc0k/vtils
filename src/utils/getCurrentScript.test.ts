import { getCurrentScript } from './getCurrentScript'

describe('getCurrentScript', () => {
  test('表现正常', () => {
    expect(getCurrentScript()).toBeNull()
  })
})
