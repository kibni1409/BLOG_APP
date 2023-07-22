import { Button, Checkbox, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { SingUpThunk } from '../../../Redux/User/UserReducer'
import { RouteArticle, RouteSignIN } from '../../../App'

import Style from './SingUp.module.css'
const SingUp = () => {
  const state = useSelector((state) => state.User)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    if (state.user.username !== null) {
      navigate(RouteArticle)
    }
  }, [state.user.username])
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    })
  }
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    })
  }
  const dispatch = useDispatch()
  const onFinish = (values) => {
    success()
    dispatch(SingUpThunk(values))
  }
  const onFinishFailed = () => {
    error()
  }
  return (
    <div className={Style.form}>
      <h2>Create new Account</h2>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 10,
        }}
        style={{
          maxWidth: 400,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {contextHolder}
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      <span>
        Already have an account? <NavLink to={RouteSignIN}>Sign In</NavLink>
      </span>
    </div>
  )
}

export default SingUp
