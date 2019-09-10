import {entries} from './entries'
import {jestExpectEqual} from './enhanceJest'

test('优先使用 Object.entries', () => {
  const ObjectEntries = jest.spyOn(Object, 'entries')

  jestExpectEqual(
    entries({x: 1}),
    [['x', 1]],
  )

  jestExpectEqual(
    entries({x: 1, y: 2}),
    Object.entries({x: 1, y: 2}),
  )

  expect(ObjectEntries).toBeCalledTimes(3)
})

test('没有 Object.entries 也能正常工作', () => {
  const originalObjectEntries = Object.entries
  Object.entries = null as any

  jestExpectEqual(
    entries({x: 1}),
    [['x', 1]],
  )

  jestExpectEqual(
    entries({x: 1, y: 2}),
    originalObjectEntries({x: 1, y: 2}),
  )

  Object.entries = originalObjectEntries
})
