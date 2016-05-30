/* @flow */
import React from 'react'
import classes from './Zen.scss'

import type { ZenObject } from '../interfaces/zen'

type Props = {
  zen: ?ZenObject,
  saved: Array<ZenObject>,
  fetchZen: Function,
  saveCurrentZen: Function
}

class Zen extends React.Component {
  constructor(props : Props){
    super(props)
  }

  render(){

    const { fetchZen, saveCurrentZen, saved, zen} = this.props

    return (
      <div>
        <div>
          <h2 className={classes.zenHeader}>
            {zen ? zen.value : ''}
          </h2>
          <button className='btn btn-default' onClick={fetchZen}>
            Fetch a wisdom
          </button>
          {' '}
          <button className='btn btn-default' onClick={saveCurrentZen}>
            Save
          </button>
        </div>
        {saved.length
          ? <div className={classes.savedWisdoms}>
            <h3>
              Saved wisdoms
            </h3>
            <ul>
              {saved.map(zen =>
                <li key={zen.id}>
                  {zen.value}
                </li>
              )}
            </ul>
          </div>
          : null
        }
      </div>
    )
  }
}

Zen.propTypes = {
  zen: React.PropTypes.object,
  saved: React.PropTypes.array.isRequired,
  fetchZen: React.PropTypes.func.isRequired,
  saveCurrentZen: React.PropTypes.func.isRequired
}

export default Zen
