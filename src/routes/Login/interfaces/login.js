/* @flow */

export type LoginObj = {
  email : string,
  password : string
}

export type LoginStateObj = {
  waiting  : boolean,
  received : boolean,
  success  : boolean
}
