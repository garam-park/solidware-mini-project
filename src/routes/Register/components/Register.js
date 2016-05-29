/* @flow */
import React from 'react'

import { browserHistory } from 'react-router'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

class Register extends React.Component {

  render(){

    return (
      <div>
        Register
      </div>
    )
  }
}

export default Register
