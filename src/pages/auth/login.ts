import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { Input } from '../../components/input/index.ts'
import { Button } from '../../components/button/index.ts'
import { onSubmitForm } from '../../utils/events/onSubmitForm.ts'
import AuthController from '../../controllers/AuthController.ts'
import { SigninRequest } from '../../api/types.ts'
import { Link } from '../../components/link/index.ts'

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
      link: new Link({
        text: 'Нет аккаунта?',
        href: '/sign-up'
      }),
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
