/* @flow */
import React from 'react'
import classes from './Counter.scss'

// FlowType annotations
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
}

class Counter extends React.Component {

  constructor(props: Props){
    super(props);
  }

  render(){
    const { counter, increment, doubleAsync } = this.props;

    return (
      <div>
        <h2 className={classes.counterContainer}>
          Counter:
          {' '}
          <span className={classes['counter--green']}>
            {counter}
          </span>
        </h2>
        <button className='btn btn-default' onClick={increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={doubleAsync}>
          Double (Async)
        </button>
      </div>
    )
  }

}

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
