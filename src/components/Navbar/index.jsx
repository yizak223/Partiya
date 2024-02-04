import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div>
        <nav className="navBar">
          <div>
            <div className={`menuContainer ${isMenuOpen ? "open" : ""}`}>
              <h1>CoolLogo</h1>
              <Link to="/Auth" className="link" onClick={toggleMenu}>
                Auth
              </Link>
              <Link to="/" className="link" onClick={toggleMenu}>
                Home
              </Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div>
            <p className="PartiyaLogo">Partiya</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
