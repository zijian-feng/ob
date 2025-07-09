import styles from './index.module.scss'
import type { CheckboxProps } from "./types"
import { defineCustomElement } from "@/utils"

function ReactComponent(props: CheckboxProps) {
  const { label, value } = props
  return (
    <>
      <input type="checkbox" id={value} />
      <label htmlFor={value}>{label}</label>
    </>
  )
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <trove-checkbox
      class={
        styles['trove-checkbox']
      }
      stylesheet={
        `
          label {
            user-select: none;

            &:hover {
              cursor: pointer;
            }
          }
        `
      }
      {...props}
    />
  )
}

export const install = () => {
  const CustomCheckbox = defineCustomElement(ReactComponent, ['label', 'value'])
  customElements.define('trove-checkbox', CustomCheckbox)
}
