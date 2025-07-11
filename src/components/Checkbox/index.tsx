import useNamespace from '@/hooks'
import { defineCustomElement } from "@/utils"
import { useEffect, useRef, useState, type HTMLProps } from 'react'
import stylesheets from './index.scss?inline'
import type { CheckboxProps } from "./types"

function ReactComponent(props: CheckboxProps) {
  const {
    children,
    extra,
    value,
    onChange,
    _hostElement,
    type='default',
    checked: checkedProps,
  } = props
  const [checked, setChecked] = useState(!!checkedProps)
  const ns = useNamespace({ type: 'checkbox', prefix: 'trove' })

  const handleChange: HTMLProps<HTMLInputElement>['onChange'] = () => {
    onChange?.(!checked)

    if (_hostElement) {
      const event = new CustomEvent('change', {
        detail: {
          checked: !checked,
          value
        },
        bubbles: true,
        composed: true
      })

      _hostElement.dispatchEvent(event)
    }
    setChecked(!checked)
  }

  return (
    <div
      className={
        ns.cls(
          ns.name,
          `is-${type}`,
          checked && 'is-active'
        )
      }
    >
      <input
        value={value}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <div className="checkbox-label__container">
        <label>
          <slot>
            {children}
          </slot>
        </label>
        {extra && (
          <label className="checkbox-label__extra">{extra}</label>
        )}
      </div>
    </div>
  )
}

export default function Checkbox(props: CheckboxProps) {
  const {
    onChange,
  } = props
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ref.current?.addEventListener('change', (e) => {
      const { detail } = (e as CustomEvent<{ checked: boolean, value: string }>)
      onChange?.(detail.checked)
    })
  }, [])
  return (
    <trove-checkbox
      {...props}
      ref={ref}
      stylesheet={
        `
          ${stylesheets}
        `
      }
    />
  )
}

export const install = () => {
  const CustomCheckbox = defineCustomElement(ReactComponent)
  customElements.define('trove-checkbox', CustomCheckbox)
}
