import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home.js';
import NavBar from './components/NavBar.js';
import PrivateRoute from './components/PrivateRoute.js';
import Login from './components/Login.js';
import UserRegistration from './components/UserRegistration.js';
import TreatmentOptions from './components/TreatmentOptions.js';
import isLoggedIn from './helpers/is_logged_in.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <div className="banner"></div>
        { isLoggedIn() ? <NavBar /> : "" }
        <section>
          <div className="container">
            <Route path="/login" component={ Login } />
            <PrivateRoute path="/admin" component={ UserRegistration } />
            <PrivateRoute path="/treatment-options" component={ TreatmentOptions } />
            <PrivateRoute exact path="/" component={ Home } />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
