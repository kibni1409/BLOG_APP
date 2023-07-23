import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { SingUpThunk } from '../../../Redux/User/UserSlice'
import { RouteArticle, RouteSignIN } from '../../../RoutePath'
import { EmailValidate, PasswordValidate, UserNameValidate } from '../../../Validation'
import Input from '../../../Components/Input/Input'
import Form from '../../../Components/Form/Form'
import Button from '../../../Components/Button/Button'
const SingUp = () => {
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
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    }
    dispatch(SingUpThunk(valueForm))
    e.preventDefault()
  }
  return (
    <>
      <Form title={'Create new Account'} callBack={onFinish}>
        <Input label={'Username'} name={'username'} validator={UserNameValidate} />
        <Input label={'Email'} name={'email'} validator={EmailValidate} />
        <Input label={'Password'} name={'password'} validator={PasswordValidate} />
        <Input label={'Confirm Password'} name={'confirm'} />
        <label>
          I agree to the processing of my personal information
          <input type={'checkbox'} defaultChecked />
        </label>
        <Button type={'submit'} typeClass={'primary'} tittle={'Create'} />
        <span>
          Already have an account? <NavLink to={RouteSignIN}>Sign In</NavLink>
        </span>
      </Form>
    </>
  )
}

export default SingUp
