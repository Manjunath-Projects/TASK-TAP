import React from "react";
import "../components/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#history">History</a></li>
        <li><a href="#culture">Culture</a></li>
        <li><a href="#cta">Explore</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
