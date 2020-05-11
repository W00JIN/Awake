import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainPage from './components/views/MainPage/MainPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      
        
        <Switch>
                <Route exact path="/" component = { Auth(MainPage, true) }/>
                <Route path="/login" component = { Auth(LoginPage, false) }/>
                <Route path="/register" component = { Auth(RegisterPage, false) }/>
        </Switch>
      
    </Router>
  );
}

export default App;
