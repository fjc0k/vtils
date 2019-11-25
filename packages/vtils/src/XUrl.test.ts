import http from 'http'
import {XUrl} from './XUrl'

async function fileToObj(file: File): Promise<Partial<File> & { content: string }> {
  const fileContent = await new Promise<string>(resolve => {
    const fileReader = new FileReader()
    fileReader.readAsText(file)
    fileReader.onload = () => {
      resolve(fileReader.result as any)
    }
  })
  return {
    content: fileContent,
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
  }
}

describe('XUrl', () => {
  let server: http.Server
  let testFile: File

  beforeAll(() => {
    window.URL.createObjectURL = jest.fn().mockImplementation(() => 'http://localhost:56384')
    server = http
      .createServer((_, res) => {
        res.setHeader('access-control-allow-origin', '*')
        res.end('hello')
      })
      .listen(56384)
    testFile = new File(
      ['hello'],
      'test.txt',
      {
        type: 'text/plain',
        lastModified: 1574155444339,
      },
    )
  })

  afterAll(() => {
    (window.URL.createObjectURL as any).mockReset()
    server.close()
  })

  test('generate', () => {
    const xUrl = XUrl.generate(testFile)
    expect(xUrl).toMatchSnapshot()
  })

  test('extractUrl', () => {
    const xUrl = XUrl.generate(testFile)
    const url = XUrl.extractUrl(xUrl)
    expect(url).toMatchSnapshot()
  })

  test('extractFile', async () => {
    const xUrl = XUrl.generate(testFile)
    const file = (await XUrl.extractFile(xUrl))!
    expect(await fileToObj(file)).toMatchSnapshot()
  })

  test('extract', async () => {
    const xUrl = XUrl.generate(testFile)
    const res = await XUrl.extract(xUrl)
    expect({
      ...res,
      file: await fileToObj(res.file!),
    }).toMatchSnapshot()
  })

  test('正常的 URL', async () => {
    expect(await XUrl.extract('http://foo.bar')).toMatchSnapshot()
  })

  test('自定义的 URL', async () => {
    expect(await XUrl.extract(['hello'])).toMatchSnapshot()
  })

  test('transform', async () => {
    const xUrl = XUrl.generate(testFile)
    const data = {
      id: 1,
      title: 'hello',
      icon: xUrl,
      users: [
        {
          id: 2,
          avatar: xUrl,
        },
        {
          id: 3,
          avatar: xUrl,
        },
        {
          id: 4,
          avatar: xUrl,
          albums: [xUrl, xUrl, xUrl],
        },
      ],
    } as const
    expect(await XUrl.transform(data, async () => 'url://ok')).toMatchSnapshot()
  })
})
