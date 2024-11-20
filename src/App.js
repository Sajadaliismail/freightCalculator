import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RateCalculator from "./RateCalc";
import AdminSignInPage from "./admin/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/adminlogixman"  element={<AdminSignInPage />} />
        <Route path="/" element={<RateCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
