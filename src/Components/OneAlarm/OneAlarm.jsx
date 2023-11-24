import React, { useEffect, useState } from "react";
import "./OneAlarm.css";
import Sound from "../../Audio/ring.mp3";
import Toggle from "../../Audio/toggleClick.mp3";
const Ring = new Audio(Sound);
const ToggleAudio = new Audio(Toggle);

import PopUpAlarm from "../PopUpAlarm/PopUpAlarm";

const OneAlarm = ({ alarm, deleteAlarm, switchOnOrOff, colorMode }) => {
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [secs, setSecs] = useState("");
  const [amPm, setAmPm] = useState("");
  const [alarmRing, setAlarmRing] = useState("none");
  //For current time
  const white = "rgb(255, 255, 255)";
  let isOff = alarm.isOff;
  let alarmTiming = alarm.alarmTime;
  //from list

  useEffect(() => {
    const intervalId = setInterval(() => {
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

      setHour(Hour);
      setMinutes(Min);
      setSecs(Sec);
      setAmPm(ampm);
    }, 1000);

    // Return cleanup function to clear the interval
    // When the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /**Compare current time with alarm Time and play audio */
  useEffect(() => {
    /**if alarm is off Don't compare */
    if (isOff === true) {
      return;
    } else {
      if (alarmTiming === `${hour}:${minutes}:${secs} ${amPm}`) {
        setAlarmRing("flex");

        Ring.play();
        Ring.loop = true;
      }
    }
  }, [alarmTiming, hour, minutes, secs, amPm]);

  /**Pause button */
  function pauseAlarm() {
    setAlarmRing("none");
    Ring.pause();
  }

  /**Toggle the alarm ON and OFF */
  function toggleButtonPosition() {
    isOff = isOff == false ? false : true;
  }

  let AlarmStyle = {
    background: colorMode === white ? "white" : "black",
    color: colorMode === white ? "black" : white,
    border: colorMode === white ? "2.4px solid black" : "2px solid white",
  };

  return (
    <React.Fragment>
      <div className="one-alarm" style={AlarmStyle}>
        <div className="name-time">
          <section id="med-name">{alarm.medName}</section>
          <section id="alarm-time">{alarm.alarmTime}</section>
        </div>

        <section id="on-off-toggle">
          <div id="toggle-button">
            <div
              id="toggle-circle"
              style={{
                background: isOff ? "Black" : "White",
                transform: isOff ? "translateX(0)" : "translateX(100%)",
              }}
              onClick={() => {
                ToggleAudio.play();
                switchOnOrOff(alarm.index);
                toggleButtonPosition(alarm.index);
              }}
            ></div>
          </div>
        </section>

        <section
          id="bin"
          onClick={() => {
            deleteAlarm(alarm.index);
          }}
        >
          <i className="fa fa-trash-o"></i>
        </section>
      </div>

      <PopUpAlarm
        style={alarmRing}
        time={alarmTiming}
        name={alarm.medName}
        pauseAlarm={pauseAlarm}
      />
    </React.Fragment>
  );
};

export default OneAlarm;
