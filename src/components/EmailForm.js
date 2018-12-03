import React, { Component } from 'react';
import axios from 'axios';

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
      <form className="form-inline" onSubmit={ this.handleSubmit }  enctype="text/plain">
        <label className="sr-only">Enter your email</label>
        <input type="email" name="email" placeholder="Enter your email" className="form-control" />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}
export default EmailForm;
