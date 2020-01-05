// Stateless component that logs the user out, clearing data from
// the "store" module, and redirecting to the login page

import React from 'react';
import store from 'store';
import { NavLink, Redirect, withRouter } from 'react-router-dom';

const Logout = (props) => {
  return (
      <NavLink 
        className="nav-item nav-link" 
        to="#" 
        onClick={ (e) => {
          props.reset()
          props.history.push("/login");
          store.remove('user');
          store.set('loggedIn', false);
          e.preventDefault();
          clearTimeout(props.timeoutid)
          return <Redirect to="/login" />;
        }}
      >Logout</NavLink>
  )
}

export default withRouter(Logout);
