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
  const { hash } = window.location
  const slug = hash.startsWith('#') ? hash.slice(1) : hash

  if (slug) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(slug)
  } else {
    render('home')
  }
})
