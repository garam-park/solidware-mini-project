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
    console.log('success',success);
    let waitingJSX = <div>진행중..</div>;
    let formJSX    =
                    <div>
                      <form>
                        Email :
                      <input type="text" ref="email" name="email"></input>
                      <br/>
                        password:
                      <input type="password" ref="password" name="password"></input>
                      <br/>
                      </form>
                      <button onClick={(e) => this.doChange(e)}>Change</button>
                    </div>;
      let successJSX = success? <div>변경 완료</div>:'';
      return (
        <div>
          Change User Password <br/>
          {successJSX}
          <hr/>
          {(waiting ? waitingJSX: formJSX)}
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
    if(email.length<=0){
      alert('이메일을 입력하세요');
      return;
    }else if(password.length<=0){
      alert('패스워드를 입력하세요');
      return;
    }

    let { users,requestChUsers }  = this.props;
    let hasEmail = false;

    users.forEach(function (value, index, ar) {

      if(value.email === email){
        hasEmail = true;
        requestChUsers({
          email,
          password
        });
        return;
      }

    })
    if(!hasEmail)
      alert('요청하는 이메일이 없습니다.');
  }
}

export default Admin
