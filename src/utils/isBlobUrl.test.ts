import { isBlobUrl } from './isBlobUrl.ts'

describe('isBlobUrl', () => {
  test('表现正常', () => {
    expect(
      isBlobUrl(
        'blob:https://example.org/9115d58c-bcda-ff47-86e5-083e9a215304',
      ),
    ).toBeTrue()
    expect(isBlobUrl('blob:foo')).toBeFalse()
    expect(isBlobUrl('http://foo.bar')).toBeFalse()
  })
})
