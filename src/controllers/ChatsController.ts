import API, { ChatsAPI } from '../api/ChatsAPI.ts'
import store from '../utils/Store.ts'
import MessagesController from './MessagesController.ts'

export class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = API
  }

  async list(...data: Parameters<ChatsAPI['list']>) {
    const chats = await this.api.list(...data)

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id)
      await MessagesController.connect(chat.id, token)
    })

    store.set('chats', chats)
  }

  async create(title: string) {
    const { id } = await this.api.create(title)

    this.list({})
    this.selectChat(id)
  }

  async delete(chatId: number) {
    await this.api.delete(chatId)

    this.list({})
  }

  async addUserToChat(chatId: number, userId: number[]) {
    await this.api.addUsers(chatId, userId)
  }

  async deleteUserToChat(chatId: number, userId: number[]) {
    await this.api.deleteUsers(chatId, userId)
  }

  async getUsers(chatId: number) {
    return await this.api.getUsers(chatId)
  }

  getToken(chatId: number) {
    return this.api.token(chatId)
  }

  selectChat(chatId: number) {
    store.set('selectedChatId', chatId)
    store.set('messengerView', 'chat')

    this.getUsers(chatId).then((users) => {
      store.set('chatUsers', users)
    })
  }
}

export default new ChatsController()
