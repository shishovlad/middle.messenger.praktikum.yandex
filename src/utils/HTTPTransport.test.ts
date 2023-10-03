import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic
} from 'sinon'
import { HTTPTransport } from './HTTPTransport.ts'
import { expect } from 'chai'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HTTPTransport
  let requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = xhr

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }

    instance = new HTTPTransport()
  })

  afterEach(() => {
    requests = []
  })

  describe('.get() method', () => {
    it('should send GET request', () => {
      instance.get('/auth/user')

      const [request] = requests

      expect(request.method).to.eq('GET')
    })
  })

  describe('.post() method', () => {
    it('should send POST request', () => {
      instance.post('/auth/user')

      const [request] = requests

      expect(request.method).to.eq('POST')
    })
  })

  describe('.put() method', () => {
    it('should send PUT request', () => {
      instance.put('/auth/user')

      const [request] = requests

      expect(request.method).to.eq('PUT')
    })
  })

  describe('.delete() method', () => {
    it('should send DELETE request', () => {
      instance.delete('/auth/user')

      const [request] = requests

      expect(request.method).to.eq('DELETE')
    })
  })
})
