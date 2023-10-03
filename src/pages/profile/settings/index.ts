import Block from '../../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { Link } from '../../../components/link/index.ts'
import { Input } from '../../../components/input/index.ts'
import { Button } from '../../../components/button/index.ts'
import { Avatar } from '../../../components/avatar/index.ts'
import { onSubmitForm } from '../../../utils/events/onSubmitForm.ts'
import AuthController from '../../../controllers/AuthController.ts'
import UserAPI from '../../../api/UserAPI.ts'
import {
  UserChangePasswordRequest,
  UserResponse,
  UserUpdateRequest
} from '../../../api/types.ts'
import { withStore } from '../../../utils/Store'

type ProfileProps = {
  user: UserResponse
  events?: Record<string, (e: Event) => unknown>
}

async function fetchFormUpdate(
  formId: 'profile' | 'changePassword',
  values: UserUpdateRequest | UserChangePasswordRequest
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await UserAPI[formId](values as any)
  } catch (e) {
    console.error(formId, values, e)
  }
}

class SettingsPageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      events: {
        submit: async (e: Event) => {
          e.preventDefault()
          const formId = (e.target as HTMLFormElement).id
          const { isValid, values } = onSubmitForm(e)

          if (!isValid) return

          switch (formId) {
            case 'profile':
              await fetchFormUpdate(formId, values as UserUpdateRequest)
              break

            case 'changePassword':
              await fetchFormUpdate(formId, values as UserChangePasswordRequest)
              break
          }
        }
      }
    })
  }

  init() {
    const { user } = this.props

    this.children.linkToBack = new Link({
      href: '/messenger',
      text: '⬅️ Вернуться'
    })

    this.children.avatar = [
      new Avatar({
        size: '130px',
        src: user.avatar
      }),
      new Input({
        type: 'file',
        name: 'avatar',
        events: {
          change: async (e) => {
            const input = e.target as HTMLInputElement
            const form = input.closest('form')
            const image = form?.querySelector('img') as HTMLImageElement

            if (!form) return

            const file = input.files?.[0]
            if (image && file) {
              image.src = window.URL.createObjectURL(file)
            }

            try {
              await UserAPI.avatar(new FormData(form))
            } catch (e) {
              image.src = ''
              console.error(e)
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
        click: () => {
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
