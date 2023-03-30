export function SetLocalStorage(name, data) {
  try {
    if (localStorage.getItem(name) === null) {
      localStorage.setItem(name, JSON.stringify(data))
    }
  } catch (err) {
    throw Error(err.message)
  }
}

export function getLocalStorage(name) {
  if (localStorage.getItem(name) !== null) {
    return JSON.parse(localStorage.getItem(name))
  } else {
    return null
  }
}
