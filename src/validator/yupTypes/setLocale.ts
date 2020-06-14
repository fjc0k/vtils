import { PartialDeep } from '../../types'

declare module 'yup/es' {
  export function setLocale(locale: PartialDeep<Locale>): void
}
