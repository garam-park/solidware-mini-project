/* @flow */

import type { UserInfo } from '../interfaces/admin'
import { post } from 'jquery'

let GRAPHQL_URL = "https://agile-anchorage-81292.herokuapp.com/graphql";
// let GRAPHQL_URL = "http://localhost:5000/graphql";
// Action type
// ------------------------------------
export const REQUEST_USERS      = 'REQUEST_USERS'
export const RECIEVE_USERS      = 'RECIEVE_USERS'

const initialState = {
  waiting  : false,
  received : false,
  success  : false
}

export function createReqUsersAction() : Action {
  return {
    type: REQUEST_USERS
  }
}

export function createRecvUsersAction(users : Array<UserInfo>) : Action {
  return {
    type: RECIEVE_USERS,
    users
  }
}

export function requestUsers(payload) {
  return (dispatch: Function): Promise => {
    console.log(GRAPHQL_URL);
    dispatch(createReqUsersAction())
    return post(GRAPHQL_URL,{
      query:
      `{
        users{
          _id,
          name,
          email
        }
      }`
    }).done(resp => {
      dispatch(createRecvUsersAction(resp.data.users))
    })
  }
}


/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_USERS]: (state) => {
    return ({ ...state, waiting: true })
  },
  [RECIEVE_USERS]: (state, action) => {
    return ({ ...state,
     users: action.users,
     waiting:false
   })
  }
}

/**
* Reducers
*/

export default function reducer (state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
