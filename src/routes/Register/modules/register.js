/* @flow */

import type { RegObject, RegisterStateObject } from '../interfaces/register.js'
import { post } from 'ajax'
/**
 * Action Types
 * 등록 요청 -> 등록 받기 -> 1. 정상 처리 / 2. 등록 에러
 */
export const REQUEST_REG = 'REQUEST_REG'
export const RECIEVE_REG = 'RECIEVE_REG'
export const INITIALIZE  = 'INITIALIZE'
const initialState: RegisterStateObject = {
  waiting  : false,
  received : false,
  success  : false
}
/*
 * End of Action Types
 */

/**
 * Action Creators
 */

export function createReqRegAction() : Action {
  return {
    type : REQUEST_REG
  }
}

export function createRecvRegAction(success) : Action {
  return {
    type : RECIEVE_REG,
    success
  }
}

export function createInitAction (): Action {
  return {
    type: INITIALIZE
  }
}

export function requestReg(payload) {
  return (dispatch: Function): Promise => {
    dispatch(createReqRegAction())
    return post('/register',payload,(data)=>{
      let isSuccess = false;
      if(data.ok){
        isSuccess = true;
      }else{
        isSuccess = false;
      }
      dispatch(createRecvRegAction(isSuccess))
    })
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
      success: action.success,
      received: true
    })
   },
   [INITIALIZE]: (state: RegisterStateObject): RegisterStateObject => {
     return ({ ...state,
       initialState
     })
   }
 }

/**
 * Reducers
 */

export default function registerReducer (state: RegisterStateObject = initialState, action: Action): RegisterStateObject {
 const handler = REG_ACTION_HANDLERS[action.type]
 return handler ? handler(state, action) : state
}
