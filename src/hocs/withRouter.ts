import Block, { BlockProps } from '../utils/Block.ts'
import Router from '../utils/Router.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withRouter<T extends BlockProps>(Component: typeof Block<T>) {
  type Props = typeof Component extends typeof Block<infer P extends BlockProps>
    ? P
    : unknown

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router })
    }
  }
}

export type PropsWithRouter = {
  router?: typeof Router
}
