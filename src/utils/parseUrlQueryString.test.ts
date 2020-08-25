import { createUrlQueryString } from './createUrlQueryString'
import { Merge } from '../types'
import { parseUrlQueryString } from './parseUrlQueryString'

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
    expect(
      parseUrlQueryString<Merge<typeof parameters, { age: number }>>(
        createUrlQueryString(parameters),
        q => ({ ...q, age: +q.age }),
      ),
    ).toEqual({
      ...parameters,
      age: +parameters.age,
    })
  })
})
