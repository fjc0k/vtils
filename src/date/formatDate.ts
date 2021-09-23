import { lightFormat } from 'date-fns/esm'

/**
 * 日期格式化占位符。
 *
 * @public
 */
export enum FormatDatePlaceholder {
  /**
   * 年：`44, 1, 1900, 2017`
   */
  y = 'y',

  /**
   * 年：`0044, 0001, 1900, 2017`
   */
  yyyy = 'yyyy',

  /**
   * 月：`1, 2, ..., 12`
   */
  m = 'M',

  /**
   * 月：`01, 02, ..., 12`
   */
  mm = 'MM',

  /**
   * 日：`1, 2, ..., 31`
   */
  d = 'd',

  /**
   * 日：`01, 02, ..., 31`
   */
  dd = 'dd',

  /**
   * 时：`0, 1, 2, ..., 23`
   */
  h = 'H',

  /**
   * 时：`00, 01, 02, ..., 23`
   */
  hh = 'HH',

  /**
   * 分：`0, 1, ..., 59`
   */
  i = 'm',

  /**
   * 分：`00, 01, ..., 59`
   */
  ii = 'mm',

  /**
   * 秒：`0, 1, ..., 59`
   */
  s = 's',

  /**
   * 秒：`00, 01, ..., 59`
   */
  ss = 'ss',
}

/**
 * 日期格式化渲染器。
 *
 * @public
 * @param placeholders 占位符
 * @returns 返回渲染字符串
 */
export type FormatDateRenderer =
  | ((placeholders: typeof FormatDatePlaceholder) => string)
  | string

/**
 * 格式化日期。
 *
 * @public
 * @param date 要格式化的日期，支持 Date、秒或毫秒时间戳
 * @param renderer 渲染器
 * @returns 返回格式化后的日期
 * @example
 * ```typescript
 * formatDate(
 *   new Date(2020, 5 - 1, 20, 13, 14, 21),
 *   _ => `${_.yyyy}-${_.mm}-${_.dd} ${_.hh}:${_.ii}:${_.ss}`,
 * ) // => '2020-05-20 13:14:21'
 * ```
 */
export function formatDate(date: Date | number, renderer: FormatDateRenderer) {
  if (typeof date === 'number' && String(date).length === 10) {
    date *= 1000
  }

  return lightFormat(
    date,
    typeof renderer === 'string'
      ? renderer.replace(/m/g, 'M').replace(/h/g, 'H').replace(/i/g, 'm')
      : renderer(FormatDatePlaceholder),
  )
}
