// Basic React class that renders a form to capture a user's email 
// address if she chooses to have a study administrator contact her 
// for emotional support.

import React, { Component } from 'react';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: ""
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.storeData(this.state);
  }

  render() {
    return (
      <form className="form-inline email-input" onSubmit={ this.handleSubmit }  encType="text/plain">
        <label className="sr-only">Enter your email</label>
        <input type="email" name="email" placeholder="Enter your email" onChange={ this.onChange } className="form-control" />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}
export default EmailForm;
