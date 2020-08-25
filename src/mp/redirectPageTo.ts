import { navigatePageTo } from './navigatePageTo'

export function redirectPageTo(url: string, query?: AnyObject): Promise<any> {
  return navigatePageTo(url, query, true)
}
