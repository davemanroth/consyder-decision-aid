// React class that renders the Next steps screen of the decision aid, 
// giving the user the opportunity to choose which surgery she's leaning toward
// or if she's not ready to make a decision. This class relies heavily on the
// MultChoiceQuest component which handles most of the complexity of this
// screen.

import React, { Component } from "react";
import MultChoiceQuest from "./MultChoiceQuest";
import NextButton from "./NextButton";
import { animateScroll } from "react-scroll";
import questions from "../helpers/next_steps_content.json";
import { toInt, exists, propify } from "../helpers/utilities";

class NextSteps extends Component {
  constructor(props) {
    super(props);
    const saved = props.savedValues;
    this.storeResult = this.storeResult.bind(this);
    this.isNotReady = this.isNotReady.bind(this);
    this.whatWouldHelp = this.whatWouldHelp.bind(this);
    this.resetOther = this.resetOther.bind(this);
    this.state = { ...saved } || {};
  }

  storeResult = (data, choicesLength) => {
    delete data.storedResponse;
    this.resetOther(data);
    this.setState({ ...data });

  }

  componentDidMount = () => {
    animateScroll.scrollToTop({ duration: 100 });
  }

  componentWillUnmount = () => {
    this.props.onSaveProgress({ next: this.state });
  }

  resetOther = (data) => {
    if ( toInt(data.what_treatment) < 3 && exists(data.what_treatment_other_text) ) {
      data.what_treatment_other_text = "";
    }
    else if ( exists(data.what_would) && !data.what_would.includes("6") && exists(data.what_would_other_text) ) {
      data.what_would_other_text = "";
    }
    else {}
  }


  isNotReady = (how_ready) => {
    return ( 
        exists(how_ready) && toInt(how_ready) >= 1
    ); 
  }

  whatWouldHelp = () => {
    const question = questions.followup;
    return (
      <MultChoiceQuest
        question={ question.question }
        choices={ question.choices }
        name={ propify(question.question) }
        storeResult={ this.storeResult }
        type="checkbox"
        storedResponse={ this.state[propify(question.question)] }
        storedOther={ this.state.what_would_other_text }
      />
    );
  }
       
  render() {
    return (
      <div>
        <h1>Next steps</h1>
        <p className="disclaimer">The information you enter below is for you and is not being saved to this website. Having a printed copy might be helpful, and on the last screen, you’ll have an option to print the information and your responses.</p>
        { questions.primary.map( (question, i) => {
          return (
            <MultChoiceQuest
              key={i}
              question={ question.question }
              choices={ question.choices }
              storeResult={ this.storeResult }
              name={ propify(question.question) }
              type="radio"
              storedResponse={ this.state[propify(question.question)] }
              storedOther={ this.state.what_treatment_other_text }
            />
          );
        })}
        { this.isNotReady(this.state.how_ready) ? this.whatWouldHelp() : "" }
        <NextButton dest="summary" />
      </div>
    );
  }
}

export default NextSteps;

