import { RedisCookieJar } from './RedisCookieJar'

jest.mock('ioredis', () => {
  const ioredis = require('ioredis-mock')
  Object.assign(ioredis, jest.requireActual('ioredis'))
  return ioredis
})

describe('RedisCookieJar', () => {
  test('表现正常', async () => {
    const { default: Redis } = await import('ioredis')
    const redis = new Redis()
    const cookieJar = new RedisCookieJar({ key: 'test', redis })
    await cookieJar.setCookie('sid=12345', 'https://baidu.com')
    expect(await redis.keys('*')).toMatchSnapshot()
    expect(await redis.get((await redis.keys('*'))[0])).toMatchSnapshot()
  })
})
