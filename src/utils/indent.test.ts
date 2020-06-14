import { indent } from './indent'

describe(indent.name, () => {
  test('空字符串正常', () => {
    expect(indent``).toBe('')
  })

  test('首行无前导空白正常', () => {
    expect(indent`${[1, 2].join('\n')}`).toBe('1\n2')
  })

  test('首行有前导空白正常', () => {
    expect(indent` ${[1, 2].join('\n')}`).toBe(' 1\n 2')
  })

  test('非首行无前导空白正常', () => {
    expect(indent`\n${[1, 2].join('\n')}`).toBe('\n1\n2')
    expect(indent`\r\n${[1, 2].join('\n')}`).toBe('\r\n1\n2')
    expect(indent`0\r\r\n${[1, 2].join('\n')}`).toBe('0\r\r\n1\n2')
  })

  test('非首行有前导空白正常', () => {
    expect(indent`\n  ${[1, 2].join('\n')}`).toBe('\n  1\n  2')
    expect(indent`\r\n ${[1, 2].join('\n')}`).toBe('\r\n 1\n 2')
    expect(indent`0 \r\r\n   ${[1, 2].join('\n')}`).toBe('0 \r\r\n   1\n   2')
    expect(indent`x \n\n ${[1, 2].join('\n')}`).toBe('x \n\n 1\n 2')
  })

  test('只处理紧跟前导空白后面的插入值', () => {
    expect(indent`\n  0 ${[1, 2].join('\n')}`).toBe('\n  0 1\n2')
  })
})
