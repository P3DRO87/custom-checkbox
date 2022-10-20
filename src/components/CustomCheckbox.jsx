import React from "react";

const CustomCheckbox = ({ checkBoxText = "" }) => {
   return (
      <div className="custom-checkbox">
         <label className="container">
            <input type="checkbox" />
            <span className="checkmark"></span>
            <span className="checkbox-text">{checkBoxText}</span>
         </label>
      </div>
   );
};

export default CustomCheckbox;
