import { pascalCase } from './pascalCase.ts'

describe('pascalCase', () => {
  test('正常', () => {
    expect(pascalCase('test string')).toBe('TestString')
  })
})
