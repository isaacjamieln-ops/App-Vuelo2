import React from "react";
import { Link, useLocation } from "react-router-dom";
import { House, Compass, GeoAlt, Sun } from "react-bootstrap-icons";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="nav-wrapper">

        {/* HOME */}
        <Link
          to="/"
          className={`nav-icon ${location.pathname === "/" ? "active" : ""}`}
        >
          <House size={26} />
          <span className="icon-label">Home</span>
        </Link>

        {/* LANDING */}
        <Link
          to="/landing"
          className={`nav-icon ${location.pathname === "/landing" ? "active" : ""}`}
        >
          <Compass size={26} />
          <span className="icon-label">Landing</span>
        </Link>

        {/* PLACES - Aquí se mostrarán las CIUDADES */}
        <Link
          to="/places"
          className={`nav-icon ${location.pathname === "/places" ? "active" : ""}`}
        >
          <GeoAlt size={26} />
          <span className="icon-label">Places</span>
        </Link>

        {/* WEATHER */}
        <Link
          to="/weather"
          className={`nav-icon ${location.pathname === "/weather" ? "active" : ""}`}
        >
          <Sun size={26} />
          <span className="icon-label">Weather</span>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;