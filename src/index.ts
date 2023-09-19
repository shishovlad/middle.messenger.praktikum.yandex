import { registerComponent } from './utils/registerComponent'
import { Link } from './components/link'
import { Button } from './components/button'
import { Input } from './components/input'
import { Avatar } from './components/avatar'
import { LoginPage } from './pages/auth/login'
import { SignupPage } from './pages/auth/signup'
import { SettingsPage } from './pages/profile/settings'
import { MessengerPage } from './pages/messenger'
import Router, { Routes } from './utils/Router'
import AuthController from './controllers/AuthController'

registerComponent('Link', Link)
registerComponent('Button', Button)
registerComponent('Input', Input)
registerComponent('Avatar', Avatar)

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, LoginPage)
    .use(Routes.Register, SignupPage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Messenger, MessengerPage)

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
