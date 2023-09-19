import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { ChatUser, UserResponse } from '../../api/types'

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
