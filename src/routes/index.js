// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import Counter from './Counter'
import Zen from './Zen'
import Register from './Register'
import NotFound from './NotFound'
import Login from './Login'
import Admin from './Admin'

export const createRoutes = (store) => {
/*  Note: Instead of using JSX, we are using react-router PlainRoute,
    a simple javascript object to provide route definitions.
    When creating a new async route, pass the instantiated store!   */

  const routes = {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes :
    [
      Counter(store),
      Zen(store),
      Register(store),
      Login(store),
      Admin(store),
      NotFound
    ],
    store
  }

  return routes
}

export default createRoutes
