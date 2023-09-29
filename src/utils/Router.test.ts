import Router, { Routes } from './Router.ts'
import sinon from 'sinon'
import { expect } from 'chai'
import type { BlockConstructable } from './Block.ts'

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }

  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
    }
  }

  beforeEach(() => {
    Router.reset()
  })

  const getContentFake = sinon.fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getContentFake
  } as unknown as BlockConstructable

  it('.use() should return Router instance', () => {
    const result = Router.use(Routes.Index, BlockMock)

    expect(result).to.eq(Router)
  })

  it('should render a page on start', () => {
    Router.use(Routes.Index, BlockMock).start()

    expect(getContentFake.callCount).to.eq(1)
  })

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router.use(Routes.Index, BlockMock).start()
      Router.back()

      expect(getContentFake.callCount).to.eq(1)
    })
  })

  describe('.forward()', () => {
    it('should render a page on history forward action', () => {
      Router.use(Routes.Index, BlockMock).start()
      Router.forward()

      expect(getContentFake.callCount).to.eq(1)
    })
  })

  describe('.go()', () => {
    it('should render a page on history go action', () => {
      Router.use(Routes.Index, BlockMock)
        .use(Routes.Messenger, BlockMock)
        .start()

      Router.go(Routes.Messenger)

      expect(window.location.pathname).to.eq(Routes.Messenger)
    })
  })
})
