import React from "react";
import "./button.css";

const SetButton = ({ setAlarm }) => {
  return (
    <React.Fragment>
      <button onClick={setAlarm} className={"setAlarm-btn"}>
        Set Alarm
      </button>
    </React.Fragment>
  );
};

export default SetButton;
