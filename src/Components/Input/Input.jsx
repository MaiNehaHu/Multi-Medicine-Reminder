import React from "react";
import "./inputstyle.css";

const Input = ({ inputName }) => {
 
  return (
    <React.Fragment>
      <div className="input">
        <input
          ref={inputName}
          type="search"
          placeholder="Type Medicine Name..."
          name="medicine-name"
          id="name-input"
        />
      </div>
    </React.Fragment>
  );
};

export default Input;
