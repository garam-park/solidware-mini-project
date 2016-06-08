import { post } from 'jquery'

let GRAPHQL_URL = "https://agile-anchorage-81292.herokuapp.com/graphql";
  // let GRAPHQL_URL = "http://localhost:5000/graphql";


export const REQUEST_USER_PW_CH = 'REQUEST_USER_PW_CH'
export const RECIEVE_USER_PW_CH = 'RECIEVE_USER_PW_CH'

const initialState = {
  waiting  : false,
  received : false,
  success  : false
}

export function createReqChangeUserAction() : Action {
  return {
    type: REQUEST_USER_PW_CH
  }
}

export function createRecvChUsersAction(success,message) : Action {
  return {
    type: RECIEVE_USER_PW_CH,
    success,
    message
  }
}

export function requestChUsers(payload) {
  return (dispatch: Function): Promise => {
    console.log(GRAPHQL_URL);
    dispatch(createReqChangeUserAction())
    console.log(payload);
    let query = "mutation {"+
      "updateUser(email: \""+payload.email+"\", password: \""+payload.password+"\") {"+
        "email,"+
        "name"+
      "}"+
    "}"
    console.log("query : "+query);
    return post(GRAPHQL_URL,{
      query:query
    }).done(resp => {
      console.log('resp',resp);
      let success  = (resp.data.updateUser !== null)
      let message  = 'success'
      if(!success)
        message = resp.errors[0].message
      dispatch(createRecvChUsersAction(success,message))
    })
  }
}

/**
 * Action Handlers
 */
const ACTION_HANDLERS = {
  [REQUEST_USER_PW_CH]: (state) => {
    console.log("REQUEST_USER_PW_CH",state);
    return ({ ...state,
      waiting:true,
      success:false,
      received:false
    })
  },
  [RECIEVE_USER_PW_CH]: (state, action) => {
    let newState =
      { ...state,
       waiting: false ,
       success: action.success,
       received: true
      }
    console.log("RECIEVE_USER_PW_CH",newState);
    alert(action.message)
    return (newState)
  },
}

/**
* Reducers
*/

export default function reducer (state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  console.log("ACTION_HANDLERS",state);
  return handler ? handler(state, action) : state
}
