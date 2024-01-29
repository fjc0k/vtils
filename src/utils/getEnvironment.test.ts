import { getEnvironment } from './getEnvironment.ts'

describe('getEnvironment', () => {
  test('表现正常', () => {
    expect(getEnvironment()).toMatchSnapshot()
  })
})
