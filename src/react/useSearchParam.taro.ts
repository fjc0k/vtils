import { useRouter } from '@tarojs/taro'
import { useSearchParam as _useSearchParam } from 'react-use'

export const useSearchParam: typeof _useSearchParam = param => {
  const { params } = useRouter()
  return params[param] == null ? null : params[param]!
}
