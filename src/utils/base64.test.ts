describe('base64', () => {
  const data: Array<[string, string, string]> = [
    ['', '', ''],
    ['v', 'dg==', 'dg'],
    ['vtils', 'dnRpbHM=', 'dnRpbHM'],
    [
      'vtils.base64Encode',
      'dnRpbHMuYmFzZTY0RW5jb2Rl',
      'dnRpbHMuYmFzZTY0RW5jb2Rl',
    ],
    [
      'JavaScript 工具库',
      'SmF2YVNjcmlwdCDlt6XlhbflupM=',
      'SmF2YVNjcmlwdCDlt6XlhbflupM',
    ],
    [
      'JavaScript\n工具库',
      'SmF2YVNjcmlwdArlt6XlhbflupM=',
      'SmF2YVNjcmlwdArlt6XlhbflupM',
    ],
    ['\0', 'AA==', 'AA'],
    ['1', 'MQ==', 'MQ'],
    ['-1', 'LTE=', 'LTE'],
    [
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#0^&*();:<>,. []{}',
      'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw+LC4gW117fQ==',
      'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw-LC4gW117fQ',
    ],
    [
      '😁😎=-#@`.,?/|{*+😁',
      '8J+YgfCfmI49LSNAYC4sPy98eyor8J+YgQ==',
      '8J-YgfCfmI49LSNAYC4sPy98eyor8J-YgQ',
    ],
    [
      '❥(ゝω・✿ฺ)※▓●²♠⑲Ⅲ∵molÇùㄡεətsフぽㅚ㉢д╢┉(๑╹◡╹)ﾉ"""',
      '4p2lKOOCnc+J44O74py/4Li6KeKAu+KWk+KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c+ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI=',
      '4p2lKOOCnc-J44O74py_4Li6KeKAu-KWk-KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c-ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI',
    ],
    ['a\u{10126}ĉc车头', 'YfCQhKbEiWPovablpLQ=', 'YfCQhKbEiWPovablpLQ'],
  ]

  beforeEach(() => {
    jest.resetModules()
  })

  describe('在 NodeJS 环境中', () => {
    test('编码正常', async () => {
      const { base64Encode } = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        expect(base64Encode(str)).toBe(encodedStr)
      })
    })

    test('解码正常', async () => {
      const { base64Decode } = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        expect(base64Decode(encodedStr)).toBe(str)
      })
    })

    test('URL 编码正常', async () => {
      const { base64UrlEncode } = await import('./base64')
      data.forEach(([str, , encodedUrlStr]) => {
        expect(base64UrlEncode(str)).toBe(encodedUrlStr)
      })
    })

    test('URL 解码正常', async () => {
      const { base64UrlDecode } = await import('./base64')
      data.forEach(([str, , encodedUrlStr]) => {
        expect(base64UrlDecode(encodedUrlStr)).toBe(str)
      })
    })
  })

  describe('不在 NodeJS 环境中但有 atob, btoa', () => {
    const bufferFrom = Buffer.from
    beforeAll(() => {
      Object.defineProperty(Buffer, 'from', {
        value: null,
      })
    })
    afterAll(() => {
      Object.defineProperty(Buffer, 'from', {
        value: bufferFrom,
      })
    })

    test('编码正常', async () => {
      const { base64Encode } = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        expect(base64Encode(str)).toBe(encodedStr)
      })
    })

    test('解码正常', async () => {
      const { base64Decode } = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        expect(base64Decode(encodedStr)).toBe(str)
      })
    })

    test('URL 编码正常', async () => {
      const { base64UrlEncode } = await import('./base64')
      data.forEach(([str, , encodedUrlStr]) => {
        expect(base64UrlEncode(str)).toBe(encodedUrlStr)
      })
    })

    test('URL 解码正常', async () => {
      const { base64UrlDecode } = await import('./base64')
      data.forEach(([str, , encodedUrlStr]) => {
        expect(base64UrlDecode(encodedUrlStr)).toBe(str)
      })
    })
  })

  describe('不在 NodeJS 环境中也没有 atob, btoa', () => {
    const bufferFrom = Buffer.from
    const globalWindow = { ...global.window }
    beforeAll(() => {
      Object.defineProperty(Buffer, 'from', {
        value: null,
      })
      jest.spyOn(global, 'window', 'get').mockImplementation(
        () =>
          ({
            ...globalWindow,
            atob: undefined,
            btoa: undefined,
          } as any),
      )
    })
    afterAll(() => {
      Object.defineProperty(Buffer, 'from', {
        value: bufferFrom,
      })
      jest.restoreAllMocks()
    })

    test('编码正常', async () => {
      const { base64Encode } = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        expect(base64Encode(str)).toBe(encodedStr)
      })
    })

    test('解码正常', async () => {
      const { base64Decode } = await import('./base64')
      data.forEach(([str, encodedStr]) => {
        expect(base64Decode(encodedStr)).toBe(str)
      })
    })

    test('URL 编码正常', async () => {
      const { base64UrlEncode } = await import('./base64')
      data.forEach(([str, , encodedUrlStr]) => {
        expect(base64UrlEncode(str)).toBe(encodedUrlStr)
      })
    })

    test('URL 解码正常', async () => {
      const { base64UrlDecode } = await import('./base64')
      data.forEach(([str, , encodedUrlStr]) => {
        expect(base64UrlDecode(encodedUrlStr)).toBe(str)
      })
    })
  })
})
