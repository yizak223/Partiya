import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  return (
    <div>
      <nav>
        <h1>CoolLogo</h1>
        <div className="linkContainer">
          <Link to="/Auth" className="link">
            Auth
          </Link>
          <Link to="/" className="link">
            Home
          </Link>
        </div>
        {/* {user ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <button>Login</button>
        )} */}
      </nav>
    </div>
  );
}

export default Navbar;
