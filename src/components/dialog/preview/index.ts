import Block from '../../../utils/Block'
import template from './preview.hbs'
import { Avatar, type AvatarProps } from '../../avatar'
import './preview.css'

interface DialogPreviewProps {
  avatar: AvatarProps
  title: string
  time: string
  message: string
  badge: number
}

export class DialogPreview extends Block {
  constructor(props: DialogPreviewProps) {
    super({
      ...props,
      events: {}
    })
  }

  init() {
    this.children.UserAvatar = new Avatar(this.props.avatar as AvatarProps)
  }

  render() {
    return this.compile(template, this.props)
  }
}
