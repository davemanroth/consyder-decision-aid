import React, { Component } from "react";
import store from "store";
import OtherTextField from "./OtherTextField";
import { exists, propify, toInt } from "../helpers/utilities";

class MultChoiceQuest extends Component {
  constructor(props) {
    super(props);
    let storedResponse = props.storedResponse;
    this.storeResult = this.storeResult.bind(this);
    this.getDefaultRadio = this.getDefaultRadio.bind(this);
    this.getDefaultText = this.getDefaultText.bind(this);
    this.state = { 
      showOther: isNaN(toInt(storedResponse)) && exists(storedResponse),
      storedResponse: storedResponse,
      what_would: []
    }
  }

  storeResult = (e) => {
    console.log("OPTION CHANGE");
    let toStore = { ...this.state };
    if (e.target.value === "other_radio") {
      toStore.showOther = !toStore.showOther;
    }
    else if (e.target.type === "text") {
      if (e.target.name === "what_treatment_other") {
        toStore.what_treatment = e.target.value;
      }
      else {
        toStore[e.target.name] = e.target.value;
      }
    }
    else if (e.target.type === "checkbox") {
      const val = e.target.value;
      let what_would = this.state.what_would;
      if (what_would.includes(val)) {
        what_would = what_would.filter(i => i !== val);
      }
      else {
        what_would.push(val);
      }
      toStore.what_would = what_would;
    }
    else {
      toStore.showOther = false;
      toStore[e.target.name] = e.target.id;
    }
    this.setState({ ...toStore });
    this.props.storeResult(toStore);
  }

  getDefaultRadio = (i) => {
    if (exists(this.state.storedResponse)) {
      const resp = toInt(this.state.storedResponse);
      return resp === i || isNaN(resp);
    }
    return false;
  }

  getDefaultText = () => {
    const resp = this.state.storedResponse;
    return isNaN(resp) ? resp : "";
  }

  render() {
    const user = store.get("user");
    return (
      <div className="mult-choice-quest">
        <p>{ this.props.question }</p>
        <div className="form-check">
          { this.props.choices.map( (choice, i) => {
            return (
              <div key={i} className={ (choice === "Lumpectomy" && !user.lump) ? "remove-from-view" : "visible"}>
                <input 
                  className="form-check-input" 
                  type={ this.props.type }
                  name={ this.props.name } 
                  id={ choice === "Other" ? this.props.name + "_other" : i }
                  value={ choice === "Other" ? "other_radio" : i} 
                  onChange={ this.storeResult }
                  defaultChecked={ toInt(this.state.storedResponse) === i }
                />
                <label className="form-check-label" htmlFor={i}>
                  { choice }
                </label>
              </div>
            );
          })}
        </div>
        <OtherTextField
         displayClass={ this.state.showOther ? "block" : "none" }
         name={ this.props.name + "_other" }
         id={ this.props.name + "_other" }
         onChange={ this.storeResult }
         storedValue={ this.getDefaultText() }
        />
      </div>
    );
  }
}

export default MultChoiceQuest;
