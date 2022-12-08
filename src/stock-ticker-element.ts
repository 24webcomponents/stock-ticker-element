const html = String.raw
/**
 * An example Custom Element. This documentation ends up in the
 * README so describe how this elements works here.
 *
 * You can event add examples on the element is used with Markdown.
 *
 * ```
 * <stock-ticker></stock-ticker>
 * ```
 */
import '../src/number-format-element.ts'
class StockTickerElement extends HTMLElement {
  static observedAttributes = ['value']
  #renderRoot!: ShadowRoot

  get initialValue(): number {
    return Number(this.getAttribute('initial-value')) || 0
  }

  get value(): number {
    return Number(this.getAttribute('value')) || 0
  }

  set value(value: number) {
    this.setAttribute('value', `${value}`)
  }

  connectedCallback(): void {
    this.#renderRoot = this.attachShadow({mode: 'open'})
    this.#renderRoot.innerHTML = html`
      <style>
        :host([down]) {
          color: red;
        }
        :host(:not([down])) {
          color: green;
        }
        [arrow] {
          display: none;
        }
        :host([down]) [arrow='down'] {
          display: inline-block;
        }
        :host(:not([down])) [arrow='up'] {
          display: inline-block;
        }
      </style>
      <span arrow="down">▼</span>
      <span arrow="up">▲</span>
      <number-format lang="en" format-style="currency" currency="usd"></number-format>
      <number-format lang="en" format-style="percent"></number-format>
    `
  }

  attributeChangedCallback(name: 'value', oldValue, newValue) {
    if (!this.isConnected || !this.#renderRoot) return
    this.toggleAttribute('down', this.initialValue > this.value)
    const nf = this.#renderRoot.querySelector('number-format')
    const pf = this.#renderRoot.querySelector('number-format[format-style="percent"]')
    nf.value = newValue
    pf.value = (100 / this.initialValue) * (this.initialValue - this.value)
    pf.update()
    nf.update()
  }
}

declare global {
  interface Window {
    StockTickerElement: typeof StockTickerElement
  }
}

export default StockTickerElement

if (!window.customElements.get('stock-ticker')) {
  window.StockTickerElement = StockTickerElement
  window.customElements.define('stock-ticker', StockTickerElement)
}
