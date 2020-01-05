// React class responsible for all front-end user management utilities.
// Administrators can create news users, view/update/delete existing users.
// Basic user permissions are also added (whether user is eligible for
// lumpectomy or whether user is an administrator) 
import React, { Component } from 'react';
import axios from 'axios';
import { animateScroll } from "react-scroll";
import store from "store";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";
import UserDataForm from './UserDataForm';
import UserList from './UserList';
import Modal from 'react-bootstrap/Modal';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.hasBlankOrMissingFields = this.hasBlankOrMissingFields.bind(this);
    this.compileAlerts = this.compileAlerts.bind(this);
    this.produceAlerts = this.produceAlerts.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.filterFields = this.filterFields.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.updateUserList = this.updateUserList.bind(this);
    this.initializePasswordField = this.initializePasswordField.bind(this);
    this.findRecord = this.findRecord.bind(this);
    this.state = {
      rows: [],
      userUpdate: {},
      checkFields: {
        first_name: "First name",
        last_name: "Last name",
        username: "Username",
        password: "Password"
      },
      modal: {
        show: false
      },
      alert: {
        variant: "",
        show: false,
        text: "",
        alertContent: []
       }
    };
  }

// Immediately retrieve all current users from api once the component loads
// and store it in state
  componentDidMount = () => {
    axios({
      method: 'get',
      url: this.props.api + '?req=users'
    })
      .then( (result) => {
        this.setState({
          rows: result.data
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  hasBlankOrMissingFields = (data) => {
    return Object.values(data).includes("") || Object.entries(data).length < 6;;
  }

  compileAlerts = (data) => {
    const allKeys = Object.keys(this.state.checkFields);
    const dataKeys = Object.keys(data);
    let empties, blanks = [];
    blanks = allKeys.filter( (key) => {
      return !dataKeys.includes(key); 
    });
    empties = dataKeys.filter( (key) => {
      return data[key] === "";
    });
    return blanks.concat(empties);
  }

  produceAlerts = (data) => {
    const alerts = this.compileAlerts(data);
    const allAlerts = alerts.map( (alert) => {
      return this.state.checkFields[alert];
    });
    const alertObj = {
      alertContent: allAlerts,
      show: true,
      text: "Please enter the user's ",
      variant: "danger"
    }
    this.setState({ alert: alertObj });
  }

  onClose = () => {
    let alert = Object.assign({}, this.state.alert);
    alert.show = false;
    this.setState({ alert : alert });
  }

// Function to handle new user form submissions
  handleUserFormSubmit = (data) => {
    animateScroll.scrollToTop({ duration: 100 });
    if (this.hasBlankOrMissingFields(data)) {
      this.produceAlerts(data);
      return false;
    }
    axios({
      method: 'post',
      url: this.props.api + '?req=add_user',
      data: data
    })
      .then( (result) => {
        const id = result.data.toString();
        const newdata = {...data, id };
        let updated_rows = this.state.rows;
        let alertObj = {
          variant: "success",
          show: true,
          text: "",
          alertContent: ["User added successfully"]
        }
// If new user saved properly, immediately save to state so the table of
// users is updated on the fly
        updated_rows.push(newdata);
        this.setState({ 
          alert: alertObj,
          rows: updated_rows
        });
        this.clearFields();
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  handleDelete = (id) => {
    axios({
      method: 'delete',
      url: this.props.api + '?req=delete_user',
      data: id
    })
      .then( (result) => {
        console.log(result);
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  handleUserUpdate = (data) => {
    const fieldsToUpdate = this.filterFields(data);
    if(Object.entries(fieldsToUpdate).length === 1) {
      this.handleModalClose();
      return;
    }
    this.updateUserList(fieldsToUpdate);
    axios({
      method: 'post',
      url: this.props.api + '?req=update_user',
      data: fieldsToUpdate
    })
      .then( (result) => {
        console.log(result);
      })
      .catch( (error) => {
        console.log(error);
      });
    this.handleModalClose();
  }

  filterFields = (submittedFields) => {
  {/*
  */}
    const updatedUser = this.initializePasswordField(submittedFields);
    const originalUser = this.state.userUpdate;
    updatedUser.id = submittedFields.id;
    for (const key in originalUser) {
      if( submittedFields[key] !== originalUser[key]) {
        updatedUser[key] = submittedFields[key];
      }
    }
    return updatedUser;
  }

  clearFields = () => {
    let cleared = this.state.checkFields;
    for (let key in cleared) {
      cleared[key] = "";
    }
    this.setState({ userUpdate: cleared });
  }

  initializePasswordField = (submittedFields) => {
    if(submittedFields.hasOwnProperty("password")) {
      return { password: submittedFields.password }
    }
    return {}
  }


  handleModalClose = () => {
    this.setState({ 
      modal: {
        show: false
      }
    });
  }

  handleEditUser = (id) => {
    const user = this.findRecord(id);
    this.setState({ 
      userUpdate: user,
      modal: { show: true }
    });
  }

  updateUserList = (user) => {
    const keys = Object.keys(user);
    let updatedRows = this.state.rows;
    updatedRows.map( (row, i) => {
      if(row.id === user.id) {
        keys.map( (key) => {
          row[key] = user[key];    
        });
      }
    });
    this.setState({ rows: updatedRows });
  }

  findRecord = (id) => {
    const rows = this.state.rows;
    const user = rows.find( (row) => {
      return row.id === id;
    });
    return user;
  }

  render () {
    const user = store.get("user");
    if (!user.admin) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Alert
          variant={ this.state.alert.variant }
          dismissible
          show={ this.state.alert.show }
          onClose={ this.onClose }
        >
          { this.state.alert.alertContent.map( (alert, i) => {
            return <p key={i}>{ this.state.alert.text + alert }</p>
          })} 
        </Alert>

// This modal only appears if an admin clicks the "update" button corresponding
// to a particular user. The modal then appears with the user's data displayed
// in form fields, allowing the admin to update the data
        <Modal show={ this.state.modal.show} onHide={ this.handleModalClose }>
          <Modal.Header closeButton>
            <Modal.Title>User update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserDataForm 
              userUpdate={ this.state.userUpdate } 
              storeData={ this.handleUserUpdate } 
              handleModalClose={ this.handleModalClose }
              isModal 
            />
          </Modal.Body>
        </Modal>
        <h1>Administration page</h1>
        <h2>Add new users</h2>
        <UserDataForm 
          storeData={ this.handleUserFormSubmit } 
        />
        <h2>List of current users</h2>
        <UserList 
          editUser={ this.handleEditUser }
          onDelete={ this.handleDelete }
          rows={ this.state.rows || [] } 
          className={ this.state.rows ? "d-block" : "d-none" } 
        />
      </div>
    );
  }
}

export default Admin;
