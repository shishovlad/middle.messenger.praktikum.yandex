import Block from '../../utils/Block.ts'
import template from './button.hbs'
import './button.css'

interface ButtonProps {
  type: HTMLButtonElement['type']
  label: string
  events?: Record<string, (e: Event) => unknown>
  variant?: 'outline'
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
