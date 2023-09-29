import { HTTPTransport } from '../utils/HTTPTransport.ts'

export class ResourcesAPI {
  http = new HTTPTransport()

  get(path: string) {
    return `${this.http.API_URL}/resources${path}`
  }
}

export default new ResourcesAPI()
