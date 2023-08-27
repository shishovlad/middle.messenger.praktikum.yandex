import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { onSubmitForm } from '../../utils/events/onSubmitForm'

export class SignupPage extends Block {
  constructor() {
    const InputsAuth = [
      new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        placeholder: 'email@gmail.com',
        rules: ['required', 'email']
      }),
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        placeholder: 'username',
        rules: ['required', 'login']
      }),
      new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        placeholder: 'Иван',
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        placeholder: 'Иванов',
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        placeholder: '+7 999 999 99 99',
        rules: ['required', 'phone']
      }),
      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        placeholder: '••••••••••••',
        rules: ['required', 'password']
      }),
      new Input({
        type: 'password',
        name: 'confirm-password',
        label: 'Пароль (ещё раз)',
        placeholder: '••••••••••••',
        rules: ['required', 'password', 'confirm_password']
      })
    ]

    const ButtonAuth = new Button({
      type: 'submit',
      label: 'Зарегистрироваться'
    })

    super({
      title: 'Регистрация',
      InputsAuth,
      ButtonAuth,
      link: {
        text: 'Войти',
        href: '/login'
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
