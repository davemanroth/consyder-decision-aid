// React class that renders a form, in conjunction with 
// UserDataFields component, allowing admins to add or edit
// users.

import React, { Component } from 'react';
import UserDataFields from './UserDataFields';
import Modal from 'react-bootstrap/Modal';
import { exists } from '../helpers/utilities';

class UserDataForm extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {
      lump: '0',
      admin: '0'
    };
  }

  componentDidMount = () => {
    if (this.props.isModal) {
      const userUpdate = this.props.userUpdate;
      for (const prop in userUpdate) {
        this.updateState(prop, userUpdate[prop]);
      }
    }
  }

  updateState = (key, val) => {
    this.setState({ [key] : val });
  }


  onChange = (e) => {
    this.updateState(e.target.name, e.target.value);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.storeData(this.state);
  }

  handleModalClose = () => {
    this.props.handleModalClose();
  }

  render () {
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <UserDataFields 
            userUpdate={ exists(this.props.userUpdate) ? this.props.userUpdate : "" }
            admin={ exists(this.props.userUpdate) ? this.props.userUpdate.admin : this.state.admin }
            lump={ exists(this.props.userUpdate) ? this.props.userUpdate.lump : this.state.lump }
            onChange={ this.onChange } 
          />
          { this.props.isModal ?
           <Modal.Footer> 
              <button type="button" className="btn btn-secondary btn-lg" onClick={ this.handleModalClose }>Cancel</button>
              <button type="submit" className="btn btn-primary btn-lg">Update</button>
          </Modal.Footer>
            :
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          }
        </form>
      </div>
    );
  }
}

export default UserDataForm;
