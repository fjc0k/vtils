import { getEmailUrl } from './getEmailUrl.ts'

describe('getEmailUrl', () => {
  test('ok', () => {
    expect(
      getEmailUrl({
        to: 'hello@gmail.com',
      }),
    ).toBe('mailto:hello@gmail.com')
    expect(
      getEmailUrl({
        to: ['hello@gmail.com', 'hello2@gmail.com'],
      }),
    ).toBe('mailto:hello@gmail.com,hello2@gmail.com')
    expect(
      getEmailUrl({
        to: 'hello@gmail.com',
        cc: 'hello2@gmail.com',
        bcc: 'hello3@gmail.com',
        subject: 'hello',
        body: '你好',
      }),
    ).toMatchSnapshot()
    expect(
      getEmailUrl({
        to: 'hello@gmail.com',
        cc: ['hello2@gmail.com', 'hello22@gmail.com'],
        bcc: ['hello3@gmail.com', 'hello333@gmail.com'],
        subject: 'hello',
        body: '你好',
      }),
    ).toMatchSnapshot()
  })
})
