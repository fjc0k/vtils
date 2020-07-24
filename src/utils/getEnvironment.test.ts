import { getEnvironment } from './getEnvironment'

describe('getEnvironment', () => {
  test('表现正常', () => {
    expect(getEnvironment()).toMatchSnapshot()
  })
})
