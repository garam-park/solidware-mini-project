/* @flow */
import { connect } from 'react-redux'
import { requestLogin } from '../modules/login'

import Login from '../components/Login'

const mapActionCreators : {requestLogin: Function} =
{
  requestLogin
}

const mapStateToProps =
(state) =>
({
  waiting  : state.login.waiting,
  received : state.login.received,
  success  : state.login.success,
  email    : state.login.email,
  password : state.login.password
})

export default connect(mapStateToProps, mapActionCreators)(Login)
