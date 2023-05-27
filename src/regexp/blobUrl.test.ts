import { blobUrlRegExpBuilder } from './blobUrl'

describe('blobUrlRegExpBuilder', () => {
  test('test', () => {
    expect(
      blobUrlRegExpBuilder
        .build()
        .test('blob:http://baidu.com/8c8f76be-2f7a-4d11-8efd-e714c6457fe9'),
    ).toBeTrue()
    expect(blobUrlRegExpBuilder.build().test('data:,Hello World!')).toBeFalse()
  })
})
