// React class that primarily renders static text explaining about
// supportive resources for breast cancer patients and also provides 
// a means (via the EmailForm component) for the user to input her email 
// address and have a study administrator contact her for emotional support

import React, { Component } from "react";
import EmailForm from "./EmailForm";
import NextButton from "./NextButton";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import axios from "axios";
import { toInt, exists } from "../helpers/utilities";

class SupportiveResources extends Component {
  constructor(props) {
    super(props);
    this.hasHighDistress = this.hasHighDistress.bind(this);
    this.hasAnyWorries = this.hasAnyWorries.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = { 
      show: false,
      alertVariant: "",
      alertContent: ""
    };
  }

	componentDidMount = () => {
    animateScroll.scrollToTop({ duration: 100 });
	}

  hasHighDistress = (distress) => {
    return ( exists(distress) && toInt(distress) >= 5 );
  }

  hasAnyWorries = (worries) => {
    return worries.some( (worry) => {
      return exists(worry) && (toInt(worry) >= 4);
    });
  }

  onClose = () => {
    this.setState({ show: false });
  }

  getOpeningContent = () => {
    if (!exists(this.props.worries)) {
      return;
    }
    const worries = this.props.worries;
    if ( this.hasHighDistress(worries.distress) || 
         this.hasAnyWorries([worries.general, worries.during, worries.after]) ) {
      return <p>It’s normal to be feeling distress about your diagnosis and/or worried or uncertain about your treatment. We’d like to offer you some additional support as you think about your surgical decision. </p>;
    }
    else {
      return <p>Even though your responses do not indicate that you are looking for support, many women find that knowing about additional resources is helpful.</p>;
    }
  }

  fieldIsEmpty = (field) => {
    return field === "";
  }

  sendEmail = (data) => {
    this.setState({ show: false });
    if ( this.fieldIsEmpty(data.email) ) {
      this.setState({ 
        show: true, 
        alertVariant: "danger",
        alertContent: "Please enter an email address"
      });
      return false;
    }
    axios({
      method: "post",
      url: this.props.api + "?req=anxiety_email",
      data: data.email
    })
      .then( (result) => {
        this.setState({ 
          show: true, 
          alertVariant: "success",
          alertContent: "Your email was sent successfully"
        });
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Supportive resources</h1>
        { this.getOpeningContent() }
        <p>If you would like someone from the study team to contact you with information about support options for newly diagnosed young women with breast cancer, please provide your email, and we will be in touch.</p>
        <Alert 
         variant={ this.state.alertVariant }
         dismissible 
         show={ this.state.show }
         onClose={ this.onClose }
        >
          <p>{ this.state.alertContent }</p>
        </Alert>
        <EmailForm storeData = { this.sendEmail } />

        <p><Link to="/resources">See resources</Link> available to help you cope with some of the worries and concerns you may be having.</p>

        <p>Learn strategies to help you cope with some of the worries and concerns you may be having:</p> 
        <div className="clearfix">
          <p className="inline-buttons">
              <a target="_blank" rel="noopener noreferrer" className="btn btn-secondary" href="https://survivorship.cancer.gov/springboard/video-stories-playlist/relaxation-exercises">Relaxation exercises</a>
              <a target="_blank" rel="noopener noreferrer" className="btn btn-secondary" href="https://survivorship.cancer.gov/springboard/stress-mood/practice-mindfulness">Mindfulness strategies</a>
          </p>
        </div>
        <NextButton dest="next-steps" />
      </div>
    );
  }
}

export default SupportiveResources;
