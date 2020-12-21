import { uuid } from './uuid'

describe('uuid', () => {
  test('表现正常', () => {
    expect(uuid()).toHaveLength(36)
  })
})
