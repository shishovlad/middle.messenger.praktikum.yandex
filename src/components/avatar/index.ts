import Block from '../../utils/Block.ts'
import template from './avatar.hbs'
import './avatar.css'
import ResourcesAPI from '../../api/ResourcesAPI.ts'

export interface AvatarProps {
  size: string
  src?: string | null
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      src: props.src
        ? ResourcesAPI.get(props.src)
        : 'https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-200',
      events: {}
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
