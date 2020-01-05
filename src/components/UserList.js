// React class responsible for displaying a list of all current
// registered users in the database. Also handles user editing/deletion,
// passing functionality through props.

import React, { Component } from 'react';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.state = { rows:  [] };
  }

  onDelete = (e) => {
    e.preventDefault();
    const row = e.target.closest("tr");
    row.closest("tr").remove();
    this.props.onDelete(row.id);
  }

  onEdit = (e) => {
    const id = e.target.closest('tr').id;
    this.props.editUser(id);
    e.preventDefault();
  }

  render() {
    return (
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Last name</th>
            <th scope="col">First name</th>
            <th scope="col">Username</th>
            <th scope="col">Lumpectomy</th>
            <th scope="col">Tasks</th>
          </tr>
        </thead>
        <tbody>
          { this.props.rows.length > 0 ? ( this.props.rows.map( (row, i) => {
            return (
              <tr key={ i } id={ row.id }>
                <td>{ row.id }</td>
                <td>{ row.last_name }</td>
                <td>{ row.first_name }</td>
                <td>{ row.username }</td>
                <td>{ row.lump === "1" ? "Yes" : "No" }</td>
                <td>
                  <button 
                    onClick={ this.onEdit }
                    type="button" 
                    className="btn btn-warning"
                  >Edit</button>
                  <button 
                    onClick={ this.onDelete }
                    type="button" 
                    className="btn btn-danger"
                  >Delete</button>
                </td>
              </tr>
            )
          })
          ) : <tr></tr>
          }
        </tbody>
      </table>
    );
  }
}

export default UserList;
