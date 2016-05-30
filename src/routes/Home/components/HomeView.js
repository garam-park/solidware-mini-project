import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

class HomeView extends React.Component {

  render(){
    return (
      <div>
        <h4>Welcome!</h4>
        <img
          alt='This is a duck, because Redux!'
          className={classes.duck}
          src={DuckImage} />
      </div>
    )
  }
}

export default HomeView
