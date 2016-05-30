/* @flow */
import React from 'react'

type Props = {
  waiting  : boolean,
  received : boolean,
  success  : boolean
}

class Admin extends React.Component {

  constructor(props: Props){
    super(props);
  }

  componentDidMount(){
    this.props.requestUsers();
  }
  render(){

    const { waiting, received, success, users } = this.props
      if(users){
        return (
          <div>
            Change User Password <br/>
            <hr/>
            <form>
              Email :
              <input type="text" ref="email" name="email"></input>
              <br/>
              password:
              <input type="text" ref="password" name="password"></input>
              <br/>
            </form>
            <button>Change</button>
            <hr/>
            User List
          </div>
        )
      }
      else
      return (
        <div>
          Change User Password <br/>
          <hr/>
          <form>
            Email :
            <input type="text" ref="email" name="email"></input>
            <br/>
            password:
            <input type="text" ref="password" name="password"></input>
            <br/>
          </form>
          <button>Change</button>
          <hr/>
        </div>
      )
  }

  // doChange(e) {
  //   const email    = this.refs.email.value.trim();
  //   const password = this.refs.password.value.trim();
  //   this.props.requestUsers({
  //     email,
  //     password
  //   });
  // }
}

export default Admin
