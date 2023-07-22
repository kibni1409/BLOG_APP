import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SingInThunk } from '../../../Redux/User/UserReducer'
import { RouteArticle } from '../../../App'
import { EmailValidate, PasswordValidate } from '../../Validation'
import Input from '../../Input/Input'
import Form from '../../Form/Form'
import Button from '../../Button/Button'

const SingIn = () => {
  const state = useSelector((state) => state.User)
  const navigate = useNavigate()
  useEffect(() => {
    if (state.user.username !== null) {
      navigate(RouteArticle)
    }
  }, [state.user.username])

  const dispatch = useDispatch()
  const onFinish = (e) => {
    const valueForm = {
      email: e.target[0].value,
      password: e.target[1].value,
    }
    dispatch(SingInThunk(valueForm))
    e.preventDefault()
  }
  return (
    <Form title={'Sing In'} callBack={onFinish}>
      <Input label={'Email'} name={'email'} validator={EmailValidate} />
      <Input label={'Password'} name={'password'} validator={PasswordValidate} />
      <label>
        Remember me
        <input type={'checkbox'} />
      </label>
      <Button type={'submit'} typeClass={'primary'} tittle={'SignIn'} />
    </Form>
  )
}

export default SingIn
