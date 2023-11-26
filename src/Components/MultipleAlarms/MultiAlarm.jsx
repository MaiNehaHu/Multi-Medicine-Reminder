import React from "react";
import OneAlarm from "../OneAlarm/OneAlarm";

const MultiAlarm = ({ list, deleteAlarm, switchOnOrOff, modeStatus }) => {
  return list.map((alarm, i) => {
    return (
      <OneAlarm
        key={i}
        alarm={alarm}
        deleteAlarm={deleteAlarm}
        switchOnOrOff={switchOnOrOff}
        colorMode={modeStatus}
      />
    );
  });
};

export default MultiAlarm;
