import type { CustomElementProps } from "@/types"
import type { ComponentType } from "react"
import { createRoot, type Root } from "react-dom/client"

export const defineCustomElement = <T extends CustomElementProps>(
  ReactComponent: ComponentType<T>
) => {
  return class extends HTMLElement {
    private root?: Root
    constructor() {
      super()
    }

    connectedCallback() {
      // 创建影子节点
      this.attachShadow({ mode: 'open' })
      this.root = createRoot(this.shadowRoot!)
      this.render()
    }

    attributeChangedCallback() {
      this.render()
    }

    disconnectedCallback() {
      this.root?.unmount();
    }

    getReactProps(): T {
      const attributeNames = this.getAttributeNames()
      return attributeNames.reduce((props, attr) => {
        const value = this.getAttribute(attr) as T[keyof T];
        if (!value) return props;
        try {
          // 尝试解析 JSON 值（用于对象/数组）
          props[attr as unknown as keyof T] = JSON.parse(value as string);
        } catch {
          // 普通字符串值
          props[attr  as unknown as keyof T] = value;
        }
        return props;
      }, {} as T);
    }

    render() {
      if (!this.root) {
        return;
      }
      const props = this.getReactProps()
      const style = document.createElement('style')
      style.textContent = props.stylesheet ?? ''
      this.shadowRoot?.appendChild(style)
      this.root.render(
        <ReactComponent {...props} _hostElement={this} />
      )
    }
  }
}