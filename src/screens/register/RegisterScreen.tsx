import * as React from 'react';
import { connect } from "react-redux";

import {StoreState} from "../../redux/Store";
import {Actions as SessionActions} from "../../redux/SessionRedux";

import * as _ from "lodash";

interface Props {
    username: string;
    token: string;

    sessionError?: string;
    registerSuccess?: boolean;

    register: (username: string, password: string, name: string) => void;
}
interface State {
  username: string;
  password: string;
  name: string;
}
class RegisterScreen extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
          username: "",
          password: "test",
          name: "TEST"
        }
    }// end constructor()
    componentWillReceiveProps(nextProps: Props){
      if(nextProps.username.length > 0 && nextProps.token.length > 0){
        // user is logged in
      }// end if

      if(!_.isEqual(nextProps.sessionError, this.props.sessionError)){
        if(nextProps.sessionError)
          window.alert(nextProps.sessionError);
      }// end if
      if(!_.isEqual(nextProps.registerSuccess, this.props.registerSuccess)){
        if(nextProps.registerSuccess)
          window.alert("Successfully Registered");
      }// end if

    }// end componentWillReceiveProps()
    render(){
      return (
        <div>
          <div><input placeholder={"Username"} type="text" onChange={(event) => this.setState({username: event.target.value})}/></div>
          <div><input placeholder={"Password"} type="password" onChange={(event) => this.setState({password: event.target.value})} /></div>
          <div><input placeholder={"Name"} type="text" onChange={(event) => this.setState({name: event.target.value})} /></div>
          <div><button onClick={() => this.props.register(this.state.username, this.state.password, this.state.name)}>Register</button></div>
        </div>
      );
    }// end render()
}// end RegisterScreen

function mapStateToProps(state: StoreState) {
    return {
      username: state.session.username,
      token: state.session.token,

      sessionError: state.session.error,
      registerSuccess: state.session.registerSuccess,
    }//end return
  }//end mapStateToProps()
  
  function mapDispatchToProps(dispatch: any) {
    return {
      register: (username: string, password: string, name: string) => dispatch(SessionActions.RegisterAsync(username, password, name))
    }//end return
  }//end mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);