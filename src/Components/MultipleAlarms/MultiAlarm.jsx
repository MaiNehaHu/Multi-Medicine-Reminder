import React from "react";
import "./alarms.css";
import Alarm from "../OneAlarm/Alarm";

const MultiAlarm = ({ list, deleteAlarm, switchOnOrOff }) => {
  return list.map((alarm, i) => {
    return (
      <Alarm
        key={i}
        alarm={alarm}
        deleteAlarm={deleteAlarm}
        switchOnOrOff={switchOnOrOff}
      />
    );
  });
};

export default MultiAlarm;
