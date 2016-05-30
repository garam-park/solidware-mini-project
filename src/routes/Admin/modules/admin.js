/* @flow */

import type { UserInfo } from '../interfaces/admin'
import { post } from 'jquery'

// Action type
// ------------------------------------
export const REQUEST_USERS      = 'REQUEST_USERS'
export const RECIEVE_USERS      = 'RECIEVE_USERS'
export const REQUEST_USER_PW_CH = 'REQUEST_USER_PW_CH'

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

export function createReqChangeUserAction() : Action {
  return {
    type: REQUEST_USER_PW_CH
  }
}

export function requestUsers(payload) {
  return (dispatch: Function): Promise => {
    dispatch(createReqUsersAction())
    return post('http://localhost:3001/graphql',{
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
     waiting: false ,
     success: action.success,
     received: true,
     users: action.users
   })
  },
  [REQUEST_USER_PW_CH]: (state) => {
    return ({ ...state,
      initialState
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
