import {Component} from '@tarojs/taro'

/**
 * 获取小程序原生作用域。
 */
export function useScope(this: Component) {
  return this && this.$scope || this
}
