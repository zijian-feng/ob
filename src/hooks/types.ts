export interface NamespaceProps {
  /**
   * 前缀
   */
  prefix?: string
  /**
   * 组件类型
   */
  type?: string
  /**
   * 分隔符
   */
  separator?: string
}

export type JoinType = string | Record<string, boolean> | boolean