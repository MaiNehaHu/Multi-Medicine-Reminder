import React, { useEffect, useState } from "react";
import "./DarkLightMode.css";

const DarkLightMode = ({ onClickHandler, modeStatus }) => {
  const [circlePosi, setCirclePosi] = useState(false);
  const white = "rgb(255, 255, 255)";

  useEffect(() => {
    if (modeStatus === white) {
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
            background: circlePosi ? "Black" : white,
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
