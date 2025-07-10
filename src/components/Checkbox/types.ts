import type { CustomElementProps } from "@/types"
import type { Ref } from "react"

export interface CheckboxProps extends CustomElementProps {
  /**
   * 引用
   */
  ref?: Ref<HTMLElement>
  /**
   * 宿主元素
   */
  _hostElement?: HTMLElement
  /**
   * 文本
   */
  label: string
  /**
   * 选中值
   */
  value: string
  /**
   * 类型
   * @default default
   */
  type?: 'default' | 'card' | 'pureCard'
  /**
   * 副文本
   */
  extra?: string
  /**
   * 选中状态
   */
  checked?: boolean
  /**
   * onChange
   */
  onChange?: (checked: boolean) => void
}
