import { toSingleLineString } from './toSingleLineString'

export interface StringTemplateRenderOptions {
  /** 是否启用代码渲染，需环境支持 eval */
  code?: boolean
  /** 是否仅代码渲染 */
  onlyCode?: boolean
  /** 替换前操作 */
  beforeReplace?: (value: string, key: string) => string
}

/**
 * 字符串模板。
 */
export class StringTemplate {
  /**
   * 渲染字符串模板。语法：
   *
   * - 用 `{key}` 直接替换；
   * - 用 `{key#10}` 直接替换，取前10个字符省略；
   * - 用 `{key:param1,param2}` 执行函数替换；
   * - 用 `{{key==='test'?'hi':'hello'}}` 执行代码替换（内部使用 eval 实现，需开启选项里的 `code` 参数）。
   *
   * @param template 要渲染的模板
   * @param data 渲染数据
   * @param options 渲染选项
   * @returns 返回渲染后字符串
   */
  static render(
    template: string,
    data: Record<string, any>,
    options?: StringTemplateRenderOptions,
  ) {
    const onlyCode = !!options?.onlyCode
    const enableCode = onlyCode || !!options?.code
    const beforeReplace = options?.beforeReplace || ((v: string) => v)
    const keys = Object.keys(data)
    if (!onlyCode) {
      for (const key of keys) {
        template =
          typeof data[key] === 'function'
            ? template.replace(
                new RegExp(`\\{${key}(:.+?)?\\}`, 'g'),
                (_, params: string) => {
                  return beforeReplace(
                    data[key].call(
                      null,
                      ...(params ? params.substring(1) : '').split(','),
                    ),
                    key,
                  )
                },
              )
            : enableCode
            ? template.replace(
                new RegExp(`(?<!\\$)\\{${key}(?:#(\\d+))?\\}`, 'g'),
                (_, len) =>
                  beforeReplace(
                    len
                      ? toSingleLineString(String(data[key]), +len)
                      : data[key],
                    key,
                  ),
              )
            : template.replace(
                new RegExp(`{${key}(?:#(\\d+))?\\}`, 'g'),
                (_, len) =>
                  beforeReplace(
                    len
                      ? toSingleLineString(String(data[key]), +len)
                      : data[key],
                    key,
                  ),
              )
      }
    }
    if (enableCode) {
      template = template.replace(/\{\{(.+?)\}\}/g, (_, code) => {
        // 需在 eval 里函数两边加上括号才能返回函数
        const res = eval(`(function (data) {
          ${keys.map(key => `var ${key} = data["${key}"];`).join('')}
          return ${code};
        })`)(data)
        if (res == null || res === true || res === false) {
          return beforeReplace('', '')
        }
        return beforeReplace(res, '')
      })
    }
    return template
  }

  /** 判断是否有代码块 */
  static hasCodeBlock(template: string): boolean {
    return /\{\{(.+?)\}\}/.test(template)
  }
}
