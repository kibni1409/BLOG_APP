import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { EditThunk } from '../../../Redux/User/UserReducer'
import { RouteSignIN } from '../../../App'
import { getLocalStorage } from '../../../DataAccessLayer/WorkWithLocalStorage'
import Input from '../Input/Input'
import { AvatarValidate, BioValidate, EmailValidate, PasswordValidate, UserNameValidate } from '../../Validation'

import Form from './../Form/Form'

const Profile = () => {
  const navigate = useNavigate()
  let userLocal = getLocalStorage('user')
  useEffect(() => {
    if (userLocal === null) {
      navigate(RouteSignIN)
    }
  }, [])
  const dispatch = useDispatch()
  const onFinish = ({ username, email, password, bio, image }) => {
    dispatch(EditThunk({ username, email, password, bio, image }))
    navigate('/')
  }
  const FormProfile = () => {
    return (
      <Form title={'Edit profile'} callBack={onFinish}>
        <Input name={'username'} label={'UserName'} validator={UserNameValidate} />
        <Input name={'email'} label={'Email'} validator={EmailValidate} type={'email'} />
        <Input name={'password'} label={'New password'} validator={PasswordValidate} type={'password'} />
        <Input name={'bio'} label={'Bio'} validator={BioValidate} />
        <Input name={'avatar'} label={'Avatar'} type={'url'} validator={AvatarValidate} />
        <button type={'submit'}>Save</button>
      </Form>
    )
  }
  return <div>{userLocal !== null ? <FormProfile /> : navigate(RouteSignIN)}</div>
}

export default Profile
