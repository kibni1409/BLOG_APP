import { useState } from 'react'

import Style from './Input.module.css'
const Input = ({ name = '', label = '', type = 'text', placeholder = '', validator = () => false }) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  function onChangeHandle(e) {
    const value = e.target.value
    const isValidate = validator(value)
    setValue(e.target.value)

    if (isValidate) {
      setError(isValidate)
    } else {
      setError(null)
    }
  }
  return (
    <div className={Style.Input}>
      <label className={Style.Input_label}>{label}</label>
      <input
        name={name}
        onChange={onChangeHandle}
        className={error ? Style.Input_error : Style.Input_input}
        value={value}
        type={type}
        placeholder={placeholder}
      />
      <span className={Style.Error}>{error}</span>
    </div>
  )
}

export default Input
