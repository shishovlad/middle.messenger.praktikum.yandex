import Block from '../../../utils/Block'
import template from './template.hbs'
import './template.css'

export class ChatDialogPage extends Block {
  constructor() {
    super({})
  }

  render() {
    return this.compile(template, this.props)
  }
}
