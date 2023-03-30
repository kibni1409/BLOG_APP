import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

import { Avatar, Bio, Email, Password, Username } from '../../Validation'
import { EditThunk } from '../../../Redux/User/UserReducer'
import { RouteSignIN } from '../../../App'
import { getLocalStorage } from '../../../DataAccessLayer/WorkWithLocalStorage'

import Style from './Profile.module.css'

const Profile = () => {
  const navigate = useNavigate()
  let userLocal = getLocalStorage('user')
  useEffect(() => {
    if (userLocal === null) {
      navigate(RouteSignIN)
    }
  }, [])
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    })
  }
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
    })
  }
  const onFinish = ({ username, email, password, bio, image }) => {
    dispatch(EditThunk({ username, email, password, bio, image }))
    success()
    navigate('/')
  }
  const onFinishFailed = () => {
    error('Не все поля заполнены')
  }
  const FormProfile = ({ user }) => {
    let userParse =
      user !== null
        ? user
        : {
            username: null,
            email: null,
            password: null,
            bio: null,
            image: null,
          }
    return (
      <div className={Style.form}>
        <h2>Edit profile</h2>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            username: userParse.username,
            email: userParse.email,
            password: userParse.password,
            bio: userParse.bio,
            image: userParse.image,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {contextHolder}
          <Form.Item label="Username" name="username" rules={Username}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={Email}>
            <Input />
          </Form.Item>
          <Form.Item label="New password" name="password" rules={Password}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Bio" name="bio" initialValue={user.username} rules={Bio}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Avatar (url)" name="image" rules={Avatar}>
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
  return <div>{userLocal !== null ? <FormProfile user={userLocal} /> : navigate(RouteSignIN)}</div>
}

export default Profile
