import React from "react";
import "./ringing.css";

const PopUpAlarm = ({ style, pauseAlarm, time, name }) => {
  return (
    <React.Fragment>
      <div id="RinginAlarm" style={{ display: style }}>
        <div className="ringing-alarm-container">
          <p id="ringing-med-name">{name}</p>
          <p id="ringing-time">{time}</p>
          <button onClick={pauseAlarm}>Stop</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopUpAlarm;
