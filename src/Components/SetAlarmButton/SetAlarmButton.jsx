import React from "react";
import "./SetAlarmButton.css";

const SetAlarmButton = ({ setAlarm }) => {
  return (
    <React.Fragment>
      <button onClick={setAlarm} className={"setAlarm-btn"}>
        Set Alarm
      </button>
    </React.Fragment>
  );
};

export default SetAlarmButton;
