import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { withStore } from '../../utils/Store.ts'
import { Avatar } from '../avatar/index.ts'
import { ChatResponse } from '../../api/types.ts'

type ChatPreviewProps = ChatResponse & {
  selectedChat: ChatResponse
  events?: Record<string, (e: Event) => unknown>
}

export class ChatPreviewBase extends Block<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    const last_message = props.last_message
      ? {
          ...props.last_message,
          time: new Intl.DateTimeFormat('ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date(props.last_message?.time ?? ''))
        }
      : null

    super({
      ...props,
      last_message
    })
  }

  init() {
    this.children.avatar = new Avatar({
      src: this.props.avatar ?? this.props.last_message?.user?.avatar,
      size: '47px'
    })
  }

  render() {
    return this.compile(template, {
      ...this.props,
      selectedChat: this.props.id === this.props.selectedChat?.id
    })
  }
}

export const withSelectedChat = withStore((state) => {
  const selectedChat = state.chats.find((a) => a.id === state.selectedChatId)

  return {
    selectedChat
  }
})

export const ChatPreview = withSelectedChat(ChatPreviewBase)
