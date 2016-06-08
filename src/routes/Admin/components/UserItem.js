/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import {requestChUsers} from '../modules/user-item'
import { injectReducer } from '../../../store/reducers'

const mapActionCreators : {requestChUsers:Function} =
{
  requestChUsers
}


let mapStateToProps = (state) =>
({
  waiting  : state.user.waiting,
  received : state.user.received,
  success  : state.user.success
})

type Prop = {
  email : string,
  waiting  : boolean,
  received : boolean,
  success  : boolean,
  key      : string
}

class UserItem extends React.Component {

  constructor(props: Props){
    super(props);
    console.log('props._id',props._id);
  }

  render(){

    const {email,_id,waiting,received,success} = this.props;
    // console.log(email,_id,waiting,received,success);
    let passwordJSX = (
      <div>
      password:
      <input type="password" ref="password" name="password"/>
      </div>
    );
    return (
    <div>
      <form>
        Email : {email}
      <br/>
      {(waiting?'':passwordJSX)}
      </form>
      <button onClick={(e) => this.changePassword(e)}>Change</button>
    </div>
    )

  }

  changePassword(e) {
    const {email,requestChUsers} = this.props;
    const password = this.refs.password.value.trim();
    console.log(email,password);
    if(password.length<=0){
      alert('패스워드를 입력하세요');
      return;
    }else{
      console.log(requestChUsers);
      let f = requestChUsers({
        email,
        password
      });
      return;
    }

  }
}

export default connect(mapStateToProps, mapActionCreators)(UserItem)
