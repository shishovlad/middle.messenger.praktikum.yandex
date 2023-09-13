import Block from '../../utils/Block'
import template from './input.hbs'
import './input.css'
import {
  ValidationCode,
  onValidationInput
} from '../../utils/events/onValidationInput'

interface InputProps {
  name: string
  type: 'text' | 'email' | 'password' | 'tel'
  label: string
  value?: string
  placeholder?: string
  error?: string
  events?: Event
  rules?: ValidationCode[]
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      eventElement: 'input',
      events: {
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

  render() {
    return this.compile(template, this.props)
  }
}
