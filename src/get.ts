import forOwn from './forOwn'
import toPath from './toPath'

export default function get(value: object, path: string | string[], defaultValue?: any): any {
  path = Array.isArray(path) ? path : toPath(path)
  const result: any = defaultValue
  const last: any = value
  for (let i = 0, len = path.length; i < len; i++) {

  }
}
