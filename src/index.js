import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Individual from "./Pages/Individual";
import Family from "./Pages/Family";
import Medical from "./Pages/Medical";
import Legal from "./Pages/Legal";
import School from "./Pages/School";
import Treatment from "./Pages/Treatment";

render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="individual" element={<Individual />} />
        <Route path="family" element={<Family />} />
        <Route path="medical" element={<Medical />} />
        <Route path="legal" element={<Legal />} />
        <Route path="school" element={<School />} />
        <Route path="treatment" element={<Treatment />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();