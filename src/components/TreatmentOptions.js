// Stateless component that renders static text explaining about all breast
// cancer surgery options. It uses Accordion ui component to collapse
// information, making the page more legible.

import React, { useState, useEffect } from "react";
import store from "store";
import LumpectomyAccordion from "./accordions/LumpectomyAccordion";
import TreatmentOptionsLumpText from "./TreatmentOptionsLumpText";
import MastectomyAccordion from "./accordions/MastectomyAccordion";
import OtherProceduresAccordion from "./accordions/OtherProceduresAccordion";
import { animateScroll } from "react-scroll";
import NextButton from "./NextButton";
import "react-accessible-accordion/dist/fancy-example.css";

const TreatmentOptions = (props) => {
  const user = store.get("user");
  const [isVisible] = useState(user.lump ? "visible" : "remove-from-view");

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 100 });
  });

  return (
    <div>
      <h1>What are my treatment options?</h1>
      <p>Your option<span className={ isVisible }>s</span> for surgical treatment { user.lump ? "are:" : "is" }</p>
      <ul>
        { user.lump ?  <li>Lumpectomy</li> : "" }
        <li>Mastectomy (with or without reconstruction)</li>
      </ul>
			{ user.lump ?  <TreatmentOptionsLumpText /> : "" }
			{ user.lump ?  <div className="col-md-10"><LumpectomyAccordion /></div> : "" }
			<p><strong>Mastectomy</strong> (with or without reconstruction) is a surgical procedure in which the entire breast is removed.</p> 
      <p>The surgery lasts about 2 hours but can be longer with reconstruction.</p>
      <div className="col-md-10">
        <MastectomyAccordion />
      </div>
			<p><strong>Other procedures</strong></p> 
      <div className="col-md-10">
        <OtherProceduresAccordion />
      </div>
      <NextButton dest="treatment-comparison" />
    </div>
  );
}

export default TreatmentOptions;

