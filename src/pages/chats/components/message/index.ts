import Block from '../../../../utils/Block'
import template from './template.hbs'
import './template.css'

interface DialogMessageProps {
  text: string
  time: string
}

export class DialogMessage extends Block {
  constructor(props: DialogMessageProps) {
    super({
      ...props
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
