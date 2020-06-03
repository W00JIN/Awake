import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainPage from './views/MainPage/MainPage'
import UserPage from './views/UserPage/UserPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import Auth from '../hoc/auth'

function App(props) {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(MainPage, true)} />
        <Route path="/user/:userID" component={Auth(UserPage, true)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />

      </Switch>
    </Router>
  );
}

export default App;
