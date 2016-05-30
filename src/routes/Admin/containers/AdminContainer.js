/* @flow */
import { connect } from 'react-redux'
import { requestUsers } from '../modules/admin'

import Admin from '../components/Admin'

const mapActionCreators : {requestUsers: Function} =
{
  requestUsers
}

const mapStateToProps =
(state) =>
({
  waiting  : state.admin.waiting,
  received : state.admin.received,
  success  : state.admin.success,
  email    : state.admin.email,
  password : state.admin.password,
  users    : state.admin.users
})

export default connect(mapStateToProps, mapActionCreators)(Admin)
