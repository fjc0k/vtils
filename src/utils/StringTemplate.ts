export interface StringTemplateRenderOptions {
  /** 是否启用代码渲染，需环境支持 eval */
  code?: boolean
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
    const enableCode = !!options?.code
    const keys = Object.keys(data)
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
          ? template.replace(new RegExp(`(?<!\\$)\\{${key}\\}`, 'g'), data[key])
          : template.replaceAll(`{${key}}`, data[key])
    }
    if (enableCode) {
      template = template.replace(/\{\{(.+?)\}\}/g, (_, code) => {
        return eval(`
          (() => {
            const {${keys.join(',')}} = ${JSON.stringify(data)};
            return ${code};
          })()
        `)
      })
    }
    return template
  }
}
