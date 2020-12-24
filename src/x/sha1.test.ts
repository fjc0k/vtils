import { sha1 } from './sha1'

describe('sha1', () => {
  test('表现正常', () => {
    expect(sha1('foo')).toBe('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33')
    expect(sha1(Buffer.from('foo'))).toBe(
      '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
    )
  })
})
