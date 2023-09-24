import Block, { BlockConstructable } from './Block'
import { render } from './render'

export class Route {
  private _pathname: string
  private _blockClass: BlockConstructable
  private _block: Block | null
  private _props: { rootQuery: string }

  constructor(
    pathname: string,
    view: BlockConstructable,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  async leave() {
    if (this._block) {
      this._block.hide()
      this._block = null
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({})
      render(this._props.rootQuery, this._block)
      return
    }

    this._block.show()
  }
}
