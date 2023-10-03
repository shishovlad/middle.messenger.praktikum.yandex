import Block from '../../utils/Block.ts'
import template from './input.hbs'
import './input.css'
import {
  ValidationCode,
  onValidationInput
} from '../../utils/events/onValidationInput.ts'

interface InputProps {
  name: string
  type: 'text' | 'email' | 'password' | 'tel' | 'file' | 'submit'
  label?: string
  value?: string
  placeholder?: string
  error?: string
  events?: Record<string, (e: Event) => unknown>
  rules?: ValidationCode[]
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      eventElement: 'input',
      events: {
        ...props.events,
        blur: (e: Event) => {
          const input = e.target as HTMLInputElement
          const value = input.value
          const error = onValidationInput(input, props.rules ?? [])

          this.setProps({
            value,
            error
          })
        }
      }
    })
  }

  private getInputElement() {
    const div = this.element as HTMLDivElement
    return div.querySelector('input') as HTMLInputElement
  }

  public getName() {
    return this.getInputElement().name
  }

  public getValue() {
    return this.getInputElement().value
  }

  public setValue(value: string): void {
    this.getInputElement().value = value
  }

  render() {
    return this.compile(template, this.props)
  }
}
