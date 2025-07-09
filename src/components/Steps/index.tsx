import { defineCustomElement } from "@/utils"

export default function Steps() {
  return (
    <div>steps</div>
  )
}

export const CustomSteps = defineCustomElement(Steps, ['name'])

customElements.define('trove-steps', CustomSteps)
