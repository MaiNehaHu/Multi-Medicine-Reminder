import React, { useEffect, useState } from "react";
import LightMode from "../../Images/LightBanner.png";
import "./mode.css";

const DarkLightMode = ({ onClickHandler, modeStatus }) => {
  const [circlePosi, setCirclePosi] = useState(false);

  useEffect(() => {
    if (modeStatus === LightMode) {
      setCirclePosi(false);
    } else {
      setCirclePosi(true);
    }
  }, [modeStatus]);

  function toggleMode() {
    setCirclePosi((current) => !current);
  }

  return (
    <div id="dark-light-mode-toggler">
      <div className="toggle-button-toggler">
        <div
          id="toggle-circle-toggler"
          style={{
            background: circlePosi ? "Black" : "White",
            transform: circlePosi ? "translateX(0)" : "translateX(200%)",
          }}
          onClick={() => {
            toggleMode();
            onClickHandler();
          }}
        ></div>
      </div>
    </div>
  );
};

export default DarkLightMode;
