import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import Style from './Input.module.css'

// eslint-disable-next-line react/display-name
const Input = forwardRef(
  ({ children, name = '', label = '', type = 'text', placeholder = '', validator = () => false }, ref) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)
    const inputRef = useRef()

    useImperativeHandle(ref, () => {
      return {
        clear() {
          setValue('')
        },
        getValue() {
          return inputRef.current.value
        },
      }
    })

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
          ref={inputRef}
          name={name}
          onChange={onChangeHandle}
          className={error ? Style.Input_error : Style.Input_input}
          value={value}
          type={type}
          placeholder={placeholder}
        />
        <span className={Style.Error}>{error}</span>
        {children}
      </div>
    )
  }
)

export default Input
