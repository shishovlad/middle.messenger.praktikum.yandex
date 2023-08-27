export const onSubmitForm = (e: Event) => {
  e.preventDefault()

  let hasError = false

  const inputs = (e.target as HTMLFormElement).querySelectorAll('input')
  const formData: Record<string, string> = {}

  Array.from(inputs).forEach((input: HTMLInputElement) => {
    input.focus()
    input.blur()

    const formControl = input.closest('.form__control') as HTMLDivElement
    if (!formControl) return

    const classList = Array.from(formControl.classList)

    if (classList.includes('has-error')) {
      hasError = true
      return
    }

    if (input.value) {
      formData[input.name] = input.value
    }
  })

  if (!hasError && Object.keys(formData).length) {
    console.log(formData)
  }
}
