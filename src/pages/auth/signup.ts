import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { onSubmitForm } from '../../utils/events/onSubmitForm'
import AuthController from '../../controllers/AuthController'
import { SignupRequest } from '../../api/types'

export class SignupPage extends Block {
  constructor() {
    const InputsAuth = [
      new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: 'qwerty0912@qwerty0912.ru',
        placeholder: 'email@gmail.com',
        rules: ['required', 'email']
      }),
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: 'qwerty0912',
        placeholder: 'username',
        rules: ['required', 'login']
      }),
      new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        placeholder: 'Иван',
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
        placeholder: 'Иванов',
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        value: '+7 999 999 99 99',
        placeholder: '+7 999 999 99 99',
        rules: ['required', 'phone']
      }),
      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: 'test123TEST',
        placeholder: '••••••••••••',
        rules: ['required', 'password']
      }),
      new Input({
        type: 'password',
        name: 'confirm-password',
        label: 'Пароль (ещё раз)',
        value: 'test123TEST',
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
        href: '/'
      },
      events: {
        submit: (e: Event) => {
          const { isValid, values } = onSubmitForm(e)

          if (isValid) {
            AuthController.signup(values as SignupRequest)
          }
        }
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
