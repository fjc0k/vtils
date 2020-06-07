import { format } from 'date-fns/esm'
import { zhCN } from 'date-fns/esm/locale'

/**
 * 日期格式化占位符。
 *
 * @public
 */
export enum FormatDatePlaceholder {
  /**
   * AD, BC
   */
  G = 'G',

  /**
   * AD, BC
   */
  GG = 'GG',

  /**
   * AD, BC
   */
  GGG = 'GGG',

  /**
   * Anno Domini, Before Christ
   */
  GGGG = 'GGGG',

  /**
   * A, B
   */
  GGGGG = 'GGGGG',

  /**
   * 44, 1, 1900, 2017
   */
  y = 'y',

  /**
   * 44th, 1st, 0th, 17th
   */
  yo = 'yo',

  /**
   * 44, 01, 00, 17
   */
  yy = 'yy',

  /**
   * 044, 001, 1900, 2017
   */
  yyy = 'yyy',

  /**
   * 0044, 0001, 1900, 2017
   */
  yyyy = 'yyyy',

  /**
   * ...
   */
  yyyyy = 'yyyyy',

  /**
   * 44, 1, 1900, 2017
   */
  Y = 'Y',

  /**
   * 44th, 1st, 1900th, 2017th
   */
  Yo = 'Yo',

  /**
   * 44, 01, 00, 17
   */
  YY = 'YY',

  /**
   * 044, 001, 1900, 2017
   */
  YYY = 'YYY',

  /**
   * 0044, 0001, 1900, 2017
   */
  YYYY = 'YYYY',

  /**
   * ...
   */
  YYYYY = 'YYYYY',

  /**
   * -43, 0, 1, 1900, 2017
   */
  R = 'R',

  /**
   * -43, 00, 01, 1900, 2017
   */
  RR = 'RR',

  /**
   * -043, 000, 001, 1900, 2017
   */
  RRR = 'RRR',

  /**
   * -0043, 0000, 0001, 1900, 2017
   */
  RRRR = 'RRRR',

  /**
   * ...
   */
  RRRRR = 'RRRRR',

  /**
   * -43, 0, 1, 1900, 2017
   */
  u = 'u',

  /**
   * -43, 01, 1900, 2017
   */
  uu = 'uu',

  /**
   * -043, 001, 1900, 2017
   */
  uuu = 'uuu',

  /**
   * -0043, 0001, 1900, 2017
   */
  uuuu = 'uuuu',

  /**
   * ...
   */
  uuuuu = 'uuuuu',

  /**
   * 1, 2, 3, 4
   */
  Q = 'Q',

  /**
   * 1st, 2nd, 3rd, 4th
   */
  Qo = 'Qo',

  /**
   * 01, 02, 03, 04
   */
  QQ = 'QQ',

  /**
   * Q1, Q2, Q3, Q4
   */
  QQQ = 'QQQ',

  /**
   * 1st quarter, 2nd quarter, ...
   */
  QQQQ = 'QQQQ',

  /**
   * 1, 2, 3, 4
   */
  QQQQQ = 'QQQQQ',

  /**
   * 1, 2, 3, 4
   */
  q = 'q',

  /**
   * 1st, 2nd, 3rd, 4th
   */
  qo = 'qo',

  /**
   * 01, 02, 03, 04
   */
  qq = 'qq',

  /**
   * Q1, Q2, Q3, Q4
   */
  qqq = 'qqq',

  /**
   * 1st quarter, 2nd quarter, ...
   */
  qqqq = 'qqqq',

  /**
   * 1, 2, 3, 4
   */
  qqqqq = 'qqqqq',

  /**
   * 1, 2, ..., 12
   */
  M = 'M',

  /**
   * 1st, 2nd, ..., 12th
   */
  Mo = 'Mo',

  /**
   * 01, 02, ..., 12
   */
  MM = 'MM',

  /**
   * Jan, Feb, ..., Dec
   */
  MMM = 'MMM',

  /**
   * January, February, ..., December
   */
  MMMM = 'MMMM',

  /**
   * J, F, ..., D
   */
  MMMMM = 'MMMMM',

  /**
   * 1, 2, ..., 12
   */
  L = 'L',

  /**
   * 1st, 2nd, ..., 12th
   */
  Lo = 'Lo',

  /**
   * 01, 02, ..., 12
   */
  LL = 'LL',

  /**
   * Jan, Feb, ..., Dec
   */
  LLL = 'LLL',

  /**
   * January, February, ..., December
   */
  LLLL = 'LLLL',

  /**
   * J, F, ..., D
   */
  LLLLL = 'LLLLL',

  /**
   * 1, 2, ..., 53
   */
  w = 'w',

  /**
   * 1st, 2nd, ..., 53th
   */
  wo = 'wo',

  /**
   * 01, 02, ..., 53
   */
  ww = 'ww',

  /**
   * 1, 2, ..., 53
   */
  I = 'I',

  /**
   * 1st, 2nd, ..., 53th
   */
  Io = 'Io',

  /**
   * 01, 02, ..., 53
   */
  II = 'II',

  /**
   * 1, 2, ..., 31
   */
  d = 'd',

  /**
   * 1st, 2nd, ..., 31st
   */
  do = 'do',

  /**
   * 01, 02, ..., 31
   */
  dd = 'dd',

  /**
   * 1, 2, ..., 365, 366
   */
  D = 'D',

  /**
   * 1st, 2nd, ..., 365th, 366th
   */
  Do = 'Do',

  /**
   * 01, 02, ..., 365, 366
   */
  DD = 'DD',

  /**
   * 001, 002, ..., 365, 366
   */
  DDD = 'DDD',

  /**
   * ...
   */
  DDDD = 'DDDD',

  /**
   * Mon, Tue, Wed, ..., Su
   */
  E = 'E',

  /**
   * Mon, Tue, Wed, ..., Su
   */
  EE = 'EE',

  /**
   * Mon, Tue, Wed, ..., Su
   */
  EEE = 'EEE',

  /**
   * Monday, Tuesday, ..., Sunday
   */
  EEEE = 'EEEE',

  /**
   * M, T, W, T, F, S, S
   */
  EEEEE = 'EEEEE',

  /**
   * Mo, Tu, We, Th, Fr, Su, Sa
   */
  EEEEEE = 'EEEEEE',

  /**
   * 1, 2, 3, ..., 7
   */
  i = 'i',

  /**
   * 1st, 2nd, ..., 7th
   */
  io = 'io',

  /**
   * 01, 02, ..., 07
   */
  ii = 'ii',

  /**
   * Mon, Tue, Wed, ..., Su
   */
  iii = 'iii',

  /**
   * Monday, Tuesday, ..., Sunday
   */
  iiii = 'iiii',

  /**
   * M, T, W, T, F, S, S
   */
  iiiii = 'iiiii',

  /**
   * Mo, Tu, We, Th, Fr, Su, Sa
   */
  iiiiii = 'iiiiii',

  /**
   * 2, 3, 4, ..., 1
   */
  e = 'e',

  /**
   * 2nd, 3rd, ..., 1st
   */
  eo = 'eo',

  /**
   * 02, 03, ..., 01
   */
  ee = 'ee',

  /**
   * Mon, Tue, Wed, ..., Su
   */
  eee = 'eee',

  /**
   * Monday, Tuesday, ..., Sunday
   */
  eeee = 'eeee',

  /**
   * M, T, W, T, F, S, S
   */
  eeeee = 'eeeee',

  /**
   * Mo, Tu, We, Th, Fr, Su, Sa
   */
  eeeeee = 'eeeeee',

  /**
   * 2, 3, 4, ..., 1
   */
  c = 'c',

  /**
   * 2nd, 3rd, ..., 1st
   */
  co = 'co',

  /**
   * 02, 03, ..., 01
   */
  cc = 'cc',

  /**
   * Mon, Tue, Wed, ..., Su
   */
  ccc = 'ccc',

  /**
   * Monday, Tuesday, ..., Sunday
   */
  cccc = 'cccc',

  /**
   * M, T, W, T, F, S, S
   */
  ccccc = 'ccccc',

  /**
   * Mo, Tu, We, Th, Fr, Su, Sa
   */
  cccccc = 'cccccc',

  /**
   * AM, PM
   */
  a = 'a',

  /**
   * AM, PM
   */
  aa = 'aa',

  /**
   * AM, PM
   */
  aaa = 'aaa',

  /**
   * a.m., p.m.
   */
  aaaa = 'aaaa',

  /**
   * a, p
   */
  aaaaa = 'aaaaa',

  /**
   * AM, PM, noon, midnight
   */
  b = 'b',

  /**
   * AM, PM, noon, midnight
   */
  bb = 'bb',

  /**
   * AM, PM, noon, midnight
   */
  bbb = 'bbb',

  /**
   * a.m., p.m., noon, midnight
   */
  bbbb = 'bbbb',

  /**
   * a, p, n, mi
   */
  bbbbb = 'bbbbb',

  /**
   * at night, in the morning, ...
   */
  B = 'B',

  /**
   * at night, in the morning, ...
   */
  BB = 'BB',

  /**
   * at night, in the morning, ...
   */
  BBB = 'BBB',

  /**
   * at night, in the morning, ...
   */
  BBBB = 'BBBB',

  /**
   * at night, in the morning, ...
   */
  BBBBB = 'BBBBB',

  /**
   * 1, 2, ..., 11, 12
   */
  h = 'h',

  /**
   * 1st, 2nd, ..., 11th, 12th
   */
  ho = 'ho',

  /**
   * 01, 02, ..., 11, 12
   */
  hh = 'hh',

  /**
   * 0, 1, 2, ..., 23
   */
  H = 'H',

  /**
   * 0th, 1st, 2nd, ..., 23rd
   */
  Ho = 'Ho',

  /**
   * 00, 01, 02, ..., 23
   */
  HH = 'HH',

  /**
   * 1, 2, ..., 11, 0
   */
  K = 'K',

  /**
   * 1st, 2nd, ..., 11th, 0th
   */
  Ko = 'Ko',

  /**
   * 01, 02, ..., 11, 00
   */
  KK = 'KK',

  /**
   * 24, 1, 2, ..., 23
   */
  k = 'k',

  /**
   * 24th, 1st, 2nd, ..., 23rd
   */
  ko = 'ko',

  /**
   * 24, 01, 02, ..., 23
   */
  kk = 'kk',

  /**
   * 0, 1, ..., 59
   */
  m = 'm',

  /**
   * 0th, 1st, ..., 59th
   */
  mo = 'mo',

  /**
   * 00, 01, ..., 59
   */
  mm = 'mm',

  /**
   * 0, 1, ..., 59
   */
  s = 's',

  /**
   * 0th, 1st, ..., 59th
   */
  so = 'so',

  /**
   * 00, 01, ..., 59
   */
  ss = 'ss',

  /**
   * 0, 1, ..., 9
   */
  S = 'S',

  /**
   * 00, 01, ..., 99
   */
  SS = 'SS',

  /**
   * 000, 0001, ..., 999
   */
  SSS = 'SSS',

  /**
   * ...
   */
  SSSS = 'SSSS',

  /**
   * -08, +0530, Z
   */
  X = 'X',

  /**
   * -0800, +0530, Z
   */
  XX = 'XX',

  /**
   * -08:00, +05:30, Z
   */
  XXX = 'XXX',

  /**
   * -0800, +0530, Z, +123456
   */
  XXXX = 'XXXX',

  /**
   * -08:00, +05:30, Z, +12:34:56
   */
  XXXXX = 'XXXXX',

  /**
   * -08, +0530, +00
   */
  x = 'x',

  /**
   * -0800, +0530, +0000
   */
  xx = 'xx',

  /**
   * -08:00, +05:30, +00:00
   */
  xxx = 'xxx',

  /**
   * -0800, +0530, +0000, +123456
   */
  xxxx = 'xxxx',

  /**
   * -08:00, +05:30, +00:00, +12:34:56
   */
  xxxxx = 'xxxxx',

  /**
   * GMT-8, GMT+5:30, GMT+0
   */
  O = 'O',

  /**
   * GMT-8, GMT+5:30, GMT+0
   */
  OO = 'OO',

  /**
   * GMT-8, GMT+5:30, GMT+0
   */
  OOO = 'OOO',

  /**
   * GMT-08:00, GMT+05:30, GMT+00:00
   */
  OOOO = 'OOOO',

  /**
   * GMT-8, GMT+5:30, GMT+0
   */
  z = 'z',

  /**
   * GMT-8, GMT+5:30, GMT+0
   */
  zz = 'zz',

  /**
   * GMT-8, GMT+5:30, GMT+0
   */
  zzz = 'zzz',

  /**
   * GMT-08:00, GMT+05:30, GMT+00:00
   */
  zzzz = 'zzzz',

  /**
   * 512969520
   */
  t = 't',

  /**
   * ...
   */
  tt = 'tt',

  /**
   * 512969520900
   */
  T = 'T',

  /**
   * ...
   */
  TT = 'TT',

  /**
   * 05/29/1453
   */
  P = 'P',

  /**
   * May 29, 1453
   */
  PP = 'PP',

  /**
   * May 29th, 1453
   */
  PPP = 'PPP',

  /**
   * Sunday, May 29th, 1453
   */
  PPPP = 'PPPP',

  /**
   * 12:00 AM
   */
  p = 'p',

  /**
   * 12:00:00 AM
   */
  pp = 'pp',

  /**
   * 12:00:00 AM GMT+2
   */
  ppp = 'ppp',

  /**
   * 12:00:00 AM GMT+02:00
   */
  pppp = 'pppp',

  /**
   * 05/29/1453, 12:00 AM
   */
  Pp = 'Pp',

  /**
   * May 29, 1453, 12:00:00 AM
   */
  PPpp = 'PPpp',

  /**
   * May 29th, 1453 at ...
   */
  PPPppp = 'PPPppp',

  /**
   * Sunday, May 29th, 1453 at ...
   */
  PPPPpppp = 'PPPPpppp',
}

/**
 * 简易的日期格式化占位符。
 *
 * @public
 */
export enum FormatDateSimplePlaceholder {
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
 * @param simplePlaceholders 简易占位符
 * @param placeholders 占位符
 * @returns 返回渲染字符串
 */
export type FormatDateRenderer = (
  simplePlaceholders: typeof FormatDateSimplePlaceholder,
  placeholders: typeof FormatDatePlaceholder,
) => string

/**
 * 格式化日期。
 *
 * @public
 * @param date 要格式化的日期，支持 Date、秒或毫秒时间戳
 * @param renderer 渲染器
 * @param options 选项
 * @returns 返回格式化后的日期
 * @example
 * ```typescript
 * formatDate(
 *   new Date(2020, 5 - 1, 20, 13, 14, 21),
 *   _ => `${_.yyyy}-${_.mm}-${_.dd} ${_.hh}:${_.ii}:${_.ss}`,
 * ) // => '2020-05-20 13:14:21'
 * ```
 */
export function formatDate(
  date: Date | number,
  renderer: FormatDateRenderer,
  options?: Parameters<typeof format>[2],
) {
  if (typeof date === 'number' && String(date).length === 10) {
    date *= 1000
  }

  return format(
    date,
    renderer(FormatDateSimplePlaceholder, FormatDatePlaceholder),
    {
      locale: zhCN,
      ...options,
    },
  )
}
