import { Link } from './index.ts'
import { expect } from 'chai'
import Router from '../../utils/Router.ts'
import sinon from 'sinon'

describe('Link', () => {
  it('should render', () => {
    new Link({ href: '/', text: 'link' })
  })

  it('element should return span', () => {
    const link = new Link({ href: '/', text: 'link' })
    const element = link.getContent()

    expect(element).to.be.instanceof(window.HTMLSpanElement)
  })

  it('should go to passed route on click', () => {
    const link = new Link({ href: '/', text: 'link' })
    const spy = sinon.spy(Router, 'go')
    const element = link.getContent() as HTMLSpanElement

    element.click()

    expect(spy.calledOnce).to.eq(true)
  })
})
