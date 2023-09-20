import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Button } from '../button'
import store, { withStore } from '../../utils/Store'
import { Input } from '../input'
import UserAPI from '../../api/UserAPI'
import { Users } from '../users'
import ChatsController from '../../controllers/ChatsController'
import { ChatUserResponse } from '../../api/types'

type ChatUsersProps = {
  users: ChatUserResponse
}

export class ChatUsersBase extends Block<ChatUsersProps> {
  private selectedUsers: { add: number[]; delete: number[] } = {
    add: [],
    delete: []
  }

  constructor(props: ChatUsersProps) {
    super(props)
  }

  protected init(): void {
    this.children.back = new Button({
      label: '❌ Закрыть',
      type: 'button',
      variant: 'outline',
      events: {
        click: () => {
          store.set('messengerView', 'chat')
        }
      }
    })

    this.children.addUsers = new Users({
      list: [],
      events: {
        click: (e: Event) => this.onUserClick(e, 'add')
      }
    })

    this.children.addUsersInput = new Input({
      label: 'Добавить участника',
      name: 'search',
      type: 'text',
      placeholder: 'Введите логин участника',
      events: {
        change: async () => {
          const value = this.children.addUsersInput.getValue()

          if (value.length > 2) {
            const list = (await UserAPI.search(value)) ?? []
            ;(this.children.addUsers as Block).setProps({ list })
          }
        }
      }
    })

    this.children.addButton = new Button({
      label: 'Добавить',
      type: 'button',
      events: {
        click: async () => {
          const { selectedChatId } = store.getState()
          if (!selectedChatId) return

          try {
            await ChatsController.addUserToChat(
              selectedChatId,
              this.selectedUsers.add
            )

            this.selectedUsers.add = []
            this.children.addUsersInput.setValue('')
            ;(this.children.addUsers as Block).setProps({ list: [] })

            ChatsController.selectChat(selectedChatId)
          } catch (e) {
            console.log(e)
          }
        }
      }
    })

    this.children.deleteUsers = new Users({
      list: [],
      events: {
        click: (e: Event) => this.onUserClick(e, 'delete')
      }
    })

    this.children.deleteButton = new Button({
      label: 'Удалить',
      type: 'button',
      events: {
        click: async () => {
          const { selectedChatId } = store.getState()
          if (!selectedChatId) return

          try {
            await ChatsController.deleteUserToChat(
              selectedChatId,
              this.selectedUsers.delete
            )
            this.selectedUsers.delete = []

            ChatsController.selectChat(selectedChatId)
          } catch (e) {
            console.error(e)
          }
        }
      }
    })
  }
  componentDidUpdate(
    _oldProps: ChatUsersProps,
    newProps: ChatUsersProps
  ): boolean {
    this.children.deleteUsers = new Users({
      list: newProps.users,
      events: {
        click: (e: Event) => this.onUserClick(e, 'delete')
      }
    })

    return true
  }

  onUserClick(e: Event, arr: keyof typeof this.selectedUsers) {
    const user = e.target as HTMLDivElement
    const userId = +(user.dataset.id ?? '')

    if (userId) {
      const collection = this.selectedUsers[arr]

      const className = 'is-active'
      const found = collection.find((id) => id === userId)

      if (found) {
        this.selectedUsers[arr] = collection.filter((id) => id !== userId)
        user.classList.remove(className)
      } else {
        collection.push(+userId)
        user.classList.add(className)
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

const withChatUsers = withStore((state) => {
  const is = state.messengerView === 'chat-users'
  const selectedChatId = state.selectedChatId

  if (!is || !selectedChatId) {
    return {
      users: []
    }
  }

  return {
    users: state.chatUsers ?? []
  }
})

export const ChatUsers = withChatUsers(ChatUsersBase)
