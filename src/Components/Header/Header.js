import { Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { OutThunk } from '../../Redux/User/UserReducer'
import { RouteArticleFormWithAdd, RouteHome, RouteProfile, RouteSignIN, RouteSignUP } from '../../App'
import { getLocalStorage } from '../../DataAccessLayer/WorkWithLocalStorage'

import Button from './../Button/Button'
import Style from './Header.module.css'

const HeaderComp = () => {
  const state = useSelector((state) => state.User)
  let userLocal = getLocalStorage('user')
  useEffect(() => {}, [state.user])
  const dispatch = useDispatch()
  let ElementButton = () => {
    return (
      <>
        <Button tittle={'All articles'} link={RouteHome} typeClass={'link'} />
        <Button tittle={'SignIn'} link={RouteSignIN} typeClass={'primary'} />
        <Button tittle={'SignUp'} link={RouteSignUP} typeClass={'primary'} />
      </>
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
      <>
        <Button tittle={'All articles'} link={RouteHome} typeClass={'link'} />
        <Button tittle={'Add article'} link={RouteArticleFormWithAdd} typeClass={'primary'} />
        <NavLink to={RouteProfile}>
          <Avatar size={44} src={userParse.image} icon={<UserOutlined />} />
        </NavLink>
        <Button callBack={() => dispatch(OutThunk())} icon={<LogoutOutlined />} link={RouteSignIN} />
      </>
    )
  }
  return (
    <div className={Style.header}>{userLocal === null ? <ElementButton /> : <ElementAvatar user={userLocal} />}</div>
  )
}

export default HeaderComp
