import { PropsWithRouter, withRouter } from '../../hocs/withRouter.ts'
import Block from '../../utils/Block.ts'
import { Routes } from '../../utils/Router.ts'
import template from './link.hbs'

type LinkProps = {
  href: HTMLLinkElement['href']
  text: string
  className?: HTMLLinkElement['className']
  events?: Record<string, (e: Event) => unknown>
} & PropsWithRouter

export class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const events = {
      click: (e: Event) => {
        props.events?.click(e)
        this.navigate()
      }
    }

    super({
      ...props,
      events
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
