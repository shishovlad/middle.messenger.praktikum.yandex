import Block from '../utils/Block'
import Handlebars from 'handlebars'

/**
 * Это демонстрационная страница, она будет удалена.
 */
export class HomePage extends Block {
  static template = Handlebars.compile(`
    <ul>
      <li>
        <a href="#login">Авторизация</a>
      </li>
      <li>
        <a href="#signup">Регистрация</a>
      </li>
      <li>
        <a href="#chats">Список диалогов</a>
      </li>
      <li>
        <a href="#profile-settings">Настройки профиля</a>
      </li>
      <li>
        <a href="#notFound">404 ошибка</a>
      </li>
      <li>
        <a href="#serverError">500 ошибка</a>
      </li>

      <style>
        ul {
          margin: auto;
        }

        ul li {
          font-size: 21px;
          line-height: 1.5em;
          list-style-type: "➡️";
          padding: 10px;
        }
      </style>
    </ul>
  `)

  constructor() {
    super({})
  }

  render() {
    return this.compile(HomePage.template, this.props)
  }
}
