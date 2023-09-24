import { HTTPTransport } from '../utils/HTTPTransport'
import {
  ChatDeleteResponse,
  ChatUserResponse,
  ChatsRequest,
  ChatsResponse
} from './types'

export class ChatsAPI {
  http = new HTTPTransport()

  list(data: ChatsRequest) {
    return this.http.get<ChatsResponse>('/chats', { data })
  }

  create(title: string) {
    return this.http.post<{ id: number }>('/chats', { data: { title } })
  }

  delete(chatId: number) {
    return this.http.delete<ChatDeleteResponse>('/chats', { data: { chatId } })
  }

  getUsers(chatId: number) {
    return this.http.get<ChatUserResponse>(`/chats/${chatId}/users`)
  }

  addUsers(chatId: number, users: number[]) {
    return this.http.put(`/chats/users`, { data: { chatId, users } })
  }

  deleteUsers(chatId: number, users: number[]) {
    return this.http.delete(`/chats/users`, { data: { chatId, users } })
  }

  async token(chatId: number) {
    const response = await this.http.post<{ token: string }>(
      `/chats/token/${chatId}`
    )
    return response.token
  }
}

export default new ChatsAPI()
