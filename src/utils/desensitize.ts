export enum DesensitizeStrategy {
  CHINESE_NAME = 'CHINESE_NAME',
  CHINESE_ID_CARD_NUMBER = 'CHINESE_ID_CARD_NUMBER',
  CHINESE_MOBILE_PHONE_NUMBER = 'CHINESE_MOBILE_PHONE_NUMBER',
  EMAIL = 'EMAIL',
}

export interface DesensitizeOptions {
  /**
   * 脱敏策略
   */
  strategy?: DesensitizeStrategy
  /**
   * 脱敏替换字符
   *
   * @default '*'
   */
  replacer?: string
  /**
   * 前置保留字符数
   *
   * @default 0
   */
  preKeep?: number
  /**
   * 后置保留字符数
   *
   * @default 0
   */
  postKeep?: number
}

function replace(text: string, start: number, end: number, replacer: string) {
  let res = text.substring(0, start)
  for (let i = start; i < end; i++) {
    res += replacer
  }
  res += text.substring(end)
  return res
}

/**
 * 文本脱敏。
 *
 * @param text 待脱敏的文本
 * @param options 脱敏选项
 */
export function desensitize(
  text: string,
  options: DesensitizeOptions = {},
): string {
  if (!text) return text
  const replacer = options?.replacer ?? '*'
  if (options.strategy) {
    if (options.strategy === DesensitizeStrategy.CHINESE_NAME) {
      return replace(text, 1, text.length, replacer)
    }
    if (options.strategy === DesensitizeStrategy.CHINESE_ID_CARD_NUMBER) {
      return replace(text, 1, text.length - 2, replacer)
    }
    if (options.strategy === DesensitizeStrategy.CHINESE_MOBILE_PHONE_NUMBER) {
      return replace(text, 3, text.length - 4, replacer)
    }
    if (options.strategy === DesensitizeStrategy.EMAIL) {
      return replace(text, 1, text.indexOf('@'), replacer)
    }
  }
  if (options.preKeep != null || options.postKeep != null) {
    return replace(
      text,
      options.preKeep ?? 0,
      text.length - (options.postKeep ?? 0),
      replacer,
    )
  }
  return replace(text, 0, text.length, replacer)
}
