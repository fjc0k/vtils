import {jestExpectEqual} from './enhanceJest'

const data: Array<[string, string, string]> = [
  ['', '', ''],
  ['v', 'dg==', 'dg'],
  ['vtils', 'dnRpbHM=', 'dnRpbHM'],
  ['vtils.base64Encode', 'dnRpbHMuYmFzZTY0RW5jb2Rl', 'dnRpbHMuYmFzZTY0RW5jb2Rl'],
  ['JavaScript 工具库', 'SmF2YVNjcmlwdCDlt6XlhbflupM=', 'SmF2YVNjcmlwdCDlt6XlhbflupM'],
  ['JavaScript\n工具库', 'SmF2YVNjcmlwdArlt6XlhbflupM=', 'SmF2YVNjcmlwdArlt6XlhbflupM'],
  ['\0', 'AA==', 'AA'],
  ['1', 'MQ==', 'MQ'],
  ['-1', 'LTE=', 'LTE'],
  ['abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#0^&*();:<>,. []{}', 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw+LC4gW117fQ==', 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw-LC4gW117fQ'],
  ['😁😎=-#@`.,?/|{*+😁', '8J+YgfCfmI49LSNAYC4sPy98eyor8J+YgQ==', '8J-YgfCfmI49LSNAYC4sPy98eyor8J-YgQ'],
  ['❥(ゝω・✿ฺ)※▓●²♠⑲Ⅲ∵molÇùㄡεətsフぽㅚ㉢д╢┉(๑╹◡╹)ﾉ"""', '4p2lKOOCnc+J44O74py/4Li6KeKAu+KWk+KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c+ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI=', '4p2lKOOCnc-J44O74py_4Li6KeKAu-KWk-KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c-ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI'],
  ['a\u{10126}ĉc车头', 'YfCQhKbEiWPovablpLQ=', 'YfCQhKbEiWPovablpLQ'],
]

;[
  ['在 Node 环境中', () => {
    beforeAll(() => {
      jest.resetModules()
      jest.mock('./env', () => {
        return {
          inNode: () => true,
        }
      })
    })
  }],
  ['不在 Node 环境中', () => {
    beforeAll(() => {
      jest.resetModules()
      jest.mock('./env', () => {
        return {
          inNode: () => false,
        }
      })
    })
  }],
].forEach(([desc, before]) => {
  describe(desc, () => {
    (before as any)()

    test('编码正常', async () => {
      const {base64Encode} = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        jestExpectEqual(base64Encode(str), encodedStr)
      })
    })

    test('解码正常', async () => {
      const {base64Decode} = await import('./base64')

      data.forEach(([str, encodedStr]) => {
        jestExpectEqual(base64Decode(encodedStr), str)
      })
    })

    test('URL 编码正常', async () => {
      const {base64UrlEncode} = await import('./base64')
      data.forEach(([str, _encodedStr, encodedUrlStr]) => {
        jestExpectEqual(base64UrlEncode(str), encodedUrlStr)
      })
    })

    test('URL 解码正常', async () => {
      const {base64UrlDecode} = await import('./base64')
      data.forEach(([str, _encodedStr, encodedUrlStr]) => {
        jestExpectEqual(base64UrlDecode(encodedUrlStr), str)
      })
    })
  })
})
