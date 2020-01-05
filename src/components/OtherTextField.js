// Stateless component that renders an html textarea for user to fill in
// a custom "Other" option to Next steps component

import React from "react";

const OtherTextField = (props) => {
  return props.display ? (
    <div className={ "form-group w-50" }>
      <input name={ props.name } id={ props.id } onChange={ props.onChange } type="text" className="form-control" aria-label="other text field" defaultValue={ props.storedValue }/>
    </div>
  ) : "";
}

export default OtherTextField;
