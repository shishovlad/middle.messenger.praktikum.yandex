import { Button } from './index.ts'
import { expect } from 'chai'

describe('Button', () => {
  it('should render', () => {
    new Button({
      label: 'My button',
      type: 'button'
    })
  })

  it('should render outline variant', () => {
    const link = new Button({
      label: 'My button',
      type: 'button',
      variant: 'outline'
    })
    const element = link.getContent() as HTMLButtonElement

    expect(element.className).to.eq('btn outline')
  })

  it('element should return button', () => {
    const button = new Button({
      label: 'My button',
      type: 'button'
    })
    const element = button.getContent()

    expect(element).to.be.instanceof(window.HTMLButtonElement)
  })

  it('element should return button with label', () => {
    const button = new Button({
      label: 'My button',
      type: 'button'
    })
    const element = button.getContent() as HTMLButtonElement
    const label = element.textContent

    expect(label).to.eq('My button')
  })
})
