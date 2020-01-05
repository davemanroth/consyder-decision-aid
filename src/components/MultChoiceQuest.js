// Very complex and annoying React class that handles the multiple choice
// radio buttons and checkboxes used in the Next steps portion of the decision
// aid. There is a fair amount of sophistication and decision trees based on
// certain options a user selects. The storeResult function does most of the 
// heavy lifting.

import React, { Component } from "react";
import store from "store";
import OtherTextField from "./OtherTextField";
import { exists, toInt } from "../helpers/utilities";

class MultChoiceQuest extends Component {
  constructor(props) {
    super(props);
    let storedResponse = props.storedResponse;
    let hasOtherCheck = false;

// Check the props to determine if any of the "Other" text areas were 
// enabled (stored as option "6") and make sure they're shown right 
// when this component loads
    if (exists(props.storedResponse)) {
      hasOtherCheck = props.storedResponse === "6" || props.storedResponse.includes("6");
    }
    this.storeResult = this.storeResult.bind(this);
    this.getStoredCheckboxOptions = this.getStoredCheckboxOptions.bind(this);
    this.isCheckbox = this.isCheckbox.bind(this);
    this.otherWasSelected = this.otherWasSelected.bind(this);
    this.getDefaultRadio = this.getDefaultRadio.bind(this);
    this.getDefaultChecked = this.getDefaultChecked.bind(this);
    this.getDefaultText = this.getDefaultText.bind(this);
    this.state = { 
      showOther: exists(storedResponse) && (storedResponse === "3" || hasOtherCheck),
      storedResponse: storedResponse
    }
  }

  getStoredCheckboxOptions = () => {
    let what_would = [];
    if (exists(this.state.what_would)) {
      what_would = this.state.what_would;
    }
    else if (exists(this.state.storedResponse) && typeof(this.state.storedResponse) === "object") {
      what_would = this.state.storedResponse;
    }
    else {}
    return what_would;
  }

  otherWasSelected = (e) => {
    return e.target.id.split("_").pop() === "other"
  }

  isCheckbox = (e) => {
    return e.target.type === "checkbox"
  }

// Review data from radio buttons/checkboxes/text areas
// and take appropriate actions
  storeResult = (e) => {
    let toStore = { ...this.state };
    if (this.otherWasSelected(e) && !this.isCheckbox(e) ) {
      toStore.showOther = !toStore.showOther;
      toStore[e.target.name] = e.target.value;
    }
    else if (e.target.type === "text") {
      toStore[e.target.name] = e.target.value;
    }
    else if (this.isCheckbox(e)) {
      if (this.otherWasSelected(e)) {
        toStore.showOther = !toStore.showOther;
        toStore.what_would_other_text = "";
      }
      const val = e.target.value;
      const stored = this.getStoredCheckboxOptions();
      let what_would = typeof(stored) === "object" ? stored : [stored];
      if (what_would.includes(val)) {
        what_would = what_would.filter(i => i !== val);
      }
      else {
        what_would.push(val);
      }
      toStore.what_would = what_would;
    }
    else {
      if (e.target.name === "what_treatment") {
        toStore.what_treatment_other_text = "";
      }
      toStore.showOther = false;
      toStore[e.target.name] = e.target.value;
    }
    this.setState({ ...toStore });
    this.props.storeResult(toStore, this.props.choices.length);
  }

  getDefaultChecked = (i) => {
    const resp = this.state.storedResponse;
    if (typeof(resp) === "object") {
      return resp.includes(i.toString());
    }
    return toInt(resp) === i
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
            // Only show Lumpectomy option if the user qualifies for it
              <div key={i} className={ (choice === "Lumpectomy" && !user.lump) ? "remove-from-view" : "visible"}>
                <input 
                  className="form-check-input" 
                  type={ this.props.type }
                  name={ this.props.name } 
                  id={ choice === "Other" ? this.props.name + "_other" : this.props.name + "_" + i }
                  value={i} 
                  onChange={ this.storeResult }
                  defaultChecked={ this.getDefaultChecked(i) }
                />
                <label className="form-check-label" htmlFor={i}>
                  { choice }
                </label>
              </div>
            );
          })}
        </div>
  // Hide the Other text area by default, only show if "Other" radio
  // button/checkbox activated
        <OtherTextField
         display={ this.state.showOther }
         name={ this.props.name + "_other_text" }
         id={ this.props.name + "_other_text" }
         onChange={ this.storeResult }
         storedValue={ this.props.storedOther }
        />
      </div>
    );
  }
}

export default MultChoiceQuest;
