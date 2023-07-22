import { Avatar, Button, Layout } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OutThunk } from '../../Redux/User/UserReducer'
import { RouteArticleFormWithAdd, RouteHome, RouteProfile, RouteSignIN, RouteSignUP } from '../../App'
import { getLocalStorage } from '../../DataAccessLayer/WorkWithLocalStorage'

import Style from './Header.module.css'

const HeaderComp = () => {
  const state = useSelector((state) => state.User)
  let userLocal = getLocalStorage('user')
  useEffect(() => {}, [state.user])
  const dispatch = useDispatch()
  const { Header } = Layout
  let ElementButton = () => {
    return (
      <div>
        <span className={Style.username}>
          <NavLink to={RouteHome}>All articles</NavLink>
        </span>
        <Button type={'primary'}>
          <NavLink to={RouteSignIN}>SingIn</NavLink>
        </Button>
        <Button>
          <NavLink to={RouteSignUP}>SingUp</NavLink>
        </Button>
      </div>
    )
  }
  let ElementAvatar = ({ user }) => {
    let userParse =
      user !== null
        ? user
        : {
            image: null,
            username: '',
          }
    return (
      <div>
        <span className={Style.username}>
          <NavLink to={RouteHome}>All articles</NavLink>
        </span>
        <Button type="primary">
          <NavLink to={RouteArticleFormWithAdd}>Add article</NavLink>
        </Button>
        <span className={Style.username}>
          <NavLink to={RouteProfile}>
            <Avatar size={44} src={userParse.image} icon={<UserOutlined />} />
          </NavLink>
        </span>
        <Button onClick={() => dispatch(OutThunk())} icon={<LogoutOutlined />}>
          <NavLink to={RouteSignIN}></NavLink>
        </Button>
      </div>
    )
  }
  return (
    <Header className={Style.header}>
      {userLocal === null ? <ElementButton /> : <ElementAvatar user={userLocal} />}
    </Header>
  )
}

export default HeaderComp
