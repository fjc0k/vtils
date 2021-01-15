import { rot13 } from './rot13'

describe('rot13', () => {
  test('表现正常', () => {
    expect(rot13('hello world')).toBe('uryyb jbeyq')
    expect(rot13('uryyb jbeyq')).toBe('hello world')
    expect(rot13('foo-bar')).toBe('sbb-one')
    expect(rot13('foo123bar')).toBe('sbb123one')
    expect(rot13('foo!@bar')).toBe('sbb!@one')
    expect(rot13('sbb!@one')).toBe('foo!@bar')
  })
})
