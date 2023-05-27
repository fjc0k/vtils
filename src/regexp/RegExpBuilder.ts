export interface RegExpBuilderOptions {
  /** 基础正则表达式 */
  baseRegExp: RegExp
}

export interface RegExpBuilderBuildOptions {
  /** `g` */
  global?: boolean
  /** `^...$` */
  exact?: boolean
  /** `...+` */
  repeat?: boolean
}

export class RegExpBuilder {
  constructor(private options: RegExpBuilderOptions) {}

  getBaseRegExp(): RegExp {
    return new RegExp(this.options.baseRegExp)
  }

  build(options?: RegExpBuilderBuildOptions): RegExp {
    let regExpSource = `(?:${this.options.baseRegExp.source})`
    if (options?.repeat) {
      regExpSource = `${regExpSource}+`
    }
    if (options?.exact) {
      regExpSource = `^${regExpSource}$`
    }

    let regExpFlags = this.options.baseRegExp.flags
    if (options?.global && this.options.baseRegExp.flags.indexOf('g') === -1) {
      regExpFlags = `${regExpFlags}g`
    }

    const regExp = new RegExp(regExpSource, regExpFlags)
    return regExp
  }
}
