import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../context/User";
import { useContext } from "react";

function Navbar() {
  const { currentUser, userSignOut } = useContext(UserContext)
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
          {currentUser ? 
            (<button onClick={userSignOut}><i className="bi bi-box-arrow-right"></i> Sign out,<span> <b>{currentUser.nickname}</b></span></button>)
             : (<Link to ="/Auth"><i className="bi bi-box-arrow-in-right"></i> Login</Link>)
             }
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
