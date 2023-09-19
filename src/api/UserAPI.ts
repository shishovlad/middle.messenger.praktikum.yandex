import { HTTPTransport } from '../utils/HTTPTransport'
import {
  UserUpdateRequest,
  UserResponse,
  UserChangePasswordRequest
} from './types'

export class UserAPI {
  http = new HTTPTransport()

  profile(data: UserUpdateRequest) {
    return this.http.put<UserResponse>('/user/profile', { data })
  }

  avatar(data: FormData) {
    return this.http.put<UserResponse>('/user/profile/avatar', { data })
  }

  changePassword(data: UserChangePasswordRequest) {
    return this.http.put('/user/password', { data })
  }

  search(login: string) {
    return this.http.post<UserResponse[]>('/user/search', { data: { login } })
  }
}

export default new UserAPI()
