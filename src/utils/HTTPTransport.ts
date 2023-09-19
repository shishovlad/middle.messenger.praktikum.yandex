import queryStringify from './helpers/queryStringify'

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  data?: string | Record<string, unknown> | FormData
  headers?: Record<string, string>
  timeout?: number
}

const TIMEOUT_DEFAULT = 5000

export class HTTPTransport {
  public readonly API_URL = 'https://ya-praktikum.tech/api/v2'

  public get<T>(endpoint: string, options?: Options): Promise<T> {
    const url = endpoint + queryStringify(options?.data)
    return this.request<T>(url, options, METHODS.GET)
  }

  public post<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request<T>(endpoint, options, METHODS.POST)
  }

  public put<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request<T>(endpoint, options, METHODS.PUT)
  }

  public delete<T>(endpoint: string, options?: Options): Promise<T> {
    return this.request<T>(endpoint, options, METHODS.DELETE)
  }

  private request<T>(
    url: string,
    options: Options = {},
    method: METHODS
  ): Promise<T> {
    const { data = {}, headers = {}, timeout = TIMEOUT_DEFAULT } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('Method not found')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      // RUN
      xhr.open(method, this.API_URL + url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      // FIELDS
      xhr.timeout = timeout
      xhr.responseType = 'json'
      xhr.withCredentials = true

      // ERRORS
      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })

      // HEADERS
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      Object.keys(headers).forEach((key) =>
        xhr.setRequestHeader(key, headers[key])
      )

      // Sending request
      if (isGet || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
