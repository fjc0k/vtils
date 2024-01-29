import { jsonp } from './jsonp.ts'
import type { LoadResourceUrl } from './loadResource.ts'

jest.mock(
  './loadResource',
  () =>
    ({
      loadResource: (url: LoadResourceUrl) => {
        const _url = new URL(url.path)
        ;(globalThis as any)[_url.searchParams.get('callback')!]?.(true)
      },
      LoadResourceUrlType: {},
    } as typeof import('./loadResource')),
)

describe('jsonp', () => {
  test('表现正常', async () => {
    expect(await jsonp('https://baidu.com/')).toBeTrue()
  })
})
