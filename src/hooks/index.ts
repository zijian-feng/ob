import { useMemo } from 'react'
import type { JoinType, NamespaceProps } from './types'

export default function useNamespace(props?: NamespaceProps) {
  let {
    type = '',
    prefix = '',
    separator = '-'
  } = props || {}

  const name = useMemo(() => {
    if (!type) {
      type = ''
    }
    if (!prefix) {
      prefix = ''
    }
    if (!separator) {
      separator = ''
    }
    return `${prefix}${prefix && separator}${type}`
  }, [prefix, separator, type])

  const ns = {
    name,
    /**
     * 使用驼峰命名法
     * @returns 转换后的字符串
     */
    toCamelCase() {
      if (separator) {
        return this.name.replace(new RegExp(`${separator}(\\w)`, 'g'), (_, c) => c.toUpperCase())
      }
      return prefix + type.charAt(0).toUpperCase() + type.slice(1)
    },
    /**
     * 使用帕斯卡命名法
     * @returns 转换后的字符串
     */
    toPascalCase() {
      const camelCase = this.toCamelCase()
      return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
    },
    /**
     * 使用全大写命名法
     * @returns 转换后的字符串
     */
    toUpperCase() {
      return this.name.toUpperCase().split(separator).join('')
    },
    /**
     * 使用全小写命名法
     * @returns 转换后的字符串
     */
    toLowerCase() {
      return this.name.toLowerCase().split(separator).join('')
    },
    /**
     * 组合类名
     */
    cls(...rest: JoinType[]) {
      return rest.map((str) => {
        if (!str || typeof str === 'string') {
          return str
        }
        if (typeof str === 'boolean') {
          return ''
        }
        return Object.keys(str).filter(key => str[key])
      }).filter(Boolean).join(' ')
    }

  }

  return ns
}