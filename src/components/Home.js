// Stateless component that renders the homepage of the decision aid

import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div>
    <h1 className="home-title">
      Cons<span className="larger">y</span>der<br />
      <p className="lead"><span className="large bold">C</span>ommunicating <span className="large bold">O</span>ptio<span className="large bold">N</span>s about <span className="large bold">S</span>urgery for <span className="larger bold">Y</span>oung women <span className="large bold">D</span>iagnosed with <span className="large bold">E</span>arly stage breast cance<span className="large bold">R</span></p>
    </h1>
      
      <p>CONSYDER is a decision tool for young women recently diagnosed with early-stage breast cancer who are making decisions about breast cancer surgery.</p>
      
      <p>We hope you find this is a useful tool to:</p>
      <ul>
          <li>Learn more about the pros and cons of your surgery options</li>
          <li>Think about what is important to you to help make your surgery decision</li>
      </ul>

     <p className="disclaimer">You can stop at any point and come back later to review this information. The information on this website, including any responses that you enter, is for you and is not being saved to this website. Having a printed copy might be helpful, and on the last screen, you’ll have an option to print the information and your responses.</p>

       <Link className="btn btn-primary btn-lg home-btn-spacing" to="/treatment-options">Learn about your options</Link>

      
      <p className="inline-buttons">
        <Link className="btn btn-secondary btn-sm" to="/about">Learn more about this study</Link>
        <a className="btn btn-secondary btn-sm" href="mailto:consyder@partners.org">Contact the study team</a>
      </p>
    </div>
  );
}

export default Home;
