import { emailRegExpBuilder } from './email'

describe('emojiRegExpBuilder', () => {
  test('test', () => {
    expect(emailRegExpBuilder.build().test('hello@gmail.com')).toBeTrue()
    expect(emailRegExpBuilder.build().test('hello+1@gmail.com')).toBeTrue()
    expect(emailRegExpBuilder.build().test('hello.x@gmail.com')).toBeTrue()
    expect(emailRegExpBuilder.build().test('gmail.com')).toBeFalse()
  })
})
