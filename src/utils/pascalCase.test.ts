import { pascalCase } from './pascalCase'

describe('pascalCase', () => {
  test('正常', () => {
    expect(pascalCase('test string')).toBe('TestString')
  })
})
