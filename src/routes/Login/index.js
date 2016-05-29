import { injectReducer } from '../../store/reducers'
import _debug from 'debug'

const debug = _debug('app:bin:server')

export default (store) => ({
  path: 'login',
  getComponent(nextState, next) {
    require.ensure([
      './containers/LoginContainer',
      './modules/login'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const LoginContainer = require('./containers/LoginContainer').default
      const loginReducer = require('./modules/login').default

      injectReducer(store, {
        key: 'login',
        reducer: loginReducer
      })

      next(null, LoginContainer)
    })

  }
})
