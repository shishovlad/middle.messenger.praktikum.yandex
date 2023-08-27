import Block from '../../../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Input } from '../../../../components/input'

interface DialogFooterProps {}

export class DialogFooter extends Block {
  constructor(props: DialogFooterProps) {
    super({
      ...props,
      inputMessage: new Input({
        type: 'text',
        name: 'message',
        label: '',
        rules: ['required']
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
