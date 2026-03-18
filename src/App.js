import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./containers/HomePage"; 
import Landing from "./containers/Landing";
import Places from "./containers/Places"; // si la tienes creada

function App() {
  return (
    <Routes>
      {/* HomePage será la ruta por defecto */}
      <Route path="/" element={<HomePage />} />
      
      {/* Landing accesible en /landing si quieres */}
      <Route path="/landing" element={<Landing />} />
      
      {/* Ejemplo otra página */}
      <Route path="/places" element={<Places />} />
      
      {/* Redirección opcional para rutas desconocidas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;