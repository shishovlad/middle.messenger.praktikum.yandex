import { BlockConstructable } from './Block.ts'
import { Route } from './Route.ts'
import { render } from './render.ts'
import { NotFoundPage } from '../pages/error/404.ts'

export enum Routes {
  Index = '/',
  Register = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger'
}

export class Router {
  static __instance?: Router

  public routes: Route[] = []
  public history: History = window.history

  private _currentRoute: Route | null = null
  private _rootQuery: string = '#app'

  constructor() {
    if (Router.__instance) {
      return Router.__instance
    }

    Router.__instance = this
  }

  use(pathname: Routes, block: BlockConstructable) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)

    return this
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  async _onRoute(pathname: Routes | string) {
    const route = this.getRoute(pathname)
    if (!route) {
      // show 404 error
      render(this._rootQuery, new NotFoundPage())
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      await this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: Routes) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  reset() {
    delete Router.__instance
    new Router()
  }

  getRoute(pathname: Routes | string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default new Router()
