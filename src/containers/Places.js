import React from "react";
import Navbar from "../components/Navbar";

function Places() {
  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="header">
        <h4 className="app-title">Places</h4>
      </div>

      {/* CONTENIDO*/}
      <div className="row">
        <div className="custom-card">
          <img src="https://e1.pxfuel.com/desktop-wallpaper/540/741/desktop-wallpaper-sunset-view-of-wonder-chichen-itza-in-mexico-chichen-itza.jpg" alt="M1"/>
        </div>
        <div className="custom-card">
          <img src="https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg" alt="M2"/>
        </div>
        <div className="custom-card">
          <img src="https://content-viajes.nationalgeographic.com.es/medio/2024/09/19/coliseo_9b206d89_240919151753_1280x853.jpg" alt="M3"/>
        </div>
        <div className="custom-card">
          <img src="https://historia.nationalgeographic.com.es/medio/2025/02/19/gran-muralla-china_01cbe21a_250219111818_1280x853.webp" alt="M4"/>
        </div>
        <div className="custom-card">
          <img src="https://th.bing.com/th/id/R.51a6096e0307871749ad63dab3627439?rik=JqjgM%2bWL0z9xgA&pid=ImgRaw&r=0" alt="M5"/>
        </div>
      </div>

      {/* NAVBAR */}
      <Navbar />
    </div>
  );
}

export default Places;