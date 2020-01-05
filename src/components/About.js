// Stateless component with static text explaining about the decision aid

import React from 'react';

const About = (props) => {
  return (
    <div>
      <h1>About</h1>
      <h2>The decision tool</h2>
      <p>This decision tool is part of a five-year study sponsored by the Agency for Healthcare Research and Quality (AHRQ).</p>

      <p>One of the goals of this study is to better understand how young women recently diagnosed with early-stage breast cancer make decisions about surgery. A second goal is to help the decision process by using a decision support tool. </p>

      <p>The purpose of this tool is to present balanced information about surgical treatments, as well as information about specific issues that may be relevant to young women who are considering their surgical options. We also hope this tool is a way to help direct newly diagnosed young women toward resources that might be helpful at this highly stressful time.</p>

      <h2>Funding</h2>
      <p>This decision tool is supported by the Agency for Healthcare Research and Quality (AHRQ K01 HS023680) and by the Friends of Dana-Farber.</p>
    </div>
  );
}

export default About;
