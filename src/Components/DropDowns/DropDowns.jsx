import React from "react";
import "./DropDowns.css";

const DropDowns = ({ setHour, setMinutes, setAmPmOption }) => {
  function fixNumber(value) {
    value = value.map((hour) => {
      hour = hour < 10 ? `0${hour}` : hour;
      return hour;
    });
    return value;
  }

  const minuteList = fixNumber(Array.from(Array(60).keys()));
  const hourList = fixNumber(Array.from(Array(13).keys()));

  return (
    <React.Fragment>
      <div className="options-container">
        <div className={`wrapper-option`}>
          <select {...setHour}>
            <option disabled value="Hour">
              Hour
            </option>
            {hourList.map((hour, index) => (
              <option key={index} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select {...setMinutes}>
            <option disabled value="Minutes">
              Minutes
            </option>
            {minuteList.map((minutes, index) => (
              <option key={index} value={minutes}>
                {minutes}
              </option>
            ))}
          </select>
          <select {...setAmPmOption}>
            <option disabled value="Am-Pm">
              Am/Pm
            </option>
            <option value="AM">Am</option>
            <option value="PM">Pm</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropDowns;
