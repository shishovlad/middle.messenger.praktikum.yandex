import { HTTPTransport } from '../utils/HTTPTransport.ts'
import {
  SigninRequest,
  SignupRequest,
  SignupResponse,
  UserResponse
} from './types.ts'

export class AuthAPI {
  http = new HTTPTransport()

  signup(data: SignupRequest) {
    return this.http.post<SignupResponse>('/auth/signup', { data })
  }

  signin(data: SigninRequest) {
    return this.http.post('/auth/signin', { data })
  }

  user() {
    return this.http.get<UserResponse>('/auth/user')
  }

  logout() {
    return this.http.post('/auth/logout')
  }
}

export default new AuthAPI()
