import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { Button } from '../button/index.ts'
import store from '../../utils/Store.ts'
import { Input } from '../input/index.ts'
import UserAPI from '../../api/UserAPI.ts'
import ChatsController from '../../controllers/ChatsController.ts'

export class ChatCreateBase extends Block {
  constructor() {
    super({})
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

    this.children.chatTitle = new Input({
      label: 'Название чата',
      name: 'name',
      type: 'text',
      placeholder: 'Придумайте подходящее название'
    })

    this.children.chatUsers = new Input({
      label: 'Добавить участников',
      name: 'search',
      type: 'text',
      placeholder: 'Введите логин участника',
      events: {
        change: async () => {
          const value = this.children.input.getValue()

          if (value.length > 2) {
            const list = (await UserAPI.search(value)) ?? []
            ;(this.children.users as Block).setProps({ list })
          }
        }
      }
    })

    this.children.chatButton = new Button({
      label: 'Создать',
      type: 'button',
      events: {
        click: async () => {
          const title = this.children.chatTitle.getValue()
          try {
            await ChatsController.create(title)
          } catch (e) {
            console.error(e)
          }
        }
      }
    })
  }

  render() {
    return this.compile(template, { ...this.props })
  }
}

export const ChatCreate = ChatCreateBase
