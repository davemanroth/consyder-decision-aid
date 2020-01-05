// Stateless component that renders form fields for new user data input used in
// Admin and Modal components

import React from 'react';

const UserDataFields = (props) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="firstName">First name</label>
        <input type="text" className="form-control" defaultValue={ props.userUpdate.first_name } name="first_name" onChange={ props.onChange }/>
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last name</label>
        <input type="text" className="form-control" defaultValue={ props.userUpdate.last_name || "" }  name="last_name" onChange={ props.onChange }/>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" defaultValue={ props.userUpdate.username || "" } name="username" onChange={ props.onChange }/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" defaultValue={ props.userUpdate.password || "" } name="password" onChange={ props.onChange }/>
      </div>
      <div className="form-group">
        <p>Does this person qualify for a lumpectomy?</p>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            name="lump" 
            value="1"  
            defaultChecked={ props.lump === '1' } 
            onChange={ props.onChange }/>
          <label className="form-check-label" htmlFor="canHaveLumpectomyYes">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            name="lump"
            value="0" 
            defaultChecked={ props.lump === '0' }
            onChange={ props.onChange }
          />
          <label className="form-check-label" htmlFor="canHaveLumpectomy">
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <p>Is this person an administrator?</p>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            name="admin"
            value="1"  
            defaultChecked = { props.admin === '1' }
            onChange={ props.onChange }
          />
          <label className="form-check-label" htmlFor="admin">
            Yes
          </label>
        </div>
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="radio" 
            name="admin"
            value="0"
            defaultChecked = { props.admin === '0' } 
            onChange={ props.onChange }
          />
          <label className="form-check-label" htmlFor="admin">
            No
          </label>
        </div>
      </div>
    </div>
  );
}

export default UserDataFields;
