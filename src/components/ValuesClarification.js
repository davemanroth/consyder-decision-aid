// React class that renders the Values Clarification screen of the decision
// aid wherein users are asked questions about their values. Content is
// imported from a JSON file and passed to NumberScale component via props.

import React, { Component } from 'react';
import store from "store";
import NextButton from './NextButton';
import NumberScale from './NumberScale';
import { animateScroll } from "react-scroll";
import content from '../helpers/values_content.json';

class ValuesClarification extends Component {
  constructor(props) {
    super(props);
    this.handleScaleChange = this.handleScaleChange.bind(this);
		const saved = this.props.savedValues || {};
		this.state = saved;
  }

  handleScaleChange = (value, scale) => {
    this.setState({[value]: scale });
  }

	componentDidMount = () => {
    animateScroll.scrollToTop({ duration: 100 });
	}

  componentWillUnmount = () => {
		if (this.state) {
			this.props.onSaveProgress({ values: this.state });
		}
  }

  render() {
		const user = store.get("user");
    return (
      <div>
        <h1>What is important to you?</h1>
        <p>Considering which of the following are most important to you can help you to make your decision about breast cancer surgery.</p>
        
        <p className="disclaimer">The information you enter below is for you and is not being saved to this website. Having a printed copy might be helpful, and on the last screen, you’ll have an option to print the information and your responses.</p>
        
        <p><strong>Please indicate on the scale below how important each statement is to you:</strong></p>
				{ content.map( (entry, idx) => {
					if (entry.lumpOnly && !user.lump) {
						return false;
					}
					return (
						<NumberScale 
							scale="10" 
							leftLabel="Not at all important"
							rightLabel="Extremely important"
							onScaleSelect={ this.handleScaleChange } 
							value={entry.value}
							savedValue={ this.state[entry.value] }
							key={idx}
							content={entry.content}
              response={ user.lump ? entry.response.lump : entry.response.mast }
						/>
					);
				})}
        <NextButton dest="worry-assessment" />
      </div>
    );
  }
}

export default ValuesClarification;
