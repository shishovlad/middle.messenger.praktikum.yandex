import Block from '../../../utils/Block'
import template from './template.hbs'
import './template.css'
import { DialogPreview } from '../../../components/dialog/preview'

export class ChatListPage extends Block {
  constructor() {
    super({
      ListDialogPreview: [
        new DialogPreview({
          avatar: {
            size: '47px',
            src: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
          },
          title: 'Киноклуб',
          time: '11:46',
          message:
            'Друзья, у меня для вас особенный выпуск новостей! В 2008 году художник Jon Rafman начал собирать...',
          badge: 2
        }),
        new DialogPreview({
          avatar: {
            size: '47px',
            src: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
          },
          title: 'Киноклуб',
          time: '11:46',
          message:
            'Друзья, у меня для вас особенный выпуск новостей! В 2008 году художник Jon Rafman начал собирать...',
          badge: 2
        })
      ]
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
