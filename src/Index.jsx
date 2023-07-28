import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import DarkMode from "./Images/DarkBanner.png";
import LightMode from "./Images/LightBanner.png";

import SetButton from "./Components/SetAlarmButton/SetButton";
import Clock from "./Components/DigiClock/Clock";
import MultiAlarm from "./Components/MultipleAlarms/MultiAlarm";
import useSelectHook from "./hooks/useSelectHook";
import DropDownOptions from "./Components/DropDowns/DropDownOptions";
import Input from "./Components/Input/Input";
import DarkLightMode from "./Components/DarkOrLightMode/DarkLightMode";

const LS_Alarm_Key = "AlarmsList";
const LS_Key_for_mode = "dark-light";

function getAlarmsList() {
  let list = localStorage.getItem(LS_Alarm_Key);
  if (list) {
    return JSON.parse(localStorage.getItem(LS_Alarm_Key));
  } else {
    return [];
  }
}
const getModeStatus = () => {
  let modeStatus = localStorage.getItem(LS_Key_for_mode);
  /**With the help of keyname we are getting the mode Status */

  if (modeStatus) {
    return JSON.parse(localStorage.getItem(LS_Key_for_mode));
    /**localStorage.setItems("key", "value")*/
  } else {
    return [];
  }
};

const Index = () => {
  const [hour, setHour] = useSelectHook("Hour");
  const [minutes, setMinutes] = useSelectHook("Minutes");
  const [amPmOption, setAmPmOption] = useSelectHook("Am-Pm");
  const [alarmList, setAlarmList] = useState(getAlarmsList());

  const [hide, setHide] = useState(false);

  let inputName = useRef();

  function Random() {
    return Math.floor(Math.random() * Math.pow(10, 10));
  }

  function setAlarm() {
    if (
      hour.includes("Hour") ||
      minutes.includes("Minutes") ||
      amPmOption.includes("Am-Pm")
    ) {
      alert("You didn't select all options of time");
    } else if (
      !hour.includes("Hour") &&
      !minutes.includes("Minutes") &&
      !amPmOption.includes("Am-Pm")
    ) {
      let time = `${hour}:${minutes}:00 ${amPmOption}`;
      let inputNameValue = inputName.current.value;

      inputNameValue = inputNameValue === "" ? "Medicine Name" : inputNameValue;
      inputNameValue =
        inputNameValue.length > 20
          ? inputNameValue.slice(0, 20).concat("...")
          : inputNameValue;

      let key = Random();
      setAlarmList((previous) => {
        return [
          ...previous,
          {
            isOff: false,
            alarmTime: time,
            index: key,
            medName: inputNameValue,
          },
        ];
        /**key should be unique so generating using random*/
        /**This is getting passed as tasks to TodoList */
      });
    }
  }

  function deleteAlarm(indexNum) {
    setHide(true);

    let newList = [...alarmList];
    let filteredList = newList.filter((alarm) => alarm.index !== indexNum);

    setTimeout(() => {
      setAlarmList(filteredList);
      console.log("deleted");
      setHide(false);
    }, 500);
  }

  function switchOnOrOff(id) {
    setAlarmList((prevAlarmList) =>
      prevAlarmList.map((alarm) =>
        alarm.index === id
          ? {
              ...alarm,
              isOff: !alarm.isOff,
            }
          : alarm
      )
    );
    localStorage.setItem(LS_Alarm_Key, JSON.stringify(alarmList));
  }

  useEffect(() => {
    localStorage.setItem(LS_Alarm_Key, JSON.stringify(alarmList));
    /**localStorage.setItems("key", "value")
     * "value" is stringify bcz Local Storage stores strings only
     */
  }, [alarmList]);

  //to change light mode and dark mode
  const [bgcolor, setBgColor] = useState("rgb(206, 242, 255)");
  const [mode, setMode] = useState(getModeStatus());
  useEffect(() => {
    setBgColor("Black");
    setMode(DarkMode);
  },[]);

  function modeHandler() {
    if (mode === DarkMode) {
      setBgColor("rgb(206, 242, 255)");
      setTimeout(() => {
        setMode(LightMode);
      }, 500);
    } else if (mode === LightMode) {
      setBgColor("Black");
      setTimeout(() => {
        setMode(DarkMode);
      }, 500);
    }
  }

  document.querySelector("body").style.background = `url(${mode})`;
  document.querySelector("body").style.backgroundColor = `${bgcolor}`;
  document.querySelector("body").style.backgroundSize = "cover";
  document.querySelector("body").style.backgroundPosition = "center";

  //get mode from Local Storage
  useEffect(() => {
    localStorage.setItem(LS_Key_for_mode, JSON.stringify(mode));
  }, [mode]);

  return (
    <div id="App">
      <div id="container">
        {/**Dark and light mode */}
        <DarkLightMode onClickHandler={modeHandler} modeStatus={mode} />

        {/**Clock */}
        <Clock />

        {/**Message */}
        <p id="msg">Hi, Set you medicine alarm💊</p>

        {/**DropDown */}
        <DropDownOptions
          setHour={setHour}
          setMinutes={setMinutes}
          setAmPmOption={setAmPmOption}
        />

        {/**Input field */}
        <Input inputName={inputName} />

        {/**Set Button */}
        <SetButton setAlarm={setAlarm} />

        {/**List of alarms */}
        <div id="Alarms" className={hide === true ? "hide" : "show"}>
          <MultiAlarm
            list={alarmList}
            deleteAlarm={deleteAlarm}
            switchOnOrOff={switchOnOrOff}
            hide={hide}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
