import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="NavMainDiv">
      <div className="NavBar">
        <img className="LogoImg" src="/Logo.png" alt="Logo" />
        <div className="NavLinkBox">
          <ul className="NavLinks">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            {/* <NavLink to="/about"> */}
            <li>About</li>
            {/* </NavLink> */}
            <NavLink to="/cards">
              <li>Cards</li>
            </NavLink>
            <NavLink to="/admin">
              <li>Admin</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
