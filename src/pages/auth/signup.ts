import Block from '../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { onSubmitForm } from '../../utils/events/onSubmitForm'
import AuthController from '../../controllers/AuthController'
import { SignupRequest } from '../../api/types'
import { Link } from '../../components/link'

export class SignupPage extends Block {
  constructor() {
    const InputsAuth = [
      new Input({
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: '',
        placeholder: 'email@gmail.com',
        rules: ['required', 'email']
      }),
      new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
        value: '',
        placeholder: 'username',
        rules: ['required', 'login']
      }),
      new Input({
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: '',
        placeholder: 'Иван',
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: '',
        placeholder: 'Иванов',
        rules: ['required', 'name']
      }),
      new Input({
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        value: '',
        placeholder: '+79999999999',
        rules: ['required', 'phone']
      }),
      new Input({
        type: 'password',
        name: 'password',
        label: 'Пароль',
        value: '',
        placeholder: '••••••••••••',
        rules: ['required', 'password']
      }),
      new Input({
        type: 'password',
        name: 'confirm-password',
        label: 'Пароль (ещё раз)',
        value: '',
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
      link: new Link({
        text: 'Войти',
        href: '/'
      }),
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
