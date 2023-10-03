import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import ChatsController from '../../controllers/ChatsController.ts'
import store, { withStore } from '../../utils/Store.ts'
import { ChatResponse } from '../../api/types.ts'
import { ChatPreview } from '../chat-preview/index.ts'
import { Button } from '../button/index.ts'
import { Link } from '../link/index.ts'
import { Input } from '../input/index.ts'

type ChatsProps = {
  chats: ChatResponse[]
  isLoaded: boolean
}

class ChatsBase extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super({ ...props })
  }

  protected init() {
    this.children.buttonCreateChat = new Button({
      label: '➕ Создать чат',
      type: 'button',
      variant: 'outline',
      events: {
        click: () => {
          store.set('messengerView', 'chat-create')
        }
      }
    })

    this.children.linkToProfile = new Link({
      href: '/settings',
      text: 'Профиль ➡️'
    })

    this.children.search = new Input({
      name: 'message',
      type: 'text',
      placeholder: '🔍 Поиск',
      events: {
        change: async () => {
          const value = this.children.search.getValue()
          await ChatsController.list({ title: value })
        }
      }
    })

    this.children.chats = this.createChats(this.props)
  }

  componentDidUpdate(_oldProps: ChatsProps, newProps: ChatsProps): boolean {
    this.children.chats = this.createChats(newProps)

    return true
  }

  private createChats(props: ChatsProps) {
    return props.chats.map((data) => {
      return new ChatPreview({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id)
          }
        }
      })
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props })
  }
}

const withChats = withStore((state) => {
  return {
    chats: [...(state.chats || [])]
  }
})

export const Chats = withChats(ChatsBase)
