import * as React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { Actions as SessionActions } from "./redux/SessionRedux";

import JokesScreen from "./screens/jokes/JokesScreen";
import LoginScreen from "./screens/login/LoginScreen";
import RegisterScreen from "./screens/register/RegisterScreen";

import { Store, persistor } from "./redux/Store";
import { PersistGate } from 'redux-persist/integration/react'

Store.subscribe(() => {
  console.log("STATE::", Store.getState())
})
class App extends React.Component {
  renderHeader() {
    return (
      <div className="header">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><button onClick={() => { Store.dispatch(SessionActions.Logout()) }}>Logout</button></li>
        </ul>
      </div>
    );


  }// end renderHeader()
  public render() {
    return (
      <Provider store={Store}>

        <PersistGate loading={null} persistor={persistor}>

          <Router>
            {this.renderHeader()}
            <Route path="/" exact component={JokesScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/register" exact component={RegisterScreen} />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
