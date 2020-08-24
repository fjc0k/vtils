import { navigatePageTo } from './navigatePageTo'

export function redirectPageTo(url: string): Promise<any> {
  return navigatePageTo(url, true)
}
