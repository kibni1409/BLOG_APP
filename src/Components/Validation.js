export function UserNameValidate(name) {
  if (name === '') {
    return 'Empty name'
  }
  if (name.length < 4) {
    return 'Min 4 symbol'
  }
  if (name.length > 20) {
    return 'Max 20 symbol'
  }
  return false
}

export function EmailValidate(email) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
  if (email === '') {
    return 'Please input your email!'
  }
  if (email.length < 4) {
    return 'Min 4 symbol'
  }
  if (email.length > 20) {
    return 'Max 20 symbol'
  }
  if (!re.test(email)) {
    return 'Incorrect email'
  }
  return false
}

export function PasswordValidate(password) {
  if (password === '') {
    return 'Please input your email!'
  }
  if (password.length < 4) {
    return 'Min 4 symbol'
  }
  if (password.length > 20) {
    return 'Max 20 symbol'
  }
  return false
}

export function BioValidate(bio) {
  if (bio.length > 200) {
    return 'Max 200 symbol'
  }
  return false
}

export function AvatarValidate(url) {
  const re = /[-a-zA-Z0-9@:%_\\+.~#?&\\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\\+.~#?&\\/=]*)?/gi
  if (!re.test(url)) {
    return 'Incorrect url'
  }
  return false
}

export function TittleValidate(tittle) {
  if (tittle === '') {
    return 'Please input your title!'
  }
  return false
}

export function DescriptionValidate(description) {
  if (description === '') {
    return 'Description input your title!'
  }
  return false
}

export function BodyValidate(body) {
  if (body === '') {
    return 'Body input your title!'
  }
  return false
}
