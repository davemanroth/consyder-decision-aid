// React class that renders the "How are you feeling" screen of the decision
// aid. Using NumberScale and WorryTable components, users are presented with 
// questions to evaluate anxiety/stress levels.

import React, { Component } from 'react';
import { animateScroll } from "react-scroll";
import NumberScale from './NumberScale';
import WorryTable from './WorryTable';
import NextButton from './NextButton';

class WorryAssessment extends Component {
  constructor(props) {
    super(props);
    this.handleScaleChange = this.handleScaleChange.bind(this);
    const saved = this.props.savedValues || {};
    this.state = saved;
  }

	componentDidMount = () => {
		animateScroll.scrollToTop({ duration: 100 });
	}

	handleScaleChange = (type, value) => {
		this.setState({[type]: value });
	}

  componentWillUnmount = () => {
    this.props.onSaveProgress({ worry: this.state });
  }

  render() {
    return (
			<div>
				<h1>How are you feeling?</h1>
				<p>We would like to know how you have been feeling since being diagnosed with breast cancer.</p>
				<p><strong>Please select the number (0-10) that best describes how much distress you have been experiencing in the past week, including today:</strong></p>
				<NumberScale
					scale="10"
					leftLabel="No distress"
					rightLabel="Extreme distress"
					onScaleSelect={ this.handleScaleChange }
          savedValue={ this.state.distress }
					value="distress"
					content=""
				/>
        <p><strong>I would find it helpful if I received more assistance to cope with my:</strong></p> 
        <WorryTable 
          onScaleSelect={ this.handleScaleChange }
          savedValues={ this.state }
        /> 
        <NextButton dest="supportive-resources" />
			</div>
		);
  }
}

export default WorryAssessment;

