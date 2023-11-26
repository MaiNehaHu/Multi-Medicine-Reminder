import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import SetAlarmButton from "./Components/SetAlarmButton/SetAlarmButton";
import DigiClock from "./Components/DigiClock/DigiClock";
import MultiAlarm from "./Components/MultipleAlarms/MultiAlarm";
import useSelectHook from "./hooks/useSelectHook";
import DropDowns from "./Components/DropDowns/DropDowns";
import Input from "./Components/Input/Input";
import DarkLightMode from "./Components/DarkOrLightMode/DarkLightMode";
import AnalogClock from "./Components/AnalogClock/AnalogClock";

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
  //to change light mode and dark mode
  const [bgcolor, setBgColor] = useState(getModeStatus());
  const white = "rgb(255, 255, 255)";
  const black = "rgb(0, 0, 0)";

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
        inputNameValue.length > 15
          ? inputNameValue.slice(0, 15).concat("...")
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

  //deleting the clicked alarm from list
  function deleteAlarm(indexNum) {
    let newList = [...alarmList];
    let filteredList = newList.filter((alarm) => alarm.index !== indexNum);

    setTimeout(() => {
      setAlarmList(filteredList);
      console.log("deleted");
    }, 500);
  }

  //Setting alarm as ON and OFF
  function switchOnOrOff(clickAlarmId) {
    setAlarmList((prevAlarmList) =>
      prevAlarmList.map((alarm) =>
        alarm.index === clickAlarmId
          ? {
              ...alarm,
              isOff: !alarm.isOff,
            }
          : alarm
      )
    );
    localStorage.setItem(LS_Alarm_Key, JSON.stringify(alarmList));
  }

  function modeHandler() {
    if (bgcolor === white) {
      setBgColor(black);
    } else if (bgcolor === black) {
      setBgColor(white);
    } else {
      setBgColor(black);
    }
  }

  useEffect(() => {
    //set mode to Local Storage
    localStorage.setItem(LS_Key_for_mode, JSON.stringify(bgcolor));
  }, [bgcolor]);

  useEffect(() => {
    //Storing in Local Storage
    localStorage.setItem(LS_Alarm_Key, JSON.stringify(alarmList));
  }, [alarmList]);

  return (
    <div
      id="App"
      style={{
        backgroundColor: `${bgcolor}`,
      }}
    >
      <div className="setAlarmContainer">
        {/** Anallog Clock */}
        <AnalogClock />

        {/** Digital Clock */}
        <DigiClock />

        {/** Dark and light mode */}
        <DarkLightMode onClickHandler={modeHandler} modeStatus={bgcolor} />

        {/** Message */}
        <p className="message">Hi, Set your medicine alarm💊</p>

        {/** DropDown for time */}
        <DropDowns
          setHour={setHour}
          setMinutes={setMinutes}
          setAmPmOption={setAmPmOption}
        />

        {/** Input field */}
        <Input inputName={inputName} />

        {/** Set Button */}
        <SetAlarmButton setAlarm={setAlarm} />
      </div>

      <div className="alarmsListContainer">
        {/** List of all alarms */}
        <MultiAlarm
          list={alarmList}
          deleteAlarm={deleteAlarm}
          switchOnOrOff={switchOnOrOff}
          modeStatus={bgcolor}
        />
      </div>
    </div>
  );
};

export default Index;
