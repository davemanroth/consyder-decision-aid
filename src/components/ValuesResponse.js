// Small stateless component that simply renders response text based on 
// a user's response to the Values Clarification screen of the decision aid.

import React from "react";

const ValuesResponse = (props) => {
  return (
    <div className={ props.responseClass }>
      <p className="response">{ props.children }</p>
    </div>
  );
}

export default ValuesResponse;
    
