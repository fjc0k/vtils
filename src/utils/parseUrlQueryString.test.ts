import { createUrlQueryString } from './createUrlQueryString.ts'
import { parseUrlQueryString } from './parseUrlQueryString.ts'

describe('parseUrlQueryString', () => {
  test('表现正常', () => {
    const parameters = {
      'x': '1//$%6',
      '2': 'xxx',
      '0': '0 = & ?😁',
      '😁🥳': 'hello',
      'age': '20',
    }
    expect(parseUrlQueryString(createUrlQueryString(parameters))).toEqual(
      parameters,
    )
    expect(parseUrlQueryString(`?${createUrlQueryString(parameters)}`)).toEqual(
      parameters,
    )
  })

  test('支持自定义连接符', () => {
    expect(
      parseUrlQueryString('x=1;y=ooo;base64;msg=', {
        partSeparator: ';',
      }),
    ).toEqual({
      x: '1',
      y: 'ooo',
      base64: '',
      msg: '',
    })
  })
})
