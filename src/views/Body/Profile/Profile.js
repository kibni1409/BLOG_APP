import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { EditThunk } from '../../../Redux/User/UserSlice'
import Input from '../../../Components/Input/Input'
import { AvatarValidate, BioValidate, EmailValidate, PasswordValidate, UserNameValidate } from '../../../Validation'
import Form from '../../../Components/Form/Form'
import Button from '../../../Components/Button/Button'
import withAuth from '../../../HOC/withAuth'
import { RouteHome } from '../../../RoutePath'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = ({ username, email, password, bio, image }) => {
    dispatch(EditThunk({ username, email, password, bio, image }))
    navigate(RouteHome)
  }
  return (
    <Form title={'Edit profile'} callBack={onFinish}>
      <Input name={'username'} label={'UserName'} validator={UserNameValidate} />
      <Input name={'email'} label={'Email'} validator={EmailValidate} type={'email'} />
      <Input name={'password'} label={'New password'} validator={PasswordValidate} type={'password'} />
      <Input name={'bio'} label={'Bio'} validator={BioValidate} />
      <Input name={'avatar'} label={'Avatar'} type={'url'} validator={AvatarValidate} />
      <Button type={'submit'} typeClass={'primary'} tittle={'Save'} />
    </Form>
  )
}

export default withAuth(Profile)
