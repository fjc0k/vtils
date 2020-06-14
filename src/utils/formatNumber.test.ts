import { formatNumber } from './formatNumber'

describe('formatNumber', () => {
  test('默认正常', () => {
    expect(formatNumber(-0.123456789)).toBe('-0.123456789')
    expect(formatNumber(0.123456789)).toBe('0.123456789')
    expect(formatNumber(1.23456789)).toBe('1.23456789')
    expect(formatNumber(12.3456789)).toBe('12.3456789')
    expect(formatNumber(123.456789)).toBe('123.456789')
    expect(formatNumber(1234.56789)).toBe('1,234.56789')
    expect(formatNumber(12345.6789)).toBe('12,345.6789')
    expect(formatNumber(123456.789)).toBe('123,456.789')
    expect(formatNumber(1234567.89)).toBe('1,234,567.89')
    expect(formatNumber(12345678.9)).toBe('12,345,678.9')
    expect(formatNumber(123456789)).toBe('123,456,789')
    expect(formatNumber(-123456789)).toBe('-123,456,789')
    expect(formatNumber(1234567890)).toBe('1,234,567,890')
  })

  test('整数部分千分位分隔符为空格', () => {
    expect(formatNumber(-0.123456789, { thousandsSeparator: ' ' })).toBe(
      '-0.123456789',
    )
    expect(formatNumber(0.123456789, { thousandsSeparator: ' ' })).toBe(
      '0.123456789',
    )
    expect(formatNumber(1.23456789, { thousandsSeparator: ' ' })).toBe(
      '1.23456789',
    )
    expect(formatNumber(12.3456789, { thousandsSeparator: ' ' })).toBe(
      '12.3456789',
    )
    expect(formatNumber(123.456789, { thousandsSeparator: ' ' })).toBe(
      '123.456789',
    )
    expect(formatNumber(1234.56789, { thousandsSeparator: ' ' })).toBe(
      '1 234.56789',
    )
    expect(formatNumber(12345.6789, { thousandsSeparator: ' ' })).toBe(
      '12 345.6789',
    )
    expect(formatNumber(123456.789, { thousandsSeparator: ' ' })).toBe(
      '123 456.789',
    )
    expect(formatNumber(1234567.89, { thousandsSeparator: ' ' })).toBe(
      '1 234 567.89',
    )
    expect(formatNumber(12345678.9, { thousandsSeparator: ' ' })).toBe(
      '12 345 678.9',
    )
    expect(formatNumber(123456789, { thousandsSeparator: ' ' })).toBe(
      '123 456 789',
    )
    expect(formatNumber(-123456789, { thousandsSeparator: ' ' })).toBe(
      '-123 456 789',
    )
    expect(formatNumber(1234567890, { thousandsSeparator: ' ' })).toBe(
      '1 234 567 890',
    )
  })

  test('整数、小数部分千分位分隔符都为空格', () => {
    expect(
      formatNumber(-0.123456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('-0.123 456 789')
    expect(
      formatNumber(0.123456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('0.123 456 789')
    expect(
      formatNumber(1.23456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('1.234 567 89')
    expect(
      formatNumber(12.3456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('12.345 678 9')
    expect(
      formatNumber(123.456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('123.456 789')
    expect(
      formatNumber(1234.56789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('1 234.567 89')
    expect(
      formatNumber(12345.6789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('12 345.678 9')
    expect(
      formatNumber(123456.789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('123 456.789')
    expect(
      formatNumber(1234567.89, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('1 234 567.89')
    expect(
      formatNumber(12345678.9, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('12 345 678.9')
    expect(
      formatNumber(123456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('123 456 789')
    expect(
      formatNumber(-123456789, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('-123 456 789')
    expect(
      formatNumber(1234567890, {
        thousandsSeparator: ' ',
        thousandthsSeparator: ' ',
      }),
    ).toBe('1 234 567 890')
  })

  test('整数、小数部分都无千分位分隔符', () => {
    expect(
      formatNumber(-0.123456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('-0.123456789')
    expect(
      formatNumber(0.123456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('0.123456789')
    expect(
      formatNumber(1.23456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('1.23456789')
    expect(
      formatNumber(12.3456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('12.3456789')
    expect(
      formatNumber(123.456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('123.456789')
    expect(
      formatNumber(1234.56789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('1234.56789')
    expect(
      formatNumber(12345.6789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('12345.6789')
    expect(
      formatNumber(123456.789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('123456.789')
    expect(
      formatNumber(1234567.89, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('1234567.89')
    expect(
      formatNumber(12345678.9, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('12345678.9')
    expect(
      formatNumber(123456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('123456789')
    expect(
      formatNumber(-123456789, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('-123456789')
    expect(
      formatNumber(1234567890, {
        thousandsSeparator: '',
        thousandthsSeparator: '',
      }),
    ).toBe('1234567890')
  })
})
