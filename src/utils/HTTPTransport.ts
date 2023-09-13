enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type MethodOptions = {
  method: METHODS
  data: string | Record<string, string>
  headers: Record<string, string>
  timeout: number
}

type Method = (url: string, options: MethodOptions) => Promise<unknown>

const TIMEOUT_DEFAULT = 5000

function queryStringify(data: string | Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  const keys = Object.keys(data)

  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
    '?'
  )
}

export class HTTPTransport {
  get: Method = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    )
  }

  post: Method = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    )
  }

  put: Method = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    )
  }

  delete: Method = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    )
  }

  request = (
    url: string,
    options: MethodOptions,
    timeout: number = TIMEOUT_DEFAULT
  ) => {
    const { headers, method, data } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('Method not found')
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => resolve(xhr)
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status === 200) {
          resolve(xhr)
        } else {
          reject(xhr)
        }
      }

      xhr.timeout = timeout
      xhr.responseType = 'json'
      xhr.withCredentials = true

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (isGet || !data) {
        xhr.send()
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        xhr.send(data)
      }
    })
  }
}
