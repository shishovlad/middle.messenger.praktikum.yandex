import Block from '../../../utils/Block'
import template from './template.hbs'
import './template.css'
import { Input } from '../../../components/input'
import { Button } from '../../../components/button'
import { Avatar } from '../../../components/avatar'
import { onSubmitForm } from '../../../utils/events/onSubmitForm'

export class ProfileSettingsPage extends Block {
  constructor() {
    super({
      ChangeProfileAvatar: new Avatar({
        size: '130px',
        src: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
      }),

      ChangeProfileInputs: [
        new Input({
          type: 'text',
          name: 'first_name',
          label: 'Имя',
          placeholder: 'Иван',
          value: 'Влад',
          rules: ['required', 'name']
        }),
        new Input({
          type: 'text',
          name: 'second_name',
          label: 'Фамилия',
          placeholder: 'Иванов',
          value: 'Шишов',
          rules: ['required', 'name']
        }),
        new Input({
          type: 'text',
          name: 'display_name',
          label: 'Никнейм',
          placeholder: 'Иван',
          value: 'shishovlad',
          rules: ['required', 'login']
        }),
        new Input({
          type: 'text',
          name: 'login',
          label: 'Логин',
          placeholder: 'username',
          value: 'shishovlad',
          rules: ['required', 'login']
        }),
        new Input({
          type: 'email',
          name: 'email',
          label: 'Почта',
          placeholder: 'email@gmail.com',
          value: 'shishovlad1@yandex.ru',
          rules: ['required', 'email']
        }),
        new Input({
          type: 'text',
          name: 'phone',
          label: 'Телефон',
          placeholder: '+79999999999',
          value: '+79999999999',
          rules: ['required', 'phone']
        })
      ],
      ChangeProfileSave: new Button({
        type: 'submit',
        label: 'Сохранить'
      }),

      ChangePasswordInputs: [
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
        })
      ],
      ChangePasswordSave: new Button({
        type: 'submit',
        label: 'Сохранить'
      }),
      events: {
        submit: onSubmitForm
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
