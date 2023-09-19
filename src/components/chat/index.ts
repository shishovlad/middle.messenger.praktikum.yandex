import template from './template.hbs'
import './template.css'
import { ChatResponse, MessageResponse } from '../../api/types'
import Block from '../../utils/Block'
import { Button } from '../button'
import MessagesController from '../../controllers/MessagesController'
import { Message } from '../message'
import store, { withStore } from '../../utils/Store'
import { Input } from '../input'
import ChatsController from '../../controllers/ChatsController'

type ChatProps = {
  selectedChat: ChatResponse | undefined
  messages: MessageResponse[]
  userId: number
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props)
  }

  protected init() {
    this.children.buttonToChatUsers = new Button({
      label: '👥 Участники',
      type: 'button',
      variant: 'outline',
      events: {
        click: () => {
          store.set('messengerView', 'chat-users')
        }
      }
    })
    this.children.buttonToChatDelete = new Button({
      label: '⛔️ Удалить чат',
      type: 'button',
      variant: 'outline',
      events: {
        click: async () => {
          const chatId = this.props.selectedChat?.id
          if (chatId) {
            await ChatsController.delete(chatId)
          }
        }
      }
    })

    this.children.messages = this.createMessages(this.props)

    this.children.input = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message'
    })

    this.children.button = new Button({
      label: 'Отправить',
      type: 'button',
      events: {
        click: () => {
          const input = this.children.input as Input
          const message = input.getValue()

          input.setValue('')

          MessagesController.sendMessage(this.props.selectedChat!.id, message)
        }
      }
    })
  }

  componentDidUpdate(_oldProps: ChatProps, newProps: ChatProps): boolean {
    this.children.messages = this.createMessages(newProps)

    return true
  }

  private createMessages(props: ChatProps) {
    return props.messages.map((data) => {
      return new Message({
        ...data,
        isMine: props.userId === data.user_id
      })
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChatId
  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id
    }
  }

  const selectedChat = state.chats.find((a) => a.id === selectedChatId)
  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat,
    userId: state.user.id
  }
})

export const Chat = withSelectedChatMessages(ChatBase)
