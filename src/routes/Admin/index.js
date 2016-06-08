import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'admin',
  getComponent (nextState, next) {
    require.ensure([
      './containers/AdminContainer',
      './modules/admin'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */
      const Admin = require('./containers/AdminContainer').default
      const adminReducer = require('./modules/admin').default
      const userReducer  = require('./modules/user-item').default

      injectReducer(store, {
        key: 'admin',
        reducer: adminReducer
      })

      injectReducer(store, {
        key: 'user',
        reducer: userReducer
      })

      next(null, Admin)
    })
  }
})
