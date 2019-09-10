import {combine} from './combine'
import {jestExpectEqual} from './enhanceJest'

test('表现正常', () => {
  const keys = [1, 2, 'hello']
  const values = [false, [], {q: 'w'}]

  jestExpectEqual(
    combine(keys, values),
    {
      1: false,
      2: [],
      hello: {q: 'w'},
    },
  )

  jestExpectEqual(
    combine([...keys, 'no'], values),
    {
      1: false,
      2: [],
      hello: {q: 'w'},
      no: undefined as any,
    },
  )
})
