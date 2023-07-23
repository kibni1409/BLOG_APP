import React from 'react'

import { getLocalStorage } from '../DataAccessLayer/WorkWithLocalStorage'
import SingIn from '../views/Body/SingIn/SingIn'
export default (Component) =>
  class withAuth extends React.Component {
    render() {
      const user = getLocalStorage('user')
      if (user === null) {
        return <SingIn />
      }
      return <Component {...this.props} />
    }
  }
