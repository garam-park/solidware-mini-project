/* @flow */

import type {LoginObj,LoginStateObj} from '../interfaces/login'
import { post } from 'ajax'

/**
 * Action Types
 * 등록 요청 -> 등록 받기 -> 1. 정상 처리 / 2. 등록 에러
 */
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECIEVE_LOGIN = 'RECIEVE_LOGIN'

const initialState: LoginStateObj = {
  waiting  : false,
  received : false,
  success  : false,
  user     : {
    permission : []
  }
}
/*
 * End of Action Types
 */

 export function createReqAction() : Action {
   return {
     type : REQUEST_LOGIN
   }
 }

 export function createRecvAction(success,data) : Action {
   return {
     type : RECIEVE_LOGIN,
     success,
     data
   }
 }

 export function requestLogin(payload) {
   return (dispatch: Function): Promise => {
     console.log("requestLogin");
     dispatch(createReqAction())
     return post('/login',payload,(data)=>{
       console.log("requestLogin cb's data:"+data);
       let isSuccess = false;
       if(data.ok){
         isSuccess = true;
       }else{
         isSuccess = false;
       }
       dispatch(createRecvAction(isSuccess,data))
     })
   }
 }

 /**
  * Action Handlers
  */
 const ACTION_HANDLERS = {
   [REQUEST_LOGIN]: (state: LoginStateObj): LoginStateObj => {
     return ({ ...state, waiting: true })
   },
   [RECIEVE_LOGIN]: (state: LoginStateObj, action): LoginStateObj => {
     console.log(action.data);
     return ({ ...state,
      waiting  : false ,
      success  : action.success,
      received : true,
      user     : action.data
    })
   }
 }

/**
 * Reducers
 */

export default function loginReducer (state: LoginStateObj = initialState, action: Action): LoginStateObj {
 const handler = ACTION_HANDLERS[action.type]
 return handler ? handler(state, action) : state
}
