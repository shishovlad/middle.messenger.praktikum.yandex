import WSTransport, { WSTransportEvents } from '../utils/WSTransport.ts'
import store from '../utils/Store.ts'
import { MessageResponse } from '../api/types.ts'

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map()

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return
    }

    const userId = store.getState().user.id

    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    )

    this.sockets.set(chatId, wsTransport)

    await wsTransport.connect()

    this.subscribe(wsTransport, chatId)
    this.fetchOldMessages(chatId)
  }

  sendMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId)

    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`)
    }

    socket.send({
      type: 'message',
      content: message
    })
  }

  fetchOldMessages(chatId: number) {
    const socket = this.sockets.get(chatId)

    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`)
    }

    socket.send({ type: 'get old', content: '0' })
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close())
  }

  private onMessage(
    chatId: number,
    messages: MessageResponse | MessageResponse[]
  ) {
    let messagesToAdd: MessageResponse[] = []

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse()
    } else {
      messagesToAdd.push(messages)
    }

    const currentMessages = (store.getState().messages || {})[chatId] || []

    messagesToAdd = [...currentMessages, ...messagesToAdd]

    store.set(`messages.${chatId}`, messagesToAdd)
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId)
  }

  private subscribe(transport: WSTransport, chatId: number) {
    transport.on(WSTransportEvents.Message, (message) =>
      this.onMessage(chatId, message as MessageResponse | MessageResponse[])
    )
    transport.on(WSTransportEvents.Close, () => this.onClose(chatId))
  }
}

const controller = new MessagesController()

export default controller
