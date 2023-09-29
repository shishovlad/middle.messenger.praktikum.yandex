import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { Button } from '../../components/button/index.ts'

export class ServerErrorPage extends Block {
  constructor() {
    super({
      code: 500,
      message: 'Произошла ошибка сервера, попробуйте обновить страницу!',
      ButtonToHome: new Button({
        type: 'button',
        label: 'Вернуться на главную'
      })
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
