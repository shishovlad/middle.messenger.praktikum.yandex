import template from './template.hbs'
import './template.css'
import { ChatResponse, MessageResponse } from '../../api/types.ts'
import Block from '../../utils/Block.ts'
import { Button } from '../button/index.ts'
import MessagesController from '../../controllers/MessagesController.ts'
import { Message } from '../message/index.ts'
import store, { withStore } from '../../utils/Store.ts'
import { Input } from '../input/index.ts'
import ChatsController from '../../controllers/ChatsController.ts'

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
          if (!chatId) return

          try {
            await ChatsController.delete(chatId)
          } catch (e) {
            console.error(e)
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

          if (!message.length) return
          input.setValue('')

          try {
            MessagesController.sendMessage(this.props.selectedChat!.id, message)
          } catch (e) {
            console.error(e)
          }
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
