import { createUrlQueryString } from './createUrlQueryString.ts'

describe('createUrlQueryString', () => {
  test('表现正常', () => {
    const parameters = {
      'x': '1//$%6',
      '2': 'xxx',
      '0': '0 = & ?😁',
      '😁🥳': 'hello',
      'un': undefined,
    }
    const query = createUrlQueryString(parameters)
    expect(query).toMatchSnapshot()
  })

  test('可自定义连接符', () => {
    const parameters = {
      'x': '1//$%6',
      '2': 'xxx',
      '0': '0 = & ?😁',
      '😁🥳': 'hello',
    }
    const query = createUrlQueryString(parameters, {
      partSeparator: ';',
    })
    expect(query).toMatchSnapshot()
  })
})
