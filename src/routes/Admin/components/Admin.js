/* @flow */
import React from 'react'

type Props = {
  waiting  : boolean,
  received : boolean,
  success  : boolean
}
function myCustomIf(condition, onTrue, onFalse){
    onTrue  = onTrue  || function(){ return null }
    onFalse = onFalse || function(){ return null }
    if(condition){
        return onTrue();
    }else{
        return onFalse();
    }
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

    console.log("waiting : "+waiting);
    console.log("received : "+received);
    console.log("success : "+success);
    console.log("users : "+users);
      return (
        <div>
          Change User Password <br/>
          <hr/>
          {(waiting
               ? <div>진행중..</div>
               : <div>
                  <form>
                   Email :
                   <input type="text" ref="email" name="email"></input>
                   <br/>
                   password:
                   <input type="text" ref="password" name="password"></input>
                   <br/>
                   </form>
                   <button onClick={(e) => this.doChange(e)}>Change</button>
                  </div>
          )}
          <hr/>
          <ol>
          {
            myCustomIf(users !== undefined, function(){
              return users.map((user) => {
                return <li key={user._id}>{user.email}</li>;
             })
            })
          }
          </ol>
        </div>
      )
  }

  doChange(e) {
    const email    = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();
    this.props.requestChUsers({
      email,
      password
    });
  }
}

export default Admin
