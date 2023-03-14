import { Avatar, Button, Layout } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OutThunk } from '../../Redux/User/UserReducer'

import Style from './Header.module.css'

const HeaderComp = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.User)
  const { Header } = Layout
  let ElementButton = () => {
    return (
      <div>
        <Button type={'primary'}>
          <NavLink to="/singin">SingIn</NavLink>
        </Button>
        <Button>
          <NavLink to="/singup">SingUp</NavLink>
        </Button>
      </div>
    )
  }
  let ElementAvatar = () => {
    return (
      <div>
        <Avatar size={64} icon={<UserOutlined />} />
        {state.user.username}
        <Button onClick={() => dispatch(OutThunk())}>
          <NavLink to="/singin">LogOut</NavLink>
        </Button>
      </div>
    )
  }
  return (
    <Header className={Style.header}>{state.user.username === null ? <ElementButton /> : <ElementAvatar />}</Header>
  )
}

export default HeaderComp
