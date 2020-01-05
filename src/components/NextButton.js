// Stateless component to render a "Next" button

import React from 'react';
import { Link } from 'react-router-dom';

const NextButton = (props) => {
  return (
    <Link className={ "btn btn-primary btn-lg next-btn float-right " + props.className } to={ "/" + props.dest } >Next</Link>
  );
}

export default NextButton;

