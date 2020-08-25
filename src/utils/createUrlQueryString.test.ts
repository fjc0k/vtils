import { createUrlQueryString } from './createUrlQueryString'

describe('createUrlQueryString', () => {
  test('表现正常', () => {
    const parameters = {
      'x': '1//$%6',
      '2': 'xxx',
      '0': '0 = & ?😁',
      '😁🥳': 'hello',
    }
    const query = createUrlQueryString(parameters)
    expect(query).toMatchSnapshot()
  })
})
