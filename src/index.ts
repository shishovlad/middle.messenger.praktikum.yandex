import { render } from './utils/render'
import { registerComponent } from './utils/registerComponent'
import { Button } from './components/button'
import { Input } from './components/input'
import { Avatar } from './components/avatar'

registerComponent('Button', Button)
registerComponent('Input', Input)
registerComponent('Avatar', Avatar)

window.addEventListener('DOMContentLoaded', () => {
  /**
   * Решение для демонстрации страниц. Позже будем делать роутинг.
   */
  const { pathname } = window.location
  const slug = pathname.startsWith('/') ? pathname.slice(1) : pathname

  if (slug) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(slug)
  } else {
    render('home')
  }
})
