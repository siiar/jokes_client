import * as React from 'react';
import { connect } from "react-redux";

import {Redirect} from "react-router";

import {StoreState} from "../../redux/Store";
import {Actions as SessionActions} from "../../redux/SessionRedux";

import * as _ from "lodash";
interface Props {
    username: string;
    token: string;

    loginError?: string;

    login: (username: string, password: string) => void;
}
interface State {
  username: string;
  password: string;
}
class LoginScreen extends React.Component<Props, State> {
    redirectJSX: any = null;

    constructor(props: Props){
        super(props);
        this.state = {
          username: "siar",
          password: "siar"
        }
    }// end constructor()
    componentWillMount(){
      if(this.props.token.length > 0){
        // user is logged in
        this.redirectJSX = <Redirect to="/"/>
      }// end if
    }

    componentWillReceiveProps(nextProps: Props){
      if(nextProps.token.length > 0){
        // user is logged in
        this.redirectJSX = <Redirect to="/"/>
      }// end if

      if(!_.isEqual(nextProps.loginError, this.props.loginError)){
        if(nextProps.loginError)
          window.alert(nextProps.loginError);
      }// end if

    }// end componentWillReceiveProps()
    render(){
      return (
        <div>
          {this.redirectJSX}
          <div><input placeholder={"Username"} type="text" onChange={(event) => this.setState({username: event.target.value})}/></div>
          <div><input placeholder={"Password"} type="password" onChange={(event) => this.setState({password: event.target.value})} /></div>
          <div><button onClick={() => this.props.login(this.state.username, this.state.password)}>Login</button></div>
        </div>
      );
    }// end render()
}// end LoginScreen

function mapStateToProps(state: StoreState) {
    return {
      username: state.session.username,
      token: state.session.token,

      loginError: state.session.error
    }//end return
  }//end mapStateToProps()
  
  function mapDispatchToProps(dispatch: any) {
    return {
      login: (username: string, password: string) => dispatch(SessionActions.LoginAsync(username, password))
    }//end return
  }//end mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);