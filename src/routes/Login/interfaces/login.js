/* @flow */

export type LoginObj = {
  email : string,
  password : string
}

export type User = {
  email : string,
  permission : Array<string>
}

export type LoginStateObj = {
  waiting  : boolean,
  received : boolean,
  success  : boolean,
  user     : User
}
