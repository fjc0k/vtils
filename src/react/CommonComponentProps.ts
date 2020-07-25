import React from 'react'

/**
 * 常用的组件属性。
 */
export interface CommonComponentProps<TRef = never> {
  key?: React.Key
  ref?: React.Ref<TRef>
  className?: string
  style?: React.CSSProperties
}
