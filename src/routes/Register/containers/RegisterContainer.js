/* @flow */
import { connect } from 'react-redux'
import { requestReg } from '../modules/register'

import Register from '../components/Register'

const mapActionCreators : {requestReg: Function} =
{
  requestReg
}

const mapStateToProps =
(state) =>
({
  waiting  : state.register.waiting,
  received : state.register.received,
  success  : state.register.success,
  email    : state.register.email,
  password : state.register.password
})

export default connect(mapStateToProps, mapActionCreators)(Register)
