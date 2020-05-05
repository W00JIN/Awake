import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainPage from './components/views/MainPage/MainPage'
import Footer from './components/views/Footer/Footer'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import NavBar from './components/views/NavBar/NavBar'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component = { Auth(MainPage, true) }/>
          <Route path="/login" component = { Auth(LoginPage, false) }/>
          <Route path="/register" component = { Auth(RegisterPage, false) }/>
        </Switch>
      </div>
      <Footer/>

    </Router>
  );
}

export default App;
