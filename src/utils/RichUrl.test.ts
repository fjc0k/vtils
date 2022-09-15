import { RichUrl } from './RichUrl'

describe('RichUrl', () => {
  describe('check', () => {
    test('不是富链接', () => {
      const urls = [
        'http://gg.gg',
        'https://gg.gg',
        'ftp://gg.gg',
        'mailto:gg@gg.gg',
        'rich:gg.gg',
      ]
      for (const url of urls) {
        expect(RichUrl.check(url)).toBeFalse()
      }
    })

    test('是富链接', () => {
      const urls = ['rich://', 'rich://gg.gg', 'rich://{}']
      for (const url of urls) {
        expect(RichUrl.check(url)).toBeTrue()
      }
    })
  })

  describe('build', () => {
    test('无描述', () => {
      expect(RichUrl.build('')).toMatchSnapshot('url为空')
      expect(RichUrl.build('http://gg.gg')).toMatchSnapshot('url不为空')
    })

    test('有描述', () => {
      expect(RichUrl.build('', null)).toMatchSnapshot('描述为 null')
      expect(RichUrl.build('', 1)).toMatchSnapshot('描述为 1')
      expect(RichUrl.build('', [])).toMatchSnapshot('描述为 []')
      expect(RichUrl.build('', { x: 1 })).toMatchSnapshot('描述为 { x: 1 }')
      expect(RichUrl.build('', 'desc')).toMatchSnapshot('描述为 desc')
    })
  })

  describe('parse', () => {
    test('非富链接时返回原始输入作为普通链接', () => {
      const urls = [
        'http://gg.gg',
        'https://gg.gg',
        'ftp://gg.gg',
        'mailto:gg@gg.gg',
        'rich:gg.gg',
        "rich://''",
      ]
      for (const url of urls) {
        expect(RichUrl.parse(url)).toEqual({ url })
      }
    })

    test('富链接时解析正常', () => {
      expect(RichUrl.parse(RichUrl.build(''))).toMatchSnapshot('url为空')
      expect(RichUrl.parse(RichUrl.build('http://gg.gg'))).toMatchSnapshot(
        'url不为空',
      )
      expect(RichUrl.parse(RichUrl.build('', null))).toMatchSnapshot(
        '描述为 null',
      )
      expect(RichUrl.parse(RichUrl.build('', 1))).toMatchSnapshot('描述为 1')
      expect(RichUrl.parse(RichUrl.build('', []))).toMatchSnapshot('描述为 []')
      expect(RichUrl.parse(RichUrl.build('', { x: 1 }))).toMatchSnapshot(
        '描述为 { x: 1 }',
      )
      expect(RichUrl.parse(RichUrl.build('', 'desc'))).toMatchSnapshot(
        '描述为 desc',
      )
    })
  })

  describe('transform', () => {
    test('表现正常', async () => {
      expect(
        await RichUrl.transform(
          {
            id: 1,
            title: 'hello',
            icon: RichUrl.build('icon', { name: 'icon' }),
            users: [
              {
                id: 2,
                avatar: RichUrl.build('2-avatar'),
              },
              {
                id: 3,
                avatar: RichUrl.build('3-avatar', { url: '.' }),
              },
              {
                id: 4,
                avatar: RichUrl.build('', { avatar: '4', id: 4 }),
                albums: [
                  RichUrl.build('http://gg.gg'),
                  RichUrl.build('https://gg.gg'),
                  RichUrl.build('ftp://gg.gg', { ftp: true }),
                ],
              },
            ],
          },
          async ({ url, desc }) => `url: ${url}, desc: ${JSON.stringify(desc)}`,
        ),
      ).toMatchSnapshot()
    })
  })

  describe('fromFile', () => {
    beforeAll(() => {
      window.URL.createObjectURL = () => 'blob:http://localhost/ffsfeeer44'
    })

    afterAll(() => {
      // @ts-ignore
      delete window.URL.createObjectURL
    })

    test('表现正常', () => {
      expect(
        RichUrl.fromFile(
          new File([''], 'h.css', {
            type: 'text/css',
            lastModified: 1574155444339,
          }),
        ),
      ).toMatchSnapshot()
    })
  })

  describe('toFile', () => {
    const rawSend = window.XMLHttpRequest.prototype.send.bind(
      window.XMLHttpRequest.prototype,
    )

    beforeAll(() => {
      window.URL.createObjectURL = () => 'blob:http://localhost/ffsfeeer44'
      window.XMLHttpRequest.prototype.send = function () {
        Object.defineProperty(this, 'response', {
          value: '',
        })
        this.onload?.(this as any)
      }
    })

    afterAll(() => {
      // @ts-ignore
      delete window.URL.createObjectURL
      window.XMLHttpRequest.prototype.send = rawSend
    })

    test('非文件富链接报错', async () => {
      await expect(
        RichUrl.toFile(RichUrl.build('http://gg.gg', { x: 1 })),
      ).rejects.toThrowErrorMatchingSnapshot()
    })

    test('文件富链接正常', async () => {
      const { file, url } = await RichUrl.toFile(
        RichUrl.fromFile(
          new File([''], 'h.css', {
            type: 'text/css',
            lastModified: 1574155444339,
          }),
        ),
      )
      expect({
        url: url,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }).toMatchSnapshot()
    })
  })

  describe('transformFile', () => {
    const rawSend = window.XMLHttpRequest.prototype.send.bind(
      window.XMLHttpRequest.prototype,
    )

    beforeAll(() => {
      window.URL.createObjectURL = () => 'blob:http://localhost/ffsfeeer44'
      window.XMLHttpRequest.prototype.send = function () {
        Object.defineProperty(this, 'response', {
          value: '',
        })
        this.onload?.(this as any)
      }
    })

    afterAll(() => {
      // @ts-ignore
      delete window.URL.createObjectURL
      window.XMLHttpRequest.prototype.send = rawSend
    })

    test('表现正常', async () => {
      expect(
        await RichUrl.transformFile(
          {
            id: 1,
            title: 'hello',
            icon: RichUrl.build('blob://x0', { name: 'icon' }),
            users: [
              {
                id: 2,
                avatar: RichUrl.build('blob://x1', { url: '.' }),
              },
              {
                id: 3,
                avatar: RichUrl.build('blob://x2', { url: '.' }),
              },
              {
                id: 4,
                avatar: RichUrl.fromFile(
                  new File([''], 'h.css', {
                    type: 'text/css',
                    lastModified: 1574155444339,
                  }),
                ),
                albums: [
                  RichUrl.build('blob://x3', { url: '.' }),
                  RichUrl.build('blob://x4', { url: '.' }),
                  RichUrl.build('blob://x5', { ftp: true }),
                ],
              },
            ],
          },
          async ({ url, file }) => `url: ${url}, file: ${file.name}`,
        ),
      ).toMatchSnapshot()
    })
  })
})
