/* @flow */
import React from 'react'

type Props = {
  waiting  : boolean,
  received : boolean,
  success  : boolean
}

class Login extends React.Component {

  constructor(props: Props){
    super(props);
  }

  render(){

    const { waiting, received, success, user } = this.props

    if(waiting){
      return (<div>기다리시오</div>)
    }else if (received) {
      if(success){
        return (
          <div>
            로그인 성공 : { user.name }<br/>
            // { user.email }<br/>
            // { user.permission }<br/>

          </div>)
      }else {
        return (<div>
          로그인 실패<br/>
          <div>
            로그인
            <form>
              Email :
              <input type="text" ref="email" name="email"></input>
              <br/>
              password:
              <input type="password" ref="password" name="password"></input>
              <br/>
            </form>
            <button onClick={(e) => this.doLogin(e)}>로그인</button>
          </div>
          </div>)
      }

    }else{
      return (
        <div>
          로그인
          <form>
            Email :
            <input type="text" ref="email" name="email"></input>
            <br/>
            password:
            <input type="password" ref="password" name="password"></input>
            <br/>
          </form>
          <button onClick={(e) => this.doLogin(e)}>로그인</button>
        </div>
      )
    }
  }

  doLogin(e) {
    const email    = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    this.props.requestLogin({
      email,
      password
    });
  }
}

export default Login
