import { HTTPTransport } from '../utils/HTTPTransport'
import {
  UserUpdateRequest,
  UserResponse,
  UserChangePasswordRequest
} from './types'

export class UserAPI {
  http = new HTTPTransport()

  async profile(data: UserUpdateRequest) {
    return await this.http.put<UserResponse>('/user/profile', { data })
  }

  async avatar(data: FormData) {
    return await this.http.put<UserResponse>('/user/profile/avatar', { data })
  }

  async changePassword(data: UserChangePasswordRequest) {
    return await this.http.put('/user/password', { data })
  }

  search(login: string) {
    return this.http.post<UserResponse[]>('/user/search', { data: { login } })
  }
}

export default new UserAPI()
