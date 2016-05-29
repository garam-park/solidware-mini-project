/* @flow */
import React from 'react'

type Props = {
  waiting  : boolean,
  received : boolean,
  success  : boolean,
  email    : ?string,
  password : ?string
}

class Register extends React.Component {

  constructor(props: Props){
    super(props);
  }

  render(){
    console.log(this.props);
    return (
      <div>
        Register
        // <div>waiting : {this.props.waiting? 'true':'false'}</div>
        // <div>received : {this.props.received? 'true':'false'}</div>
        // <div>success : {this.props.success? 'true':'false'}</div>
        // <div>email : {this.props.email}</div>
        // <div>password : {this.props.password}</div>
        <form>
          Email :
          <input type="text" name="firstname">
          <br>
          password:
          <input type="text" name="lastname">
          <br/>
          <button>register</button>
        </form>
      </div>
    )
  }
}

export default Register
