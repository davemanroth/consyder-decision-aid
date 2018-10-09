import React, { Component } from 'react';
import axios from 'axios';
import store from 'store';
import isLoggedIn from '../helpers/is_logged_in.js';
import { Redirect } from 'react-router-dom';

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      data: this.state,
      url: 'http://api.bcda.dr809.local?req=authenticate'
    })
      .then( (result) => {
        this.evaluateLogin(result.data);
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  evaluateLogin = (result) => {
    if (result) {
      store.set('loggedIn', true);
      store.set('user', {
        username: result.username,
        lump: result.lump === "1" ? true : false,
        admin: result.admin === "1" ? true : false
      });
      this.props.history.push("/");
    }
    // Add Login validation
  }
      
  render() {
    if (isLoggedIn()) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={ this.onSubmit }>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" onChange={ this.onChange } placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" onChange={ this.onChange } placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Log in</button>
      </form>
    );
  }
}

export default UserLogin;
    

