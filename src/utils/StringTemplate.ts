export interface StringTemplateRenderOptions {
  /** 是否启用代码渲染，需环境支持 eval */
  code?: boolean
  /** 是否仅代码渲染 */
  onlyCode?: boolean
}

/**
 * 字符串模板。
 */
export class StringTemplate {
  /**
   * 渲染字符串模板。语法：
   *
   * - 用 `{key}` 直接替换；
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
    const keys = Object.keys(data)
    if (!onlyCode) {
      for (const key of keys) {
        template =
          typeof data[key] === 'function'
            ? template.replace(
                new RegExp(`\\{${key}(:.+?)?\\}`, 'g'),
                (_, params: string) => {
                  return data[key].call(
                    null,
                    ...(params ? params.substring(1) : '').split(','),
                  )
                },
              )
            : enableCode
            ? template.replace(
                new RegExp(`(?<!\\$)\\{${key}\\}`, 'g'),
                data[key],
              )
            : template.replaceAll(`{${key}}`, data[key])
      }
    }
    if (enableCode) {
      template = template.replace(/\{\{(.+?)\}\}/g, (_, code) => {
        // 需在 eval 里函数两边加上括号才能返回函数
        return eval(`(function (data) {
          ${keys.map(key => `var ${key} = data["${key}"];`).join('')}
          return ${code};
        })`)(data)
      })
    }
    return template
  }

  /** 判断是否有代码块 */
  static hasCodeBlock(template: string): boolean {
    return /\{\{(.+?)\}\}/.test(template)
  }
}
