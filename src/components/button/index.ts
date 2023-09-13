import Block from '../../utils/Block'
import template from './button.hbs'
import './button.css'

interface ButtonProps {
  type: HTMLButtonElement['type']
  label: string
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {}
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
