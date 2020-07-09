import { useSearchParam as _useSearchParam } from 'react-use'
import { useRouter } from '@tarojs/taro'

export const useSearchParam: typeof _useSearchParam = param => {
  const { params } = useRouter()
  return params[param] == null ? null : params[param]
}
