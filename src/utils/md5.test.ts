import { md5 } from './md5'

describe('md5', () => {
  // ref: https://github.com/blueimp/JavaScript-MD5/blob/master/test/test.js
  describe('MD5 Hex-encoding', function () {
    it('should create a hex-encoded MD5 hash of an ASCII value', function () {
      expect(md5('value')).toEqual('2063c1608d6e0baf80249c42e2be5804')
    })

    it('should create a hex-encoded MD5 hash of an UTF-8 value', function () {
      expect(md5('日本')).toEqual('4dbed2e657457884e67137d3514119b3')
    })
  })

  describe('HMAC-MD5 Hex-encoding', function () {
    it('should create a hex-encoded HMAC-MD5 hash of an ASCII value and key', function () {
      expect(md5('value', 'key')).toEqual('01433efd5f16327ea4b31144572c67f6')
    })

    it('should create a hex-encoded HMAC-MD5 hash of an UTF-8 value and key', function () {
      expect(md5('日本', '日本')).toEqual('c78b8c7357926981cc04740bd3e9d015')
    })
  })

  describe('MD5 raw encoding', function () {
    it('should create a raw MD5 hash of an ASCII value', function () {
      expect(md5('value', undefined, true)).toEqual(
        ' c\xc1`\x8dn\x0b\xaf\x80$\x9cB\xe2\xbeX\x04',
      )
    })

    it('should create a raw MD5 hash of an UTF-8 value', function () {
      expect(md5('日本', undefined, true)).toEqual(
        'M\xbe\xd2\xe6WEx\x84\xe6q7\xd3QA\x19\xb3',
      )
    })
  })

  describe('HMAC-MD5 raw encoding', function () {
    it('should create a raw HMAC-MD5 hash of an ASCII value and key', function () {
      expect(md5('value', 'key', true)).toEqual(
        '\x01C>\xfd_\x162~\xa4\xb3\x11DW,g\xf6',
      )
    })

    it('should create a raw HMAC-MD5 hash of an UTF-8 value and key', function () {
      expect(md5('日本', '日本', true)).toEqual(
        '\xc7\x8b\x8csW\x92i\x81\xcc\x04t\x0b\xd3\xe9\xd0\x15',
      )
    })
  })

  describe('其他', () => {
    test('正常', () => {
      expect(md5('龙')).toBe('682570a229cbd3d67e76ad99b3152060')
      expect(md5('龙🐉')).toBe('ea67ba0d87ad85bfe15a52f70ec9ffd4')
      expect(md5('龙', '🐉')).toBe('293a529180e8b949aa820b9d071f31fa')
      expect(md5("`.s//sdd884&8-9(#44'🇨🇳")).toBe(
        'a03367f7abd25be653008015777c16ba',
      )
    })
  })
})
