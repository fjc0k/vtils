import qs from 'qs'
import {createURIQuery, parseURIQuery} from './URI'
import {jestExpectEqual} from './enhanceJest'

test('createURIQuery', () => {
  const parameters = {
    'x': '1//$%6',
    '2': 'xxx',
    '0': '0 = & ?😁',
    '😁🥳': 'hello',
  }
  const query = createURIQuery(parameters)
  jestExpectEqual(
    qs.parse(query),
    parameters,
  )
})

test('parseURIQuery', () => {
  const parameters = {
    'x': '1//$%6',
    '2': 'xxx',
    '0': '0 = & ?😁',
    '😁🥳': 'hello',
    'age': 20,
  }
  const query = qs.stringify(parameters)

  jestExpectEqual(
    qs.parse(query),
    parseURIQuery(query),
  )

  jestExpectEqual(
    qs.parse(query),
    parseURIQuery(`?${query}`),
  )

  jestExpectEqual(
    {
      ...qs.parse(query),
      age: 20,
    },
    parseURIQuery<typeof parameters>(
      query,
      ps => ({
        ...ps,
        age: Number(ps.age),
      }),
    ),
  )
})
