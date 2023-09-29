import { expect } from 'chai'
import sinon from 'sinon'
import esmock from 'esmock'
import type BlockType from './Block.ts'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake()
}

describe('Block', async () => {
  const { default: Block } = (await esmock('./Block.ts', {
    './EventBus.ts': {
      EventBus: class {
        emit = eventBusMock.emit
        on = eventBusMock.on
      }
    }
  })) as { default: typeof BlockType }

  class ComponentMock extends Block {}

  it('init', () => {
    new ComponentMock({})

    expect(eventBusMock.emit.calledWith('init')).to.eq(true)
  })

  it('component-did-update event on props update', () => {
    const components = new ComponentMock({})

    components.setProps({ test: 'test' })

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).eq(true)
  })
})
