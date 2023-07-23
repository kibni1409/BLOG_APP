import { UserOutlined } from '@ant-design/icons'
import React from 'react'

import Style from './Avatar.module.css'
const Avatar = ({ source }) => {
  return <>{source ? <img className={Style.Avatar} src={source} alt={source} /> : <UserOutlined />}</>
}

export default Avatar
