import { padStart } from 'lodash-uni'

/**
 * UTF8 字符转为 Unicode 码点。
 *
 * @param character 字符，支持多个字符，返回的码点将以 `-` 分割
 */
export function characterToCodepoint(character: string): string {
  return [...character]
    .map(char => padStart(char.codePointAt(0)!.toString(16), 4, '0'))
    .join('-')
}
