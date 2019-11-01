import fs from 'fs'
import http from 'http'
import path from 'path'
import {AsyncReturnType, escapeRegExp, ii, isFunction, isPlainObject} from 'vtils'
import {NodeRequest} from '.'

let port = 4444

async function withServer({
  statusCode = 200,
  response,
}: {
  statusCode?: number,
  response: ((req: http.IncomingMessage, res: http.OutgoingMessage) => any) | Record<string, any>,
}) {
  const server = http
    .createServer(async (req, res) => {
      const actualResponse = isFunction(response)
        ? await (response as any)(req, res)
        : response
      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
      res.end(isPlainObject(actualResponse) ? JSON.stringify(actualResponse) : actualResponse)
    })
    .listen(++port)

  return Promise.resolve({
    url: `http://localhost:${port}`,
    closeServer: () => server.close(),
  })
}

describe('请求方式', () => {
  const nr = new NodeRequest()
  let server!: AsyncReturnType<typeof withServer>
  beforeAll(async () => {
    server = await withServer({
      response: async (req) => ({
        method: req.method,
      }),
    })
  })
  afterAll(() => server.closeServer())

  test('GET', async () => {
    const res = await nr.request({
      url: server.url,
      method: 'GET',
    })
    expect(res.data).toMatchSnapshot()
  })

  test('POST', async () => {
    const res = await nr.request({
      url: server.url,
      method: 'POST',
    })
    expect(res.data).toMatchSnapshot()
  })
})

describe('请求数据', () => {
  const nr = new NodeRequest()
  let server!: AsyncReturnType<typeof withServer>
  beforeAll(async () => {
    server = await withServer({
      response: req => new Promise(resolve => {
        let str = ''
        req.on('data', (chunk: Buffer) => {
          str += chunk.toString('utf8')
        })
        req.on('end', () => {
          resolve({
            url: req.url,
            method: req.method,
            contentType: req.headers['content-type'],
            contentLength: req.headers['content-length'],
            data: str,
          })
        })
      }),
    })
  })
  afterAll(() => server.closeServer())

  test('queryData', async () => {
    const res = await nr.request({
      url: server.url,
      method: 'GET',
      queryData: {x: 1, 2: 3, null: null},
    })
    expect(res.data).toMatchSnapshot()
  })

  test('formData', async () => {
    const res = await nr.request({
      url: server.url,
      method: 'POST',
      formData: {x: 1, 2: 3, null: null},
    })
    expect(res.data).toMatchSnapshot()
  })

  test('jsonData', async () => {
    const res = await nr.request({
      url: server.url,
      method: 'POST',
      jsonData: {x: 1, 2: 3, null: null},
    })
    expect(res.data).toMatchSnapshot()
  })

  test('fileData', async () => {
    const xRes = await nr.request({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      jsonData: {XXXXX: 'YYYYYY'},
      responseType: 'stream',
    })
    const res = await nr.request<{ contentType: string, data: string }>({
      url: server.url,
      method: 'POST',
      queryData: {id: 100},
      formData: {x: 1, 2: 3, null: null},
      fileData: {
        jsonFile: path.join(__dirname, '../tsconfig.json'),
        jsonFile2: fs.createReadStream(path.join(__dirname, '../tsconfig.json')),
        jsonFile3: {
          file: xRes.data,
          options: {
            contentType: xRes.headers['content-type'],
            knownLength: xRes.headers['content-length'] ? Number(xRes.headers['content-length']) : undefined,
          },
        },
      },
    })
    res.data = ii(() => {
      const boundary = res.data.contentType.match(/boundary=([^"]+)/s)![1]
      res.data.contentType = res.data.contentType.replace(
        new RegExp(escapeRegExp(boundary), 'g'),
        '___boundary___',
      )
      res.data.data = res.data.data.replace(
        new RegExp(escapeRegExp(boundary), 'g'),
        '___boundary___',
      )
      return res.data
    })
    expect(res.data).toMatchSnapshot()
  })
})

describe('自定义头部', () => {
  const nr = new NodeRequest()
  let server!: AsyncReturnType<typeof withServer>
  beforeAll(async () => {
    server = await withServer({
      response: async (req) => req.headers,
    })
  })
  afterAll(() => server.closeServer())

  test('表现正常', async () => {
    const res = await nr.request({
      url: server.url,
      method: 'GET',
      headers: {
        'cookie': 'hello=1',
        'x-token': 'test_token',
        '222': '3333',
      },
    })
    expect(res.data).toMatchSnapshot()
  })
})

describe('cookie jar', () => {
  let server!: AsyncReturnType<typeof withServer>
  beforeAll(async () => {
    server = await withServer({
      response: async (req, res) => {
        res.setHeader('Set-Cookie', 'test=1')
        return {
          method: req.method,
          cookie: req.headers.cookie,
        }
      },
    })
  })
  afterAll(() => server.closeServer())

  test('没有开启 cookie jar 支持', async () => {
    const nr = new NodeRequest()
    const firstRes = await nr.request({
      url: server.url,
      method: 'GET',
    })
    expect(firstRes.data).toMatchSnapshot('首次请求 - 无 cookie')
    const secondRes = await nr.request({
      url: server.url,
      method: 'GET',
    })
    expect(secondRes.data).toMatchSnapshot('第二次请求 - 同样无 cookie')
  })

  test('开启 cookie jar 支持', async () => {
    const nr = new NodeRequest({
      cookieJar: {enabled: true},
    })
    const firstRes = await nr.request({
      url: server.url,
      method: 'GET',
    })
    expect(firstRes.data).toMatchSnapshot('首次请求 - 无 cookie')
    const secondRes = await nr.request({
      url: server.url,
      method: 'GET',
    })
    expect(secondRes.data).toMatchSnapshot('第二次请求 - 有 cookie')
  })
})

describe('静态方法', () => {
  let server!: AsyncReturnType<typeof withServer>
  beforeAll(async () => {
    server = await withServer({
      response: async (req) => {
        return {
          method: req.method,
          headers: req.headers,
        }
      },
    })
  })
  afterAll(() => server.closeServer())

  test('get', async () => {
    const res = await NodeRequest.get(server.url, {
      headers: {
        'x-get': '1',
      },
    })
    expect(res.data).toMatchSnapshot()
  })

  test('post', async () => {
    const res = await NodeRequest.post(server.url, {
      headers: {
        'x-post': '1',
      },
    })
    expect(res.data).toMatchSnapshot()
  })
})
