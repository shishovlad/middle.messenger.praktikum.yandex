import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import chats from './mocks/chats'
import messages from './mocks/messages'
import { DialogHeader } from './components/header'
import { DialogFooter } from './components/footer'

export class ChatsPage extends Block {
  constructor() {
    super({
      ...chats,
      ...messages
    })
  }

  init() {
    this.children.dialogHeader = new DialogHeader({
      name: 'Киноклуб'
    })

    this.children.dialogFooter = new DialogFooter({})
  }

  render() {
    return this.compile(template, this.props)
  }
}
