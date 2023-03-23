import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom'

import { EditThunk } from '../../../Redux/User/UserReducer'

import Style from './Profile.module.css'

const Profile = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/sing-in')
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
    let userParse = JSON.parse(user)
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
          <Form.Item
            label="Username"
            name="username"
            initialValue={user.username}
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              {
                min: 4,
                message: 'min 4 symbol',
              },
              {
                max: 20,
                message: 'max 20 symbol',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={user.email}
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                min: 4,
                message: 'min 4 symbol',
              },
              {
                max: 20,
                message: 'max 20 symbol',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="New password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'min 4 symbol',
              },
              {
                max: 40,
                message: 'max 20 symbol',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Bio"
            name="bio"
            initialValue={user.username}
            rules={[
              {
                max: 200,
                message: 'max 200 symbol',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Avatar (url)"
            name="image"
            rules={[
              {
                type: 'url',
                message: 'url nut curren',
              },
            ]}
          >
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
  return (
    <div>
      {localStorage.getItem('user') !== null ? (
        <FormProfile user={localStorage.getItem('user')} />
      ) : (
        navigate('/sing-in')
      )}
    </div>
  )
}

export default Profile
