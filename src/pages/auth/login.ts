import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { onSubmitForm } from '../../utils/events/onSubmitForm'

export class LoginPage extends Block {
  constructor() {
    const InputsAuth = [
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        placeholder: 'username',
        error: '',
        rules: ['required', 'login']
      }),

      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
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
        href: '/signup'
      },
      events: {
        submit: onSubmitForm
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
