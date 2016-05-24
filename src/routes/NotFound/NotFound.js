import React from 'react'
import { browserHistory } from 'react-router'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

class NotFound extends React.Component {
  render(){
    return (
      <div>
        <h4>Page not found!</h4>
        <p><a href='#' onClick={goBack}>&larr; Back</a></p>
      </div>
    )
  }
}

export default NotFound
