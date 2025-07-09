import type { ComponentType } from "react"
import { createRoot, type Root } from "react-dom/client"

export const defineCustomElement = (
  ReactComponent: ComponentType,
  observedAttributes: string[] = []
) => {
  return class extends HTMLElement {
    private root: Root
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.root = createRoot(this.shadowRoot!)
    }

    static get observedAttributes() {
      return observedAttributes
    }

    connectedCallback() {
      this.render()
    }

    attributeChangedCallback() {
      this.render()
    }

    disconnectedCallback() {
      this.root.unmount();
    }

    getReactProps() {
      return observedAttributes.reduce((props, attr) => {
        const value = this.getAttribute(attr);
        if (!value) return props;
        try {
          // 尝试解析 JSON 值（用于对象/数组）
          props[attr] = JSON.parse(value);
        } catch {
          // 普通字符串值
          props[attr] = value;
        }
        return props;
      }, {} as Record<string, unknown>);
    }

    render() {
      console.log(this.getReactProps());
      
      this.root.render(
        <ReactComponent
          {...this.getReactProps()}
        />
      )
    }
  }
}