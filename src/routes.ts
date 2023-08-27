import { LoginPage } from './pages/auth/login'
import { SignupPage } from './pages/auth/signup'
import { ProfileSettingsPage } from './pages/profile/settings'
import { ChatsPage } from './pages/chats'
import { NotFoundPage } from './pages/error/404'
import { ServerErrorPage } from './pages/error/500'
import { HomePage } from './pages'

export const ROUTES = {
  home: HomePage,
  login: LoginPage,
  signup: SignupPage,
  chats: ChatsPage,
  'profile/settings': ProfileSettingsPage,
  notFound: NotFoundPage,
  serverError: ServerErrorPage
}
