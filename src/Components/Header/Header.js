import { Avatar, Button, Layout } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OutThunk } from '../../Redux/User/UserReducer'

import Style from './Header.module.css'

const HeaderComp = () => {
  const state = useSelector((state) => state.User)
  useEffect(() => {}, [state.user])
  const dispatch = useDispatch()
  const { Header } = Layout
  let ElementButton = () => {
    return (
      <div>
        <span className={Style.username}>
          <NavLink to="/">All articles</NavLink>
        </span>
        <Button type={'primary'}>
          <NavLink to="/sing-in">SingIn</NavLink>
        </Button>
        <Button>
          <NavLink to="/sing-up">SingUp</NavLink>
        </Button>
      </div>
    )
  }
  let ElementAvatar = ({ user }) => {
    let userParse = JSON.parse(user)
    return (
      <div>
        <span className={Style.username}>
          <NavLink to="/">All articles</NavLink>
        </span>
        <Button type="primary">
          <NavLink to="/article-form/add">Add article</NavLink>
        </Button>
        <Avatar size={64} src={userParse.image} icon={<UserOutlined />} />
        <span className={Style.username}>
          <NavLink to="/profile">{userParse.username}</NavLink>
        </span>
        <Button onClick={() => dispatch(OutThunk())}>
          <NavLink to="/sing-in">LogOut</NavLink>
        </Button>
      </div>
    )
  }
  return (
    <Header className={Style.header}>
      {localStorage.getItem('user') === null ? (
        <ElementButton />
      ) : (
        <ElementAvatar user={localStorage.getItem('user')} />
      )}
    </Header>
  )
}

export default HeaderComp
