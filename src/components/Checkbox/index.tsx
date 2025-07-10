import useNamespace from '@/hooks'
import { defineCustomElement } from "@/utils"
import { useEffect, useRef, useState, type HTMLProps } from 'react'
import styles from './index.module.scss'
import type { CheckboxProps } from "./types"

function ReactComponent(props: CheckboxProps) {
  const {
    label,
    extra,
    value,
    onChange,
    _hostElement,
    checked: checkedProps,
  } = props
  const [checked, setChecked] = useState(!!checkedProps)

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
    <>
      <input
        id={label}
        value={value}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <div className="checkbox-label__container">
        <label htmlFor={label}>{label}</label>
        {extra && (
          <span className="checkbox-label__extra">{extra}</span>
        )}
      </div>
    </>
  )
}

export default function Checkbox(props: CheckboxProps) {
  const {
    onChange,
    type = 'default'
  } = props
  const ref = useRef<HTMLElement>(null)
  const ns = useNamespace({ type: 'checkbox', prefix: 'trove' })


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
      class={
        ns.cls(
          styles[ns.name],
          styles[`is-${type}`]
        )
      }
      onChange={() => console.log(1)}
      stylesheet={
        `
          label {
            user-select: none;

            &:hover {
              cursor: pointer;
            }
          }
          input {
            appearance: none;
            width: 14px;
            height: 14px;
            outline: 1px solid rgb(133, 133, 133);
            border-radius: 4px;
            cursor: pointer;
            background-color: #fff;
            margin: 0;
            transition: .3s;
            flex-shrink: 0;
            &:checked {
              background-color: #FF8500;
              outline-color: #FF8500;
              position: relative;

              &::after {
                content: '\\2714';
                color: #FFFFFF;
                font-size: 10px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
          .checkbox-label__container {
            display: flex;
            flex-direction: column;
            row-gap: 4px;

            .checkbox-label__extra {
              opacity: 0.62;
            }
          }
        `
      }
    />
  )
}

export const install = () => {
  const CustomCheckbox = defineCustomElement(ReactComponent, ['label', 'value', 'type', 'extra', 'checked'])
  customElements.define('trove-checkbox', CustomCheckbox)
}
