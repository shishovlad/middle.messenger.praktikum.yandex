import Block from '../../utils/Block.ts'
import template from './template.hbs'
import './template.css'
import ChatsController from '../../controllers/ChatsController.ts'
import { Chats } from '../../components/chats/index.ts'
import { Chat } from '../../components/chat/index.ts'
import { ChatCreate } from '../../components/chat-create/index.ts'
import { State, withStore } from '../../utils/Store.ts'
import { ChatUsers } from '../../components/chat-users/index.ts'

type MessengerPageProps = {
  messengerView: NonNullable<State['messengerView']>
}

export class MessengerPageBase extends Block<MessengerPageProps> {
  constructor(props: MessengerPageProps) {
    super(props)
  }

  protected init() {
    this.children.chats = new Chats({ isLoaded: false }) as Block
    this.children.views = [
      new Chat({}),
      new ChatCreate(),
      new ChatUsers({})
    ] as Block[]

    ChatsController.list({}).finally(() => {
      ;(this.children.chats as Block).setProps({
        isLoaded: true
      })
    })

    this.toggleViews(this.props)
  }

  componentDidUpdate(
    _oldProps: MessengerPageProps,
    newProps: MessengerPageProps
  ): boolean {
    this.toggleViews(newProps)

    return true
  }

  private toggleViews(props: MessengerPageProps): void {
    this.children.views.forEach((b: Block) => {
      const view = b.getContent()?.dataset.view
      if (view === props.messengerView) {
        b.show()
      } else {
        b.hide()
      }
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withSelectedChatMessages = withStore((state) => ({
  messengerView: state.messengerView ?? 'chat'
}))

export const MessengerPage = withSelectedChatMessages(MessengerPageBase)
