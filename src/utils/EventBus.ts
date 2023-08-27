type Event = string
type Callback = (...args: unknown[]) => void

class EventBus {
  private readonly listeners: Record<Event, Callback[]> = {}

  constructor() {
    this.listeners = {}
  }

  on(event: Event, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: Event, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit(event: Event, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}

export default EventBus
