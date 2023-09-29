import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import { Button } from '../../components/button/index.ts'

export class NotFoundPage extends Block {
  constructor() {
    super({
      code: 404,
      message: 'Страница, которую вы ищете, не найдена',
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
