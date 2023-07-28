import React, { useEffect, useState } from "react";
import "./clock.css";

const Clock = () => {
  const [hourDigital, setHourDigital] = useState("");
  const [minutesDigital, setMinutesDigital] = useState("");
  const [secsDigital, setSecsDigital] = useState("");
  const [amPm, setAmPm] = useState("");

  useEffect(() => {
    setInterval(() => {
      const date = new Date();

      let Hour = date.getHours(),
        Min = date.getMinutes(),
        Sec = date.getSeconds(),
        ampm;

      ampm = Hour >= 12 ? "PM" : "AM";
      Hour = Hour >= 12 ? Hour - 12 : Hour;

      Hour = Hour === 0 ? 12 : Hour;

      Hour = Hour < 10 ? `0${Hour}` : Hour;
      Min = Min < 10 ? `0${Min}` : Min;
      Sec = Sec < 10 ? `0${Sec}` : Sec;

      setHourDigital(Hour);
      setMinutesDigital(Min);
      setSecsDigital(Sec);
      setAmPm(ampm);
    }, 1000);
  }, []);
  
  return (
    <React.Fragment>
      <div className="current-time">
        {`${hourDigital}:${minutesDigital}:${secsDigital} ${amPm}`}
      </div>
    </React.Fragment>
  );
};

export default Clock;
