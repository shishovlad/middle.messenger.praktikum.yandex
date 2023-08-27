export type ValidationCode =
  | 'required'
  | 'phone'
  | 'password'
  | 'confirm_password'
  | 'email'
  | 'login'
  | 'name'
export type ValidationData = {
  message: string
  pattern?: RegExp
  validator: (value: string) => boolean
}

const RULES: Record<ValidationCode, ValidationData> = {
  required: {
    message: 'Обязательное поле',
    validator(value: string) {
      return !!String(value).trim().length
    }
  },
  phone: {
    message: 'Номер телефона указан некорректно',
    pattern: /^[+-d]?\d{10,15}$/,
    validator(value: string) {
      return this.pattern?.test(value) ?? false
    }
  },
  password: {
    message: 'Пароль указан некорректно',
    pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    validator(value: string) {
      return this.pattern?.test(value) ?? false
    }
  },
  confirm_password: {
    message: 'Пароли не совпадают',
    validator(value: string) {
      const passwordInput = document.querySelector(
        'input[name=password]'
      ) as HTMLInputElement

      if (!passwordInput) {
        return false
      }

      return value === passwordInput.value ?? false
    }
  },
  email: {
    message: 'Адрес электронной почты указан некорректно',
    pattern:
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    validator(value: string) {
      return this.pattern?.test(value) ?? false
    }
  },
  login: {
    message: 'Логин указан некорректно',
    pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    validator(value: string) {
      return this.pattern?.test(value) ?? false
    }
  },
  name: {
    message: 'Поле указано некорректно',
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    validator(value: string) {
      return this.pattern?.test(value) ?? false
    }
  }
}

export const onValidationInput = (
  input: HTMLInputElement,
  keys: ValidationCode[]
) => {
  const value = input.value
  const errorMessage: string[] = []

  keys.forEach((key) => {
    const currentRule = RULES[key]
    if (!currentRule) return

    const isValid = currentRule.validator(value)

    if (!isValid) {
      errorMessage.push(currentRule.message)
      return
    }
  })

  return errorMessage[0] ?? ''
}
