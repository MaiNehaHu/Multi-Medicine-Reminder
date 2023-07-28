import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter basename="/Multi-Medicine-Reminder">
        <Routes>
          <Route path="/" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
