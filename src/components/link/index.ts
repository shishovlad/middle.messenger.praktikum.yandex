import { PropsWithRouter, withRouter } from '../../hocs/withRouter'
import Block from '../../utils/Block'
import { Routes } from '../../utils/Router'
import template from './link.hbs'

type LinkProps = {
  href: HTMLLinkElement['href']
  text: string
  className?: HTMLLinkElement['className']
  events?: Record<string, (e: Event) => unknown>
} & PropsWithRouter

export class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          e.preventDefault()
          this.navigate()
        }
      }
    })
  }

  navigate() {
    this.props.router?.go(this.props.href as Routes)
  }

  render() {
    return this.compile(template, this.props)
  }
}

export const Link = withRouter(BaseLink)
