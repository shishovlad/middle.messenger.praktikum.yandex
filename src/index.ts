import { registerComponent } from './utils/registerComponent.ts'
import { Link } from './components/link/index.ts'
import { Button } from './components/button/index.ts'
import { Input } from './components/input/index.ts'
import { Avatar } from './components/avatar/index.ts'
import { LoginPage } from './pages/auth/login.ts'
import { SignupPage } from './pages/auth/signup.ts'
import { SettingsPage } from './pages/profile/settings/index.ts'
import { MessengerPage } from './pages/messenger/index.ts'
import { ServerErrorPage } from './pages/error/500.ts'
import Router, { Routes } from './utils/Router.ts'
import AuthController from './controllers/AuthController.ts'

registerComponent('Link', Link)
registerComponent('Button', Button)
registerComponent('Input', Input)
registerComponent('Avatar', Avatar)

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Register, SignupPage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.ServerError, ServerErrorPage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false
  }

  try {
    await AuthController.fetchUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
