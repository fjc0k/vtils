/**
 * 是否在浏览器环境中。
 */
export default typeof window === 'object'
  && typeof document === 'object'
  && document.nodeType === 9
