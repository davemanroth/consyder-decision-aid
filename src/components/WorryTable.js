// React class that renders a table with a questions about anxiety levels and
// corresponding number scales. Content is imported from JSON file and passed
// to the table.

import React, { Component } from 'react';
import { numArray, toInt } from '../helpers/utilities.js';
import worry_content from '../helpers/worry_content.json';

class WorryTable extends Component {
  constructor(props) {
    super(props);
		const saved = this.props.savedValues || {};
    this.handleChange = this.handleChange.bind(this);
		this.state = saved;
  }

  handleChange(e) {
    this.props.onScaleSelect(e.target.name, e.target.id);
  }


  render() {
    const nums = numArray("5").slice(1);
		const labels = worry_content.labels;
		const worries = worry_content.body;
    return (
      <table className="table table-striped table-responsive-sm">
        <thead>
          <tr>
						{ labels.map( (label, i) => {
							return (
								<th key={i} scope="col">{ label }</th>
							);
						})}
          </tr>
        </thead>
        <tbody>
          { worries.map( (worry, i) => {
            return (
              <tr key={i}>
                <td>{ worry.content }</td>
                { nums.map( (num, j) => {
                  return (
                    <td key={j}>
                      <div className="form-check">
                        <input 
                          className="form-check-input"
                          type="radio"
													defaultChecked={ toInt(this.state[worry.type]) === num }
                          name={ worry.type }
                          key={j}
                          id={num}
                          onChange={ this.handleChange }
                        />
                        <label className="form-check-label">{num}</label>
                      </div>
                    </td>
                  )
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
export default WorryTable;
