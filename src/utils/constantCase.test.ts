import { constantCase } from './constantCase.ts'

describe('constantCase', () => {
  test('正常', () => {
    expect(constantCase('test string')).toBe('TEST_STRING')
  })
})
