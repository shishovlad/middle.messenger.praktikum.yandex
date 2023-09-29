import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { MessageResponse as IMessage } from '../../api/types.ts'

type MessageProps = IMessage & {
  isMine: boolean
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    const time = new Intl.DateTimeFormat('ru', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(props.time))

    super({
      ...props,
      time
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
