import qs from 'qs'
import { createURIQuery } from './URI'
import { jestExpectEqual } from './enhanceJest'

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
