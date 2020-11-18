import { constantCase } from './constantCase'

describe('constantCase', () => {
  test('正常', () => {
    expect(constantCase('test string')).toBe('TEST_STRING')
  })
})
