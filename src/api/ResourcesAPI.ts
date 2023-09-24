import { HTTPTransport } from '../utils/HTTPTransport'

export class ResourcesAPI {
  http = new HTTPTransport()

  get(path: string) {
    return `${this.http.API_URL}/resources${path}`
  }
}

export default new ResourcesAPI()
