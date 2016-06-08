/* @flow */
import React,{PropTypes} from 'react'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

class Header extends React.Component{

  constructor(props){
    super(props);
  }

  render(){

    const { user } = this.props;
    let adminLink;
    if(user && user.permission)
    if (user.permission.indexOf('admin')!==-1) {
      adminLink =
      <Link to='/admin' activeClassName={classes.activeRoute}>
        Admin
      </Link>;
    }

    return(
      <div>
        <h1>React Redux Starter Kit</h1>
        <IndexLink to='/' activeClassName={classes.activeRoute}>
          Home
        </IndexLink>
        {' · '}
        <Link to='/counter' activeClassName={classes.activeRoute}>
          Counter
        </Link>
        {' · '}
        <Link to='/zen' activeClassName={classes.activeRoute}>
          Zen
        </Link>
        {' · '}
        <Link to='/register' activeClassName={classes.activeRoute}>
          Register
        </Link>
        {' · '}
        <Link to='/login' activeClassName={classes.activeRoute}>
          Login
        </Link>
        {adminLink?' · ':''}
        {adminLink}

      </div>
    )
  }
}

// Header.propTypes = {
//   user : PropTypes.object.isRequired
// }
const mapStateToProps =
function (state) {
  let user = {};
  if(state.login && state.login.user){
    user = state.login.user;
  }
  return {
    user
  }
}

Header =  connect(mapStateToProps)(Header)

export default Header
