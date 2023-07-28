import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import SetButton from "./Components/SetAlarmButton/SetButton";
import Clock from "./Components/DigiClock/Clock";
import MultiAlarm from "./Components/MultipleAlarms/MultiAlarm";
import useSelectHook from "./hooks/useSelectHook";
import DropDownOptions from "./Components/DropDowns/DropDownOptions";
import Input from "./Components/Input/Input";

const LS_Alarm_Key = "AlarmsList";

function getAlarmsList() {
  let list = localStorage.getItem(LS_Alarm_Key);
  if (list) {
    return JSON.parse(localStorage.getItem(LS_Alarm_Key));
  } else {
    return [];
  }
}

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

  return (
    <div id="App">
      <div id="container">
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
