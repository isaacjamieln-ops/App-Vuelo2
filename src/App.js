import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./containers/HomePage"; 
import Landing from "./containers/Landing";
import Places from "./containers/Places";
import Weather from "./containers/Weather"; // 🔥 IMPORTANTE
import WeatherPage from "./containers/WeatherPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/landing/:cityName" element={<Landing />} />
      <Route path="/places" element={<Places />} />
      <Route path="/weather" element={<WeatherPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;