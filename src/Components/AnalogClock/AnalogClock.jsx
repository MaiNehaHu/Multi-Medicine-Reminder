import React, { useEffect, useState } from "react";
import "./AnalogClock.css";

const AnalogClock = () => {
  const [secDegree, setSecDegree] = useState(0);
  const [minDegree, setMinDegree] = useState(0);
  const [hourDegree, setHourDegree] = useState(0);

  const Style = {
    seconds: {
      transform: `rotate(${secDegree + 90}deg)`,
    },
    minutes: {
      transform: `rotate(${minDegree + 90}deg)`,
    },
    hours: {
      transform: `rotate(${hourDegree + 90}deg)`,
    },
  };

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();

      setSecDegree(sec * 6);
      setMinDegree(min * 6);
      setHourDegree(30 * hour + min / 2);
    }, 1000);
  }, []);

  return (
    <div className="analogClock">
      <div class="analog">
        <div class="hand hour-hand" style={Style.hours}></div>
        <div class="hand min-hand" style={Style.minutes}></div>
        <div class="hand sec-hand" style={Style.seconds}></div>

        <div class="center"></div>
      </div>
    </div>
  );
};

export default AnalogClock;
