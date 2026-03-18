import React from "react";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <div className="app-container">

      <div className="text-center py-3 border-bottom">
        <h4 className="app-title">Landing Page</h4>
      </div>

      <Navbar />
    </div>
  );
}

export default Landing;