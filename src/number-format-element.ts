/**
 * An example Custom Element. This documentation ends up in the
 * README so describe how this elements works here.
 *
 * You can event add examples on the element is used with Markdown.
 *
 * ```
 * <number-format></number-format>
 * ```
 */
class NumberFormatElement extends HTMLElement implements Omit<Intl.NumberFormatOptions, 'style'> {
  #renderRoot!: ShadowRoot

  get #lang() {
    return this.getAttribute('lang') || this.closest('[lang]')?.getAttribute('lang') || ''
  }

  connectedCallback(): void {
    this.#renderRoot = this.attachShadow({mode: 'open'})
    this.update()
  }

  update() {
    const options = {
      unit: this.unit,
      style: this.formatStyle,
      currency: this.currency,
      unitDisplay: this.unitDisplay,
      notation: this.notation,
    } as Intl.NumberFormatOptions
    console.log(options)
    const numberFormat = new Intl.NumberFormat(this.#lang, options)
    this.#renderRoot.textContent = numberFormat.format(this.value)
  }

  get value(): number {
    return Number(this.getAttribute('value')) || 0
  }

  set value(value: number) {
    this.setAttribute('value', `${value}`)
  }

  get currency(): string | undefined {
    return this.getAttribute('currency') || undefined
  }

  set currency(value: string) {
    this.setAttribute('currency', `${value}`)
  }

  get currencyDisplay() {
    return this.getAttribute('currency-display') || ''
  }

  set currencyDisplay(value: string) {
    this.setAttribute('currency-display', `${value}`)
  }

  get currencySign() {
    return this.getAttribute('currency-sign') || ''
  }

  set currencySign(value: string) {
    this.setAttribute('currency-sign', `${value}`)
  }

  get unit() {
    return this.getAttribute('unit') || undefined
  }

  set unit(value) {
    this.setAttribute('unit', `${value}`)
  }

  get unitDisplay() {
    const value = this.getAttribute('unit-display')
    if (value === 'short') return 'short'
    if (value === 'long') return 'long'
    if (value === 'narrow') return 'narrow'
    return
  }

  set unitDisplay(value: 'short' | 'long' | 'narrow' | undefined) {
    this.setAttribute('unit-display', `${value}`)
  }

  get compactDisplay() {
    const value = this.getAttribute('compact-display')
    if (value === 'short') return 'short'
    if (value === 'long') return 'long'
    return
  }

  set compactDisplay(value: 'short' | 'long' | undefined) {
    this.setAttribute('compact-display', `${value}`)
  }

  get useGrouping() {
    return this.hasAttribute('use-grouping')
  }

  set useGrouping(value: boolean | undefined) {
    this.toggleAttribute('use-grouping', value)
  }

  get trailingZeroDisplay() {
    return this.hasAttribute('use-grouping')
  }

  set trailingZeroDisplay(value) {
    this.toggleAttribute('use-grouping', value)
  }

  get formatStyle() {
    return this.getAttribute('format-style') || ''
  }

  set formatStyle(value: Intl.NumberFormatOptions['style']) {
    this.setAttribute('format-style', `${value}`)
  }

  get notation() {
    const value = this.getAttribute('notation')
    if (value === 'standard') return 'standard'
    if (value === 'scientific') return 'scientific'
    if (value === 'engineering') return 'engineering'
    if (value === 'compact') return 'compact'
    return 'standard'
  }

  set noation(value: 'standard' | 'scientific' | 'engineering' | 'compact' | undefined) {
    this.setAttribute('notation', `${value}`)
  }
}

declare global {
  interface Window {
    NumberFormatElement: typeof NumberFormatElement
  }
}

export default NumberFormatElement

if (!window.customElements.get('number-format')) {
  window.NumberFormatElement = NumberFormatElement
  window.customElements.define('number-format', NumberFormatElement)
}
