import { getSmsUrl } from './getSmsUrl.ts'

describe('getSmsUrl', () => {
  test('ok', () => {
    expect(
      getSmsUrl({
        phoneNumber: '10086',
      }),
    ).toBe('sms:10086')
    expect(
      getSmsUrl({
        phoneNumber: '10086',
        message: 'hello',
        userAgent:
          'Mozilla/5.0 (Android 7.1.1; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
      }),
    ).toBe('sms:10086?body=hello')
    expect(
      getSmsUrl({
        phoneNumber: '10086',
        message: 'hello',
        userAgent:
          'Mozilla/5.0 (iPhone 6s; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/8.3.0 Mobile/15B87 Safari/604.1 MttCustomUA/2 QBWebViewType/1 WKType/1',
      }),
    ).toBe('sms:10086&body=hello')
    expect(
      getSmsUrl({
        phoneNumber: '10086',
        message: '我们 ya',
        userAgent:
          'Mozilla/5.0 (Android 7.1.1; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
      }),
    ).toBe('sms:10086?body=%E6%88%91%E4%BB%AC%20ya')
    expect(
      getSmsUrl({
        message: 'hello',
        userAgent:
          'Mozilla/5.0 (Android 7.1.1; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
      }),
    ).toBe('sms:?body=hello')
  })

  test('ua', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Android 7.1.1; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
      writable: true,
    })
    expect(
      getSmsUrl({
        message: 'hello',
      }),
    ).toBe('sms:?body=hello')

    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (iPhone 6s; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 MQQBrowser/8.3.0 Mobile/15B87 Safari/604.1 MttCustomUA/2 QBWebViewType/1 WKType/1',
      writable: true,
    })
    expect(
      getSmsUrl({
        message: 'hello',
      }),
    ).toBe('sms:&body=hello')
  })
})
