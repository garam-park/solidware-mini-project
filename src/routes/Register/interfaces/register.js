/* @flow */

export type RegObject = {
  email:string,
  password:string
}

export type RegisterStateObject = {
  waiting  : boolean,
  received : boolean,
  success  : boolean
}
