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
function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component = { MainPage }/>
          <Route path="/login" component = { LoginPage }/>
          <Route path="/register" component = { RegisterPage }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
