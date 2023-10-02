import { expect } from 'chai'
import sinon from 'sinon'
import esmock from 'esmock'
import type BlockType from './Block.ts'

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake()
}

describe('Block', () => {
  it('init component', async () => {
    const { default: Block } = (await esmock('./Block.ts', {
      './EventBus.ts': {
        EventBus: class {
          emit = eventBusMock.emit
          on = eventBusMock.on
        }
      }
    })) as { default: typeof BlockType }

    class ComponentMock extends Block {}

    new ComponentMock({})
    expect(eventBusMock.emit.calledWith('init')).to.eq(true)
  })

  it('hook:component-did-update after props update', async () => {
    const { default: Block } = (await esmock('./Block.ts', {
      './EventBus.ts': {
        EventBus: class {
          emit = eventBusMock.emit
          on = eventBusMock.on
        }
      }
    })) as { default: typeof BlockType }

    class ComponentMock extends Block {}

    const components = new ComponentMock({})
    components.setProps({ test: 'test' })
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).eq(true)
  })
})
