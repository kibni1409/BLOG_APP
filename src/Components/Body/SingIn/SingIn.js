import { Button, Checkbox, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SingInThunk } from '../../../Redux/User/UserReducer'

import Style from './SingIn.module.css'

const SingIn = () => {
  const state = useSelector((state) => state.User)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  useEffect(() => {
    if (state.user.username !== null) {
      navigate('/article')
    }
  }, [state.user.username])
  useEffect(() => {
    if (state.statusLoading === false && state.error === '') {
      success()
    }
    if (state.statusLoading === false && state.error !== '') {
      error(state.error)
    }
  }, [state.statusLoading])
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
  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(SingInThunk(values))
  }
  const onFinishFailed = () => {
    error('Не все поля заполнены')
  }
  return (
    <div className={Style.form}>
      <h2>Sing In</h2>
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
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {contextHolder}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SingIn
