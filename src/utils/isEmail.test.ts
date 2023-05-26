import { isEmail } from './isEmail'

describe('isEmail', () => {
  test('ok', () => {
    expect(isEmail('ff@gmail.com')).toBe(true)
    expect(isEmail('https://sss.cc')).toBe(false)
  })
})
