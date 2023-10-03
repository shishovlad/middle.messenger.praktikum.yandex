import API, { AuthAPI } from '../api/AuthAPI.ts'
import Router, { Routes } from '../utils/Router.ts'
import store from '../utils/Store.ts'
import MessagesController from './MessagesController.ts'

export class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = API
  }

  async signup(...data: Parameters<AuthAPI['signup']>) {
    try {
      await this.api.signup(...data)

      await this.fetchUser()

      Router.go(Routes.Messenger)
    } catch (e) {
      console.error(e)
    }
  }

  async signin(...data: Parameters<AuthAPI['signin']>) {
    try {
      await this.api.signin(...data)

      await this.fetchUser()

      Router.go(Routes.Messenger)
    } catch (e) {
      console.error(e)
    }
  }

  async fetchUser() {
    const user = await this.api.user()
    store.set('user', user)
  }

  async logout() {
    try {
      MessagesController.closeAll()

      await this.api.logout()

      Router.go(Routes.Index)
    } catch (e) {
      console.error(e)
    }
  }
}

export default new AuthController()
