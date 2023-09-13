import Block from '../../../../utils/Block'
import template from './template.hbs'
import './template.css'

interface DialogHeaderProps {
  name: string
}

export class DialogHeader extends Block {
  constructor(props: DialogHeaderProps) {
    super({
      ...props
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
