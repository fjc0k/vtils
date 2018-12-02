import forOwn from './forOwn'

export default function defaultValue<
  T extends { [key: string]: any },
  X extends Partial<T>,
>(getDefaultValue: (obj: X) => T, obj: X): T {
  const defaultValue = getDefaultValue(obj)
  forOwn(obj, (value, key) => {
    if (value != null) {
      defaultValue[key] = value
    }
  })
  return defaultValue
}
