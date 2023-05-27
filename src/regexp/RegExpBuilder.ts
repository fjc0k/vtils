export interface RegExpBuilderOptions {
  baseRegExp: RegExp
}

export interface RegExpBuilderBuildOptions {
  global?: boolean
  exact?: boolean
}

export class RegExpBuilder {
  constructor(private options: RegExpBuilderOptions) {}

  getBaseRegExp(): RegExp {
    return new RegExp(this.options.baseRegExp)
  }

  build(options?: RegExpBuilderBuildOptions): RegExp {
    const regExp = new RegExp(
      options?.exact
        ? `^${this.options.baseRegExp.source}$`
        : this.options.baseRegExp.source,
      this.options.baseRegExp.flags +
        (options?.global && this.options.baseRegExp.flags.indexOf('g') === -1
          ? 'g'
          : ''),
    )
    return regExp
  }
}
