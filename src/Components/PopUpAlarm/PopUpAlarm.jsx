import React from "react";
import "./PopUpAlarm.css";

const PopUpAlarm = ({ style, pauseAlarm, time, name }) => {
  return (
    <React.Fragment>
      <div id="RinginAlarm" style={{ display: style }}>
        <div className="ringing-alarm-container">
          <p id="ringing-time">{time}</p>
          <h1 id="ringing-med-name">{name}</h1>

          <button onClick={pauseAlarm}>Stop💊</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopUpAlarm;
