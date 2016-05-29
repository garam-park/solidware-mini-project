import { injectReducer } from '../../store/reducers'
import _debug from 'debug'

const debug = _debug('app:bin:server')

export default (store) => ({
  path: 'register',
  getComponent(nextState, next) {
    require.ensure([
      './containers/RegisterContainer',
      './modules/register'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const RegisterContainer = require('./containers/RegisterContainer').default
      const registerReducer = require('./modules/register').default

      injectReducer(store, {
        key: 'register',
        reducer: registerReducer
      })

      next(null, RegisterContainer)
    })

  }
})
