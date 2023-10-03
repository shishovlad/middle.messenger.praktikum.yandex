import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { ChatUser, UserResponse } from '../../api/types.ts'

type UsersProps = {
  list: (UserResponse | ChatUser)[]
  eventElement?: string
  events?: Record<string, (e: Event) => unknown>
}

export class Users extends Block<UsersProps> {
  constructor(props: UsersProps) {
    super({
      ...props,
      eventElement: '.user',
      events: {
        ...props.events
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
