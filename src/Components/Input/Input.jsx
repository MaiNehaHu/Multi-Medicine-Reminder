import React from "react";
import "./Input.css";

const Input = ({ inputName }) => {
 
  return (
    <React.Fragment>
      <div className="input">
        <input
          ref={inputName}
          type="search"
          placeholder="Type Medicine Name..."
          name="medicine-name"
          id="medicineNameInput"
        />
      </div>
    </React.Fragment>
  );
};

export default Input;
