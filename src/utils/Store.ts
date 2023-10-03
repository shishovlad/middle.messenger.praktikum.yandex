import set from './helpers/set.ts'
import {
  ChatResponse,
  ChatUserResponse,
  MessageResponse,
  UserResponse
} from '../api/types.ts'
import Block, { BlockProps } from './Block.ts'
import { EventBus } from './EventBus.ts'
import isEqual from './helpers/isEqual.ts'

export enum StoreEvents {
  Updated = 'updated'
}

export type State = {
  user: UserResponse
  chats: ChatResponse[]
  chatUsers: ChatUserResponse
  messages: Record<number, MessageResponse[]>
  messengerView: 'chat' | 'chat-users' | 'chat-create'
  selectedChatId?: number
}

export class Store extends EventBus {
  private state: State = {
    messengerView: 'chat'
  } as State

  public set<T extends keyof State | string>(
    keypath: T,
    data: T extends keyof State ? State[T] : unknown
  ) {
    set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

export function withStore<SP extends BlockProps>(
  mapStateToProps: (state: State) => SP
) {
  return function wrap<P extends BlockProps>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState())

        super({ ...(props as P), ...previousState })

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState()) as SP & P

          if (isEqual(previousState, stateProps)) {
            return
          }

          previousState = stateProps
          this.setProps({ ...stateProps })
        })
      }
    }
  }
}

const store = new Store()

export default store
