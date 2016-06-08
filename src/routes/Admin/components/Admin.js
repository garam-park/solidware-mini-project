/* @flow */
import React from 'react'
import UserItem from './UserItem'

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

    const { waiting, received, success, users,requestChUsers } = this.props
    console.log('success',success);
    let waitingJSX = <div>진행중..</div>;
    let successJSX = success? <div>변경 완료</div>:'';
      //return  compoent..
      return (
        <div>
          Change User Password <br/>
          {successJSX}
          <hr/>
          {(waiting ? waitingJSX: '')}
          <hr/>

          {
            myCustomIf(users !== undefined, function(){
              return users.map((user) => {
                // return <li key={user._id}>{user.email}</li>;
                return (
                  <UserItem
                    key={user._id}
                    _id={user._id}
                    email={user.email}/>
                )
             })
            })
          }

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
