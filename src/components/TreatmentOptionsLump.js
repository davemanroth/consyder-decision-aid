// Stateless component that renders Lumpectomy treatment option and
// corresponding Lumpectomy accordion

import React from 'react';
import LumpectomyAccordion from './accordions/LumpectomyAccordion';

const TreatmentOptionsLump = (props) => {
  return (
    <div>
      <p><strong>Lumpectomy</strong> is a surgical procedure that removes the tumor, usually with some additional noncancerous tissue around it, but otherwise leaves the breast intact. You may also hear lumpectomy called breast-conserving surgery or breast-conserving treatment, partial mastectomy, or wide excision.</p>
      <p>The surgery lasts about an hour.</p>
      
      <p>After a lumpectomy, additional surgery may be needed if the surgeon does not get an area around the tumor that is clear of cancer cells (called a “clear margin”) and needs to take out more tissue to get a clear margin.
      </p>
      <LumpectomyAccordion />
    </div>
  );
}

export default TreatmentOptionsLump;
