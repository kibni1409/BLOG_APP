import { NavLink } from 'react-router-dom'

import Style from './Button.module.css'
const Button = ({ tittle, type = 'button', typeClass = 'default', callBack, link, icon }) => {
  let Class = ''
  switch (typeClass) {
    case 'primary':
      Class = Style.Button_primary
      break
    case 'disabled':
      Class = Style.Button_disabled
      break
    case 'link':
      Class = Style.Button_link
      break
    default:
      Class = Style.Button_default
  }
  return (
    <button type={type} className={Style.Button + ' ' + Class} onClick={callBack}>
      {link ? <NavLink to={link}>{tittle || icon}</NavLink> : tittle || icon}
    </button>
  )
}

export default Button
