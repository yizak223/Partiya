import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header${isMenuOpen ? "open" : ""}`}>
      <div>
        <nav className="navBar">
          <div>
            <div className="hamburger" onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className={`menuContainer ${isMenuOpen ? "open" : ""}`}>
              <h1>CoolLogo</h1>
              <Link to="/Auth" className="link" onClick={toggleMenu}>
                Auth
              </Link>
              <Link to="/" className="link" onClick={toggleMenu}>
                Home
              </Link>
            </div>
          </div>
          <h1 className="logo">Partiya</h1>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
