/* @flow */

import type { RegObject, RegisterStateObject } from '../interfaces/register.js'

/**
 * Action Types
 * 등록 요청 -> 등록 받기 -> 1. 정상 처리 / 2. 등록 에러
 */
export const REQUEST_REG = 'REQUEST_REG'
export const RECIEVE_REG = 'RECIEVE_REG'
export const INITIALIZE  = 'INITIALIZE'
/*
 * End of Action Types
 */

/**
 * Action Creators
 */

export function createReqRegAction(value:RegObject) : Action {
  return {
    type : REQUEST_REG,
    payload : {
      email : value.email,
      password : value.password
    }
  }
}

export function createRecvRegAction(success) : Action {
  return {
    type : RECIEVE_REG,
    success
  }
}
export function createInitAction(success) : Action {
  return {
    type : INITIALIZE
  }
}

/**
 * End of Action Creators
 */

 /**
  * Action Handlers
  */
 const REG_ACTION_HANDLERS = {
   [REQUEST_REG]: (state: RegisterStateObject): RegisterStateObject => {
     return ({ ...state, waiting: true })
   },
   [RECIEVE_REG]: (state: RegisterStateObject, action): RegisterStateObject => {
     return ({ ...state,
      waiting: false ,
      success: action.action,
      received: true
    })
   },
   [INITIALIZE]: (state: RegisterStateObject): RegisterStateObject => {
     return ({ ...state,
       waiting  : false,
       received : false,
       success  : false
     })
   }
 }

/**
 * Reducers
 */
const initialState: RegisterStateObject = {
  waiting  : false,
  received : false,
  success  : false
}
export default function registerReducer (state: RegisterStateObject = initialState, action: Action): RegisterStateObject {
 const handler = REG_ACTION_HANDLERS[action.type]
 return handler ? handler(state, action) : state
}
