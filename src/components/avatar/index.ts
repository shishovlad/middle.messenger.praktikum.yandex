import Block from '../../utils/Block'
import template from './avatar.hbs'
import './avatar.css'

export interface AvatarProps {
  src: string
  size: string
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {}
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
