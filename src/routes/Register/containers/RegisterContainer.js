/* @flow */
import { connect } from 'react-redux'
// import { fetchZen, saveCurrentZen } from '../modules'

import Register from '../components/Register'

// import type { ZenObject } from '../interface'

// const mapActionCreators: {fetchZen: Function, saveCurrentZen: Function} = {
//   fetchZen,
//   saveCurrentZen
// }

const mapStateToProps =
(state) =>
({
  waiting  : state.register.waiting,
  received : state.register.received,
  success  : state.register.success,
  email    : state.register.email,
  password : state.register.password
})

export default connect(mapStateToProps, null)(Register)
