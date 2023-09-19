import Block from '../../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Link } from '../../../components/link'
import { Input } from '../../../components/input'
import { Button } from '../../../components/button'
import { Avatar } from '../../../components/avatar'
import { onSubmitForm } from '../../../utils/events/onSubmitForm'
import AuthController from '../../../controllers/AuthController'
import UserAPI from '../../../api/UserAPI'
import {
  UserChangePasswordRequest,
  UserResponse,
  UserUpdateRequest
} from '../../../api/types'
import { withStore } from '../../../utils/Store'

type ProfileProps = {
  user: UserResponse
  events?: Record<string, (e: Event) => unknown>
}

class SettingsPageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          e.preventDefault()
          const formId = (e.target as HTMLFormElement).id
          const { isValid, values } = onSubmitForm(e)

          if (isValid) {
            switch (formId) {
              case 'profile':
                UserAPI.profile(values as UserUpdateRequest)
                break

              case 'changePassword':
                UserAPI.changePassword(values as UserChangePasswordRequest)
                break
            }
          }
        }
      }
    })
  }

  init() {
    const { user } = this.props

    this.children.avatar = [
      new Avatar({
        size: '130px',
        src: user.avatar
      }),
      new Input({
        type: 'file',
        name: 'avatar',
        events: {
          change: (e) => {
            const input = e.target as HTMLInputElement
            const form = input.closest('form')
            const image = form?.querySelector('img') as HTMLImageElement

            const file = input.files?.[0]
            if (image && file) {
              image.src = window.URL.createObjectURL(file)
            }

            if (form) {
              UserAPI.avatar(new FormData(form))
            }
          }
        }
      })
    ]

    this.children.profile = [
      new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Иван',
        value: user.first_name,
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Иванов',
        value: user.second_name,
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'display_name',
        label: 'Никнейм',
        placeholder: 'Иван',
        value: user.display_name,
        rules: ['required', 'login']
      }),
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        placeholder: 'username',
        value: user.login,
        rules: ['required', 'login']
      }),
      new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        placeholder: 'email@gmail.com',
        value: user.email,
        rules: ['required', 'email']
      }),
      new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        placeholder: '+79999999999',
        value: user.phone,
        rules: ['required', 'phone']
      }),
      new Button({
        type: 'submit',
        label: 'Сохранить'
      })
    ]

    this.children.password = [
      new Input({
        type: 'password',
        name: 'oldPassword',
        label: 'Старый пароль',
        placeholder: '••••••••••••',
        rules: ['required', 'password']
      }),
      new Input({
        type: 'password',
        name: 'newPassword',
        label: 'Новый пароль',
        placeholder: '••••••••••••',
        rules: ['required', 'password']
      }),
      new Button({
        type: 'submit',
        label: 'Сохранить'
      })
    ]

    this.children.logout = new Link({
      href: '/',
      text: 'Выйти',
      className: 'link-logout',
      events: {
        click: (e) => {
          e.preventDefault()
          AuthController.logout()
        }
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ user: { ...state.user } }))

export const SettingsPage = withUser(SettingsPageBase)
