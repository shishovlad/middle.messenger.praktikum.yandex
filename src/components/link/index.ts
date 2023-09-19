import Block from '../../utils/Block'
import template from './link.hbs'

interface LinkProps {
  href: HTMLLinkElement['href']
  text: string
  className?: HTMLLinkElement['className']
  events?: Record<string, (e: Event) => unknown>
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
