import { getCurrentScript } from './getCurrentScript.ts'

describe('getCurrentScript', () => {
  test('表现正常', () => {
    expect(getCurrentScript()).toBeNull()
  })
})
