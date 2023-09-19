import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { onSubmitForm } from '../../utils/events/onSubmitForm'
import AuthController from '../../controllers/AuthController'
import { SigninRequest } from '../../api/types'

export class LoginPage extends Block {
  constructor() {
    const InputsAuth = [
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: '',
        placeholder: 'username',
        rules: ['required', 'login']
      }),

      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: '',
        placeholder: '••••••••••••',
        rules: ['required', 'password']
      })
    ]

    const ButtonAuth = new Button({
      type: 'submit',
      label: 'Авторизоваться'
    })

    super({
      title: 'Войти',
      InputsAuth,
      ButtonAuth,
      link: {
        text: 'Нет аккаунта?',
        href: '/sign-up'
      },
      events: {
        submit: (e: Event) => {
          const { isValid, values } = onSubmitForm(e)

          if (isValid) {
            AuthController.signin(values as SigninRequest)
          }
        }
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
